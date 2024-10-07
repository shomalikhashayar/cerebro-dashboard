/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React, { useCallback, useRef, useState } from 'react';
import { Select, Steps, Radio } from "antd";
import ListItemTitle from "../../components/ListItemTitle";
import ResultForm from "../../components/ResultForm";
import ModalAlert from "../../components/ModelAlert";
import Control_Account_Information_B from "./account/Control_Account_Information_B";
import Control_Account_Credentials_C from "./account/Control_Account_Credentials_C";
import Control_Account_Confirmation_D from "./account/Control_Account_Confirmation_D";
import Control_Account_Get_A from "./account/Control_Account_Get_A";
import ButtonB from "../../components/ButtonB";
import { StaffModel } from '../../utils/listItemsItems';
import AxiosInstance from "../../network/axiosInstance";
import { urlUsers } from "../../network/urls";
import { useApplication } from "../../contexts/ContextProviderApp";
import { logSomething } from '../../utils/utils';
import { permissionTaged, isPermissionAllowed } from '../../utils/utils'
import { useStateContext } from '../../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTButtons, TTControlAccount, TTPermissions, TTStates } from '../../utils/intl';

const stepsStatusModel = {
    wait: 'wait', process: 'process', finish: 'finish', error: 'error'
}


/*
steps are named A, B, C, D
A: search user and view info
B: enter or edit user's info
C: enter or edit user's username and password
D: confirmation

creating new user: B > C > D
edit user: A > B > C > D
del user: A > D

info must be passed through method:
    operations type (create, edit or del as opType)
    data (users data weather its entered or retrieved from server
 */
const Control_NewAccount = () => {

    const {lang} = useStateContext()

    const stepModelTextClassDescription = ''
const stepModelTextClassTitle = stepModelTextClassDescription + ' font-bold'

const stepsModel = {
    A: {
        title: <p className={stepModelTextClassTitle}>{textHere(TTControlAccount.step_a_head,lang)}</p>,
        description: <p className={stepModelTextClassDescription}>{textHere(TTControlAccount.step_a_desc,lang)}</p>, key: 'A',
    },
    B: {
        title: <p className={stepModelTextClassTitle}> {textHere(TTControlAccount.step_b_head,lang)}</p>,
        description: <p className={stepModelTextClassDescription}> {textHere(TTControlAccount.step_b_desc,lang)}</p>, key: 'B',
    },
    C: {
        title: <p className={stepModelTextClassTitle}>{textHere(TTControlAccount.step_c_head,lang)}</p>,
        description: <p className={stepModelTextClassDescription}>{textHere(TTControlAccount.step_c_desc,lang)}</p>, key: 'C',
    },
    D: {
        title: <p className={stepModelTextClassTitle}> {textHere(TTControlAccount.step_d_head,lang)}</p>,
        description: <p className={stepModelTextClassDescription}>{textHere(TTControlAccount.step_d_desc,lang)}</p>, key: 'D',
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
        add: isPermissionAllowed(permissionTaged.user_add),
        view: isPermissionAllowed(permissionTaged.user_view),
        change: isPermissionAllowed(permissionTaged.user_change),
        delete: isPermissionAllowed(permissionTaged.user_delete)
    }


    const { messageHandler } = useApplication()




    const ax = AxiosInstance()

    const [opType, setOpType] = useState('create');
    const [operation, setOperation] = useState(operationModels.create)



    const [step, setStep] = useState({ currentStep: 0, stepStatus: stepsStatusModel.process });
    const [finished, setFinished] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userpass, setUserpass] = useState({});

    function handleA2UserData(result) {
        setUserData(result)
    }


    function handleB2UserData(result) {
        setUserData(result)
    }

    function handleC2UserData(result) {
        setUserpass({
            username: result.username,
            password: result.password,
            password2: result.password2
        })
    }


    function resetHandler() {
        setStep({ currentStep: 0, stepStatus: stepsStatusModel.process })
        setFinished(false)
    }

    function hardResetHandler() {
        setUserData(null)
        setUserpass({})
        resetHandler()
    }


    const onChangeRadio = (e) => {
        setStep({ currentStep: 0, stepStatus: stepsStatusModel.process })
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
            label:textHere(TTControlAccount.head_add,lang),
            value: 'create',
            disabled: !isAllowed.add,
        },
        {
            label: textHere(TTControlAccount.head_edit,lang),
            value: 'edit',
            disabled: !isAllowed.change,
        },
        {
            label: textHere(TTControlAccount.head_delete,lang),
            value: 'del',
            disabled: !isAllowed.delete,
        },
    ]


    // create each step using operation object as a general form
    function createSteps(op) {
        if (finished) {
            // if finished show the resultForm as confirmed
            return <ResultForm
                type='success'
                title={textHere(TTAlertTexts.done_success,lang)}
                subtitle={textHere(TTAlertTexts.protect_sensitive_informations,lang)}
                extras={[
                    <ButtonB className="w-60 "
                        onClick={hardResetHandler}>
                        {textHere(TTControlAccount.add_new_account,lang)}
                    </ButtonB>
                ]}
            />
            // if it's not finished yet continue the steps
        } else {
            return (
                op.seq.map((sequence, index) => {
                    if (sequence.key === stepsModel.A.key && step.currentStep === index) {

                        // get user account
                        return <Control_Account_Get_A
                            onFinish={(result, isValid) => {
                                if (isValid) {
                                    setStep({ currentStep: step.currentStep + 1, stepStatus: stepsStatusModel.process })
                                    handleA2UserData(result)
                                } else {
                                    setStep({ currentStep: step.currentStep, stepStatus: stepsStatusModel.error })
                                }
                            }}
                        />
                    }
                    if (sequence.key === stepsModel.B.key && step.currentStep === index) {

                        // enter or edit account info
                        return <Control_Account_Information_B
                            prevInfo={userData}
                            onFinish={(result, isValid) => {
                                if (isValid) {
                                    setStep({ currentStep: step.currentStep + 1, stepStatus: stepsStatusModel.process })
                                    handleB2UserData(result)
                                } else {
                                    setStep({ currentStep: step.currentStep, stepStatus: stepsStatusModel.error })
                                }
                            }}
                        />
                    }

                    if (sequence.key === stepsModel.C.key && step.currentStep === index) {

                        // enter or edit password
                        return <Control_Account_Credentials_C
                            prevInfo={userpass}
                            onFinish={(result, isValid) => {
                                if (isValid) {
                                    setStep({ currentStep: step.currentStep + 1, stepStatus: stepsStatusModel.process })
                                    handleC2UserData(result)
                                } else {
                                    setStep({ currentStep: step.currentStep, stepStatus: stepsStatusModel.error })
                                }
                            }}
                        />
                    }

                    if (sequence.key === stepsModel.D.key && step.currentStep === index) {

                        // confirm operation
                        return <Control_Account_Confirmation_D
                            onConfirm={onFinalConfirm}
                            onReset={onResetAll}
                            userData={userData}
                            userPass={userpass}
                        />
                    }
                }
                )
            )
        }
    }

    function onResetAll() {

    }

    function onFinalConfirm() {

        // create user
        if (opType === opTypeOptions[0].value) {
            onCreateUser()

            // modify user
        } else if (opType === opTypeOptions[1].value) {
            onEditUser()

            // del user
        } else if (opType === opTypeOptions[2].value) {
            onDelUser()
        }
    }

    function onCreateUser() {
        messageHandler('loading',textHere(TTStates.requesting,lang))
        const reqBody = {
            ...userData,
            "username": userpass.username,
            "password": userpass.password,
        }


        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: urlUsers,
            data: JSON.stringify(reqBody)
        };

        ax(config)
            .then((response) => {
                messageHandler('success', textHere(TTControlAccount.state_account_created,lang))
                setFinished(true)
            }).catch((error) => {
                messageHandler('error', textHere(TTAlertTexts.error_try_again,lang))
            })


    }

    function onEditUser() {
        messageHandler('loading', textHere(TTStates.requesting,lang))
        const reqBody = {
            ...userData,
            "username": userpass.username,
            "password": userpass.password,
        }

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: urlUsers,
            data: JSON.stringify(reqBody)
        };
        ax(config)
            .then((response) => {
                messageHandler('success', textHere(TTControlAccount.state_account_edited,lang))
                setFinished(true)
            }).catch((error) => {
                messageHandler('error', textHere(TTAlertTexts.error_try_again,lang))
            })
    }

    function onDelUser() {
        var config = {
            method: 'del',
            maxBodyLength: Infinity,
            url: urlUsers + `${userData.id}/`,
        };
        messageHandler('loading', textHere(TTStates.requesting,lang))
        ax(config)
            .then((response) => {
                messageHandler('success', textHere(TTControlAccount.state_account_deleted,lang))
                setFinished(true)
            }).catch((error) => {
                messageHandler('error', textHere(TTAlertTexts.error_try_again,lang))
            })
    }


    return (
        <div>
            <div className='flex justify-between pb-10'>
                <div className='w-96 pt-3'>
                    <ListItemTitle title={textHere(TTControlAccount.main_head,lang)} />
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
                    progressDot
                    className='pb-8'
                    current={step.currentStep}
                    status={step.stepStatus}
                    items={operation.seq}
                />}
                <div>
                    {createSteps(operation)}

                    <ModalAlert
                        title={textHere(TTControlAccount.head_add,lang)}
                        description={textHere(TTAlertTexts.are_you_sure,lang)}
                        okButtonText={textHere(TTButtons.confirm,lang)}
                        cancelButtonText={textHere(TTButtons.cancel,lang)}
                        isOpen={modalVisible}
                        okButtonClick={() => {
                        }}
                        cancelButtonClick={() => setModalVisible(false)}
                    />
                </div>
            </> : <ResultForm
                type='info'
                title={textHere(TTPermissions.you_dont_have_permission,lang)}
                subtitle={textHere(TTPermissions.you_dont_have_permission_desc,lang)}
            />}
        </div>
    );
};

export default Control_NewAccount;
