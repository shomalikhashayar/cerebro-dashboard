/* eslint-disable react/jsx-pascal-case */
import React, { useState} from 'react';
import ListItemTitle from "../../components/ListItemTitle";
import { Radio, Select, Steps} from "antd";

import ResultForm from "../../components/ResultForm";
import ModalAlert from "../../components/ModelAlert";
import Control_Face_Get_A from "./face/Control_Face_Get_A";
import Control_Face_Information_B from "./face/Control_Face_Information_B";
import Control_Face_Images_C from "./face/Control_Face_Images_C";
import Control_Face_Confirmation_D from "./face/Control_Face_Confirmation_D";
import ButtonB from "../../components/ButtonB";
import {permissionTaged,isPermissionAllowed}from '../../utils/utils'
import { useStateContext } from '../../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTButtons, TTControlCamera, TTControlFace, TTPermissions } from '../../utils/intl';



const {Option} = Select;

/*
steps are named A, B, C, D
A: search face and view info
B: enter or edit face's info
C: enter or edit face's username and password
D: confirmation

creating new face: B > C > D
edit face: A > B > C > D
del face: A > D

info must be passed through method:
    operations type (create, edit or del as opType)
    data (face's data weather its entered or retrieved from server
 */


const Control_NewFace = () => {

    const {lang} = useStateContext()


    const stepsStatusModel = {
        wait: 'wait', process: 'process', finish: 'finish', error: 'error'
    }
    
    const stepsModel = {
        A: {
            title:textHere(TTControlFace.step_a_head,lang), description: textHere(TTControlFace.step_a_desc,lang), key: 'A',
        },
        B: {
            title: textHere(TTControlFace.step_b_head,lang), description:textHere(TTControlFace.step_b_desc,lang), key: 'B',
        },
        C: {
            title: textHere(TTControlFace.step_c_head,lang), description: textHere(TTControlFace.step_c_desc,lang), key: 'C',
        },
        D: {
            title: textHere(TTControlFace.step_d_head,lang), description: textHere(TTControlFace.step_d_desc,lang), key: 'D',
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
        add:isPermissionAllowed(permissionTaged.face_add),
        view:isPermissionAllowed(permissionTaged.face_view),
        change:isPermissionAllowed(permissionTaged.face_change),
        delete:isPermissionAllowed(permissionTaged.face_delete)
    }


    const [opType, setOpType] = useState('create');
    const [operation, setOperation] = useState(operationModels.create)

    const [step, setStep] = useState({currentStep: 0, stepStatus: stepsStatusModel.process});
    const [finished, setFinished] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [faceData, setFaceData] = useState({
        firstName: 'x',
        lastName: '',
        level: '',
        personalCode: '',
        imageList: [],
    });

    function handleGet2FaceData(result) {

    }


    function handleInformation2FaceData(result) {
        setFaceData({
            ...faceData,
            firstName: result.firstName,
            lastName: result.lastName,
            level: result.level,
            personalCode: result.personal_code,
        })
    }

    function handleImageList2FaceData(result) {
        setFaceData({
            ...faceData,
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
            label: textHere(TTControlFace.head_add,lang),
            value: 'create',
            disabled: !isAllowed.add,
        },
        {
            label: textHere(TTControlFace.head_edit,lang),
            value: 'edit',
            disabled: !isAllowed.change,
        },
        {
            label: textHere(TTControlFace.head_delete,lang),
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
                        title={textHere(TTControlFace.state_face_created,lang)}
                        subtitle={textHere(TTAlertTexts.protect_sensitive_information,lang)}
                        extras={[
                            <ButtonB className="w-60"
                                    onClick={() => {
                                    }}>
                                {textHere(TTControlFace.add_new_face,lang)}
                            </ButtonB>
                        ]}
                    />
                    // if its not finished yet continue the steps
                } else {

                    if (sequence.key === stepsModel.A.key && step.currentStep === index) {

                        // get user account
                        return <Control_Face_Get_A
                            onFinish={(result, isValid) => {
                                if (isValid) {
                                    setStep({currentStep: step.currentStep + 1, stepStatus: stepsStatusModel.process})
                                    handleInformation2FaceData(result)
                                } else {
                                    setStep({currentStep: step.currentStep, stepStatus: stepsStatusModel.error})
                                }
                            }}
                        />
                    }
                    if (sequence.key === stepsModel.B.key && step.currentStep === index) {

                        // enter or edit account info
                        return <Control_Face_Information_B
                            onFinish={(result, isValid) => {
                                if (isValid) {
                                    setStep({currentStep: step.currentStep + 1, stepStatus: stepsStatusModel.process})
                                    handleInformation2FaceData(result)
                                } else {
                                    setStep({currentStep: step.currentStep, stepStatus: stepsStatusModel.error})
                                }
                            }}
                        />
                    }

                    if (sequence.key === stepsModel.C.key && step.currentStep === index) {

                        // enter or edit password
                        return <Control_Face_Images_C
                            onFinish={(result, isValid) => {
                                if (isValid) {
                                    setStep({currentStep: step.currentStep + 1, stepStatus: stepsStatusModel.process})
                                    handleInformation2FaceData(result)
                                } else {
                                    setStep({currentStep: step.currentStep, stepStatus: stepsStatusModel.error})
                                }
                            }}
                        />
                    }

                    if (sequence.key === stepsModel.D.key && step.currentStep === index) {

                        // confirm operation
                        return <Control_Face_Confirmation_D
                            onConfirm={confirmHandler}
                            onReset={resetHandler}
                            data={faceData}
                        />
                    }
                }
            })
        )
    }


    return (<div>
            <div className='flex justify-between pb-10'>
                <div className='w-96 py-3'>
                    <ListItemTitle title={textHere(TTControlFace.main_head,lang)}/>
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
    )

};

export default Control_NewFace;
