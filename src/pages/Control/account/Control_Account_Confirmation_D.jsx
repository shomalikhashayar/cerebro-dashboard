import React, { useState } from 'react';
import { Form, Modal, Table } from "antd";
import ButtonB from '../../../components/ButtonB';
import { convertPermission4App } from '../../../utils/utils';
import { useStateContext } from '../../../contexts/ContextProvider'
import { textHere, TTAlertTexts, TTButtons, TTForms, TTStaffModel } from '../../../utils/intl';

// D step
const Control_Account_Confirmation_D = ({ onConfirm, onReset, userData, userPass = null }) => {

    let userType = 'personnel'
    if (userData.discharge_date) {
        userType = 'duty'
    }
    const { lang } = useStateContext()
    const [buttonClicked, setButtonClicked] = useState('');

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = (button) => {
        setButtonClicked(button)
        setOpen(true);
    };
    const handleOk = () => {

        if (buttonClicked === 'confirm') {
            setConfirmLoading(true);
            onConfirm()

            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
            }, 5000);
        } else {
            setConfirmLoading(true);
            onReset()
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
            }, 100);
        }

    };
    const handleCancel = () => {
        setOpen(false);
    };


    function createTableForPersonnelUser() {
        const columns = [
            {
                title: textHere(TTForms.title_title, lang),
                dataIndex: 'field',
                key: 'field',
                render: (text) => <p className="font-['IRANSans'] font-bold">{text}</p>,
            },
            {
                title: textHere(TTForms.title_values, lang),
                dataIndex: 'value',
                key: 'value',
                render: (text) => <p className="font-['IRANSans']">{text}</p>,
            },
        ]

        const data = [
            {
                key: '0',
                field: textHere(TTStaffModel.personnel.type, lang),
                value: textHere(TTStaffModel.personnel.personnel,lang),
            },
            {
                key: '1',
                field: textHere(TTStaffModel.personnel.first_name, lang),
                value: userData.first_name ?? '',
            },
            {
                key: '2',
                field: textHere(TTStaffModel.personnel.last_name, lang),
                value: userData.last_name ?? '',
            },
            {
                key: '3',
                field: textHere(TTStaffModel.personnel.military_rank, lang),
                value: userData.military_rank ?? '',
            },
            {
                key: '4',
                field: textHere(TTStaffModel.personnel.military_part, lang),
                value: userData.military_part ?? '',
            },
            {
                key: '5',
                field: textHere(TTStaffModel.personnel.work_code, lang),
                value: userData.work_code ?? '',
            },
            {
                key: '6',
                field: textHere(TTStaffModel.personnel.employment_date, lang),
                value: userData.employment_date ?? '',
            },
            {
                key: '7',
                field: textHere(TTStaffModel.personnel.employment_type, lang),
                value: userData.employment_type ?? '',
            },
            {
                key: '8',
                field: textHere(TTStaffModel.personnel.birth_date, lang),
                value: userData.birth_date ?? '',
            },
            {
                key: '9',
                field: textHere(TTStaffModel.personnel.father_name, lang),
                value: userData.father_name ?? '',
            },
            {
                key: '10',
                field: textHere(TTStaffModel.personnel.national_id_number, lang),
                value: userData.national_id_number ?? '',
            },
            {
                key: '11',
                field: textHere(TTStaffModel.personnel.marriage_status, lang),
                value: userData.marriage_status ?? '',
            },
            {
                key: '12',
                field: textHere(TTStaffModel.personnel.working_status, lang),
                value: userData.working_status ?? '',
            },
            {
                key: '13',
                field: textHere(TTStaffModel.personnel.phone_number, lang),
                value: userData.phone_number ?? '',
            },
            {
                key: '14',
                field: textHere(TTStaffModel.personnel.group_unit, lang),
                value: userData.group_unit ?? '',
            },
            {
                key: '15',
                field: textHere(TTForms.title_permissions,lang),
                value: userData.user_permissions.map(item => {
                    return convertPermission4App(item).farsi + ' - '
                })
            }
        ]

        return <Table
            className='w-1/2 p-5'
            pagination={false}
            loading={false}
            showHeader={true}
            scroll={{ y: 500 }}
            columns={columns}
            dataSource={data} />
    }

    function createTableForDutyUser(user) {
        const columns = [
            {
                title:textHere(TTForms.title_title,lang),
                dataIndex: 'field',
                key: 'field',
                render: (text) => <p className="font-bold">{text}</p>,
            },
            {
                title: textHere(TTForms.title_values,lang),
                dataIndex: 'value',
                key: 'value',
                render: (text) => <p className="">{text}</p>,
            },
        ]

        const data = [
            {
                key: '0',
                field: textHere(TTStaffModel.personnel.type, lang),
                value: textHere(TTStaffModel.duty.duty,lang),
            },
            {
                key: '1',
                field: textHere(TTStaffModel.duty.first_name, lang),
                value: userData.first_name ?? '',
            },
            {
                key: '2',
                field: textHere(TTStaffModel.duty.last_name, lang),
                value: userData.last_name ?? '',
            },
            {
                key: '3',
                field: textHere(TTStaffModel.duty.military_rank, lang),
                value: userData.military_rank ?? '',
            },
            {
                key: '4',
                field: textHere(TTStaffModel.duty.military_part, lang),
                value: userData.military_part ?? '',
            },
            {
                key: '5',
                field: textHere(TTStaffModel.duty.dispatch_date, lang),
                value: userData.dispatch_date ?? '',
            },
            {
                key: '6',
                field: textHere(TTStaffModel.duty.duty_date, lang),
                value: userData.duty_date ?? '',
            },
            {
                key: '7',
                field: textHere(TTStaffModel.duty.discharge_date, lang),
                value: userData.discharge_date ?? '',
            },
            {
                key: '8',
                field: textHere(TTStaffModel.duty.birth_date, lang),
                value: userData.birth_date ?? '',
            },
            {
                key: '9',
                field: textHere(TTStaffModel.duty.father_name, lang),
                value: userData.father_name ?? '',
            },
            {
                key: '10',
                field: textHere(TTStaffModel.duty.national_id_number, lang),
                value: userData.national_id_number ?? '',
            },
            {
                key: '11',
                field: textHere(TTStaffModel.duty.marriage_status, lang),
                value: userData.marriage_status ?? '',
            },
            {
                key: '12',
                field: textHere(TTStaffModel.duty.working_status, lang),
                value: userData.working_status ?? '',
            },
            {
                key: '13',
                field: textHere(TTStaffModel.duty.phone_number, lang),
                value: userData.phone_number ?? '',
            },
            {
                key: '14',
                field: textHere(TTStaffModel.duty.group_unit, lang),
                value: userData.group_unit ?? '',
            },
            {
                key: '15',
                field: textHere(TTForms.title_permissions,lang),
                value: userData.user_permissions.map(item => {
                    return convertPermission4App(item).farsi + ' - '
                })
            }
        ]

        return <Table
            className='w-1/2 p-5'
            pagination={false}
            loading={false}
            showHeader={true}
            scroll={{ y: 500 }}
            columns={columns}
            dataSource={data} />
    }


    function createTableForUserPass() {
        if (userPass) {
            const columns = [
                {
                    title: textHere(TTForms.title_title,lang),
                    dataIndex: 'field',
                    key: 'field',
                    render: (text) => <p className="font-['IRANSans'] font-bold">{text}</p>,
                },
                {
                    title: textHere(TTForms.title_values,lang),
                    dataIndex: 'value',
                    key: 'value',
                    render: (text) => <p className="font-['IRANSans']">{text}</p>,
                },
            ]

            const data = [
                {
                    key: '1',
                    field: textHere(TTForms.credential_username,lang),
                    value: userPass.username,
                },
                {
                    key: '2',
                    field: textHere(TTForms.credential_password,lang),
                    value: userPass.password,
                },

            ]

            return <Table
                className='w-1/2 p-5'
                pagination={false}
                loading={false}
                showHeader={true}
                scroll={{ y: 500 }}
                columns={columns}
                dataSource={data} />
        } else {
            return <></>
        }
    }


    return <Form>
        <div className='flex'>
            {userType === 'personnel' ? createTableForPersonnelUser() : createTableForDutyUser()}
            {createTableForUserPass()}
        </div>
        <div className='p-8 flex justify-around'>

            <ButtonB onClick={() => showModal('confirm')}>
                {textHere(TTButtons.confirm_and_send,lang)}
            </ButtonB>

            <ButtonB onClick={() => showModal('reset')}>
                {textHere(TTButtons.reset,lang)}
            </ButtonB>
            <Modal
                title={textHere(TTAlertTexts.are_you_sure,lang)}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okButtonProps={{ className: 'bg-c2' }}
                okText={textHere(TTButtons.ok,lang)}
                cancelText={textHere(TTButtons.cancel,lang)}
            />

        </div>
    </Form>
};

export default Control_Account_Confirmation_D;
