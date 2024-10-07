import React, { useState} from 'react';
import ListItemTitle from "../../components/ListItemTitle";
import { Radio,  Steps} from "antd";
import ResultForm from "../../components/ResultForm";
import ModalAlert from "../../components/ModelAlert";
import Control_Plate_Get_A from "./plate/Control_Plate_Get_A";
import Control_Plate_Information_B from "./plate/Control_Plate_Information_B";
import Control_Plate_Images_C from "./plate/Control_Plate_Images_C";
import Control_Plate_Confirmation_D from "./plate/Control_Plate_Confirmation_D";
import ButtonB from "../../components/ButtonB";
import {permissionTaged,isPermissionAllowed}from '../../utils/utils'
import { useStateContext } from '../../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTButtons, TTControlPlate, TTPermissions } from '../../utils/intl';


const stepsStatusModel = {
    wait: 'wait', process: 'process', finish: 'finish', error: 'error'
}

/*
steps are named A, B, C, D
A: search plate and view info
B: enter or edit plate's info
C: enter or edit plate's username and password
D: confirmation

creating new plate: B > C > D
edit plate: A > B > C > D
del plate: A > D

info must be passed through method:
    operations type (create, edit or del as opType)
    data (plate's data weather its entered or retrieved from server
 */

const Control_NewPlate = () => {

    const {lang} =useStateContext()

    const stepsModel = {
        A: {
            title: textHere(TTControlPlate.step_a_head), description: textHere(TTControlPlate.step_a_desc), key: 'A',
        },
        B: {
            title: textHere(TTControlPlate.step_b_head), description: textHere(TTControlPlate.step_b_desc), key: 'B',
        },
        C: {
            title: textHere(TTControlPlate.step_c_head), description:textHere(TTControlPlate.step_c_desc), key: 'C',
        },
        D: {
            title: textHere(TTControlPlate.step_d_head), description: textHere(TTControlPlate.step_d_desc), key: 'D',
        }
    }
    
    
    const operationModels = {
        create: {
            value: 'create',
            seq: [
                stepsModel.B,
                stepsModel.C,
                stepsModel.D
            ],
            total_steps: 3
        },
        edit: {
            value: 'edit',
            seq: [
                stepsModel.A,
                stepsModel.B,
                stepsModel.C,
                stepsModel.D
            ],
            total_steps: 4
        },
        del: {
            value: 'del',
            seq:
                [
                    stepsModel.A,
                    stepsModel.D
                ],
            total_steps: 2
        }
    }
    
    const isAllowed = {
        add:isPermissionAllowed(permissionTaged.plate_add),
        view:isPermissionAllowed(permissionTaged.plate_view),
        change:isPermissionAllowed(permissionTaged.plate_change),
        delete:isPermissionAllowed(permissionTaged.plate_delete)
    }

    const [opType, setOpType] = useState('create');
    const [operation, setOperation] = useState(operationModels.create)

    const [step, setStep] = useState({currentStep: 0, stepStatus: stepsStatusModel.process});
    const [finished, setFinished] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [plateData, setPlateData] = useState({
        owner: '',
        model: '',
        plate: '',
        personalCode: '',
        imageList: []
    })

    function handleGet2PlateData(result) {

    }

    function handleInformation2PlateData(result) {
        setPlateData({
            ...plateData,
            owner: result.owner,
            model: result.model,
            plate: result.plate,
            personalCode: result.personal_code,
        })
    }

    function handleImageList2PlateData(result) {
        setPlateData({
            ...plateData,
            imageList: result.imageList
        })
    }


    function resetHandler() {
        setStep({currentStep: 0, stepStatus: stepsStatusModel.process})
        setFinished(false)
    }


    function confirmHandler() {
        //todo: implement
        // resetHandler()
        setFinished(true)
    }


    const onChangeRadio = (e) => {
        setStep({currentStep: 0, stepStatus: stepsStatusModel.process})
        setOpType(e.target.value)
        if (e.target.value === operationModels.create.value) {
            setOperation(operationModels.create)
        }
        if (e.target.value === operationModels.edit.value) {
            setOperation(operationModels.edit)
        }
        if (e.target.value === operationModels.del.value) {
            setOperation(operationModels.del)
        }
    };


    // operations based on user access
    const opTypeOptions = [
        {
            label: textHere(TTControlPlate.head_add,lang),
            value: 'create',
            disabled: !isAllowed.add,
        },
        {
            label: textHere(TTControlPlate.head_edit,lang),
            value: 'edit',
            disabled: !isAllowed.change,
        },
        {
            label: textHere(TTControlPlate.head_delete,lang),
            value: 'del',
            disabled: !isAllowed.delete,
        },
    ]

// create each step using operation object as a general form
    function createSteps(op) {

        return (
            op.seq.map((sequence, index) => {


                if (finished) {
                    // if finished show the resultForm as confirmed
                    return <ResultForm
                        type='success'
                        title={textHere(TTControlPlate.state_plate_created,lang)}
                        subtitle={textHere(TTAlertTexts.protect_sensitive_informations,lang)}
                        extras={[
                            <ButtonB className="w-60 "
                                    onClick={() => {
                                    }}>
                                {textHere(TTControlPlate.add_new_plate,lang)}
                            </ButtonB>
                        ]}
                    />
                    // if its not finished yet continue the steps
                } else {

                    if (sequence.key === stepsModel.A.key && step.currentStep === index) {

                        // get user account
                        return <Control_Plate_Get_A
                            onFinish={(result, isValid) => {
                                if (isValid) {
                                    setStep({currentStep: step.currentStep + 1, stepStatus: stepsStatusModel.process})
                                    handleInformation2PlateData(result)
                                } else {
                                    setStep({currentStep: step.currentStep, stepStatus: stepsStatusModel.error})
                                }
                            }}
                        />
                    }
                    if (sequence.key === stepsModel.B.key && step.currentStep === index) {

                        // enter or edit account info
                        return <Control_Plate_Information_B
                            onFinish={(result, isValid) => {
                                if (isValid) {
                                    setStep({currentStep: step.currentStep + 1, stepStatus: stepsStatusModel.process})
                                    handleInformation2PlateData(result)
                                } else {
                                    setStep({currentStep: step.currentStep, stepStatus: stepsStatusModel.error})
                                }
                            }}
                        />
                    }

                    if (sequence.key === stepsModel.C.key && step.currentStep === index) {

                        // enter or edit password
                        return <Control_Plate_Images_C
                            onFinish={(result, isValid) => {
                                if (isValid) {
                                    setStep({currentStep: step.currentStep + 1, stepStatus: stepsStatusModel.process})
                                    handleInformation2PlateData(result)
                                } else {
                                    setStep({currentStep: step.currentStep, stepStatus: stepsStatusModel.error})
                                }
                            }}
                        />
                    }

                    if (sequence.key === stepsModel.D.key && step.currentStep === index) {

                        // confirm operation
                        return <Control_Plate_Confirmation_D
                            onConfirm={confirmHandler}
                            onReset={resetHandler}
                            data={plateData}
                        />
                    }
                }
            })
        )
    }


    return (
        <div>
            <div className='flex justify-between pb-10'>
                <div className='w-96 py-3'>
                    <ListItemTitle title={textHere(TTControlPlate.main_head,lang)}/>
                </div>

                <div className='flex items-center'>
                    <Radio.Group
                        options={opTypeOptions}
                        onChange={onChangeRadio}
                        value={opType}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </div>

            </div>
            {isAllowed ? <>
                {!finished && <Steps
                    className='pb-8'
                    current={step.currentStep}
                    status={step.stepStatus}
                    items={operation.seq}
                />}
                {createSteps(operation)}

                <ModalAlert
                    title={textHere(TTButtons.action_send_info,lang)}
                    description={textHere(TTAlertTexts.are_you_sure,lang)}
                    okButtonText={textHere(TTButtons.ok,lang)}
                    cancelButtonText={textHere(TTButtons.cancel,lang)}
                    isOpen={modalVisible}
                    okButtonClick={() => {
                    }}
                    cancelButtonClick={() => setModalVisible(false)}
                />
            </> : <ResultForm
                type='info'
                title={textHere(TTPermissions.you_dont_have_permission,lang)}
                subtitle={textHere(TTPermissions.you_dont_have_permission_desc,lang)}
            />}
        </div>
    );
};

export default Control_NewPlate;
