import React, { useState } from 'react';
import { Form, Input, Space, Table } from "antd";
import ResultForm from "../../../components/ResultForm";
import LoadingIndicator from "../../../components/LoadingIndicator";
import axiosInstance from "../../../network/axiosInstance";
import { urlUsers } from "../../../network/urls";
import ButtonB from '../../../components/ButtonB';
import { Gdate2Persian } from '../../../utils/timeSince';
import { useApplication } from '../../../contexts/ContextProviderApp'
import { checkIsStringEmpty, convertPermission4App, logSomething } from '../../../utils/utils';
import { useStateContext } from '../../../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTForms, TTStates, TTStaffModel } from '../../../utils/intl';


// A Step
const Control_Account_Get_A = ({ onFinish }) => {

    const { lang } = useStateContext()
    const { messageHandler } = useApplication()
    const ax = axiosInstance()
    const [loading, setLoading] = useState(false)

    const [userState, setUserState] = useState({
        userExists: false,
        userDataRecived: false,
        data: {}
    })

    const [inputs, setInputs] = useState({ username: '' })
    const [statusFlags, setStatusFlags] = useState({ username: 'warning' })




    // if all flags are empty its good to go to next
    function inputsAreValidHandler() {
        logSomething('statusFlags')
        logSomething(statusFlags)
        return checkIsStringEmpty(statusFlags.username)
    }


    function searchHandler() {

        if (inputsAreValidHandler()) {
            setLoading(true)
            messageHandler('loading', textHere(TTStates.loading, lang))
            let url = urlUsers + `?username=${inputs.username}`
            ax.get(url)
                .then((response) => {
                    const jsonResponse = JSON.parse(response.data)
                    if (Object.keys(jsonResponse.results).length === 1) {
                        setUserState({ userExists: true, userDataRecived: true, data: jsonResponse.results[0] })
                        messageHandler('success', textHere(TTStates.success, lang))
                    } else {
                        setUserState({ userExists: false, userDataRecived: true, data: {} })
                        messageHandler('error', textHere(TTAlertTexts.user_not_found, lang))
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    setUserState({ userExists: false, userDataRecived: false, data: {} })
                    setLoading(false)
                    messageHandler('error', textHere(TTAlertTexts.error_try_again, lang))
                })
        } else {
            messageHandler('error', textHere(TTAlertTexts.enter_fields_correctly, lang))
        }

    }


    function editUserHandler() {

        if (inputsAreValidHandler()) {
            onFinish(userState.data, inputsAreValidHandler())
        } else {
            messageHandler('error', textHere(TTAlertTexts.enter_fields_correctly, lang))
        }
    }


    function createTableForUser(user) {
        const columns = [
            {
                title: textHere(TTForms.title_title, lang),
                dataIndex: 'field',
                key: 'field',
                render: (text) => <p className='font-bold'>{text}</p>,
            },
            {
                title: textHere(TTForms.title_values, lang),
                dataIndex: 'value',
                key: 'value',
                render: (text) => <p>{text}</p>,
            },
        ]

        var userData = []
        if (user.type === 'personnel') {
            userData = [
                {
                    key: '0',
                    field: textHere(TTStaffModel.personnel.type, lang),
                    value: textHere(TTStaffModel.personnel.personnel, lang),
                },
                {
                    key: '1',
                    field: textHere(TTStaffModel.personnel.first_name, lang),
                    value: user.first_name ?? '',
                },
                {
                    key: '2',
                    field: textHere(TTStaffModel.personnel.last_name, lang),
                    value: user.last_name ?? '',
                },
                {
                    key: '3',
                    field: textHere(TTStaffModel.personnel.military_rank, lang),
                    value: user.military_rank ?? '',
                },
                {
                    key: '4',
                    field: textHere(TTStaffModel.personnel.military_part, lang),
                    value: user.military_rank ?? '',
                },
                {
                    key: '5',
                    field: textHere(TTStaffModel.personnel.work_code, lang),
                    value: user.work_code ?? '',
                },
                {
                    key: '6',
                    field: textHere(TTStaffModel.personnel.employment_date, lang),
                    value: Gdate2Persian(userState.data.employment_date) ?? '',
                },
                {
                    key: '7',
                    field: textHere(TTStaffModel.personnel.employment_type, lang),
                    value: user.employment_type ?? '',
                },
                {
                    key: '8',
                    field: textHere(TTStaffModel.personnel.birth_date, lang),
                    value: Gdate2Persian(userState.data.birth_date) ?? '',
                },
                {
                    key: '9',
                    field: textHere(TTStaffModel.personnel.father_name, lang),
                    value: user.father_name ?? '',
                },
                {
                    key: '10',
                    field: textHere(TTStaffModel.personnel.national_id_number, lang),
                    value: user.national_id_number ?? '',
                },
                {
                    key: '11',
                    field: textHere(TTStaffModel.personnel.marriage_status, lang),
                    value: user.marriage_status ?? '',
                },
                {
                    key: '12',
                    field: textHere(TTStaffModel.personnel.working_status, lang),
                    value: user.working_status ?? '',
                },
                {
                    key: '13',
                    field: textHere(TTStaffModel.personnel.phone_number, lang),
                    value: user.phone_number ?? '',
                },
                {
                    key: '14',
                    field: textHere(TTStaffModel.personnel.group_unit, lang),
                    value: user.group_unit ?? '',
                },
                {
                    key: '15',
                    field: textHere(TTForms.title_permissions, lang),
                    value: user.user_permissions.map(item => {
                        return convertPermission4App(item).farsi + ' - '
                    })
                }
            ]
        } else if (user.type === 'duty') {
            userData = [
                {
                    key: '0',
                    field: textHere(TTStaffModel.duty.type, lang),
                    value: textHere(TTStaffModel.duty.duty, lang),
                },
                {
                    key: '1',
                    field: textHere(TTStaffModel.duty.first_name, lang),
                    value: user.first_name ?? '',
                },
                {
                    key: '2',
                    field: textHere(TTStaffModel.duty.last_name, lang),
                    value: user.last_name ?? '',
                },
                {
                    key: '3',
                    field: textHere(TTStaffModel.duty.military_rank, lang),
                    value: user.military_rank ?? '',
                },
                {
                    key: '4',
                    field: textHere(TTStaffModel.duty.military_part, lang),
                    value: user.military_rank ?? '',
                },
                {
                    key: '5',
                    field: textHere(TTStaffModel.duty.dispatch_date, lang),
                    value: user.dispatch_date ?? '',
                },
                {
                    key: '6',
                    field: textHere(TTStaffModel.duty.duty_date, lang),
                    value: Gdate2Persian(userState.data.duty_date) ?? '',
                },
                {
                    key: '7',
                    field: textHere(TTStaffModel.personnel.discharge_date, lang),
                    value: user.discharge_date ?? '',
                },
                {
                    key: '8',
                    field: textHere(TTStaffModel.personnel.birth_date, lang),
                    value: Gdate2Persian(userState.data.birth_date) ?? '',
                },
                {
                    key: '9',
                    field: textHere(TTStaffModel.personnel.father_name, lang),
                    value: user.father_name ?? '',
                },
                {
                    key: '10',
                    field: textHere(TTStaffModel.personnel.national_id_number, lang),
                    value: user.national_id_number ?? '',
                },
                {
                    key: '11',
                    field: textHere(TTStaffModel.personnel.marriage_status, lang),
                    value: user.marriage_status ?? '',
                },
                {
                    key: '12',
                    field: textHere(TTStaffModel.personnel.working_status, lang),
                    value: user.working_status ?? '',
                },
                {
                    key: '13',
                    field: textHere(TTStaffModel.personnel.phone_number, lang),
                    value: user.phone_number ?? '',
                },
                {
                    key: '14',
                    field: textHere(TTStaffModel.personnel.group_unit, lang),
                    value: user.group_unit ?? '',
                },
                {
                    key: '15',
                    field: textHere(TTForms.title_permissions, lang),
                    value: user.user_permissions.map(item => {
                        return convertPermission4App({ id: item }).farsi
                    })
                }
            ]

        }
        return <Table
            className='w-1/2 p-5'
            pagination={false}
            loading={false}
            showHeader={true}
            scroll={{ y: 500 }}
            columns={columns}
            dataSource={userData} />
    }


    const topTextGuide = <p className='p-5'>{textHere(TTForms.desc_enter_username_search, lang)}</p>
    function handleFlow() {
        return userState.userExists ?
            createTableForUser(userState.data) :
            <ResultForm
                type='error'
                title={textHere(TTAlertTexts.user_not_found, lang)}
                subtitle={textHere(TTAlertTexts.user_not_found_desc, lang)} />
    }

    function createButtons() {
        return <Form.Item wrapperCol={{ offset: 4 }}>
            <Space wrap>
                <ButtonB
                    onClick={searchHandler}>
                    جستجو
                </ButtonB>
                {userState.userExists && <ButtonB
                    onClick={editUserHandler}>{textHere(TTForms.title_edit_account, lang)}</ButtonB>}
            </Space>
        </Form.Item>
    }


    function createUsernameInput() {
        return <Form.Item label={textHere(TTForms.credential_username, lang)}>
            <Input status={statusFlags.username}
                onChange={(e) => {
                    setInputs({ username: e.target.value })
                    setStatusFlags({
                        username: checkIsStringEmpty(e.target.value) ? 'error' : ''
                    })
                }} />
        </Form.Item>
    }


    return <Form labelCol={{ span: 4 }} wrapperCol={{ span: 7 }}>
        {userState.userDataRecived ? <>{loading ? <LoadingIndicator /> : handleFlow()}</> : topTextGuide}
        {createUsernameInput()}
        {createButtons()}
    </Form>

}

export default Control_Account_Get_A;
