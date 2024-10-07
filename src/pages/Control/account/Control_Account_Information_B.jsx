import React, { useState } from 'react';
import {   Form, Input, Radio, Select } from "antd";
import { StaffModel } from "../../../utils/listItemsItems";
import ButtonB from '../../../components/ButtonB';
import { useApplication } from '../../../contexts/ContextProviderApp'
import { checkForStatusFlagString, logSomething, } from '../../../utils/utils';
import { allPermissionsMap } from '../../../utils/utils';
import { useStateContext } from '../../../contexts/ContextProvider'
import { TemplateTexts, textHere, TTAlertTexts, TTButtons, TTForms, TTPlaceholders, TTStaffModel } from '../../../utils/intl';
import HandfulDatePicker from '../../../components/HandfulDatePicker';

const { Option } = Select;


function initUserPersonnel(prevInfo) {

    if (prevInfo === null) {
        return {
            first_name: '',
            last_name: '',
            military_rank: '',
            military_part: '',
            work_code: '',
            employment_date: '',
            employment_type: '',
            birth_date: '',
            father_name: '',
            national_id_number: '',
            marriage_status: '',
            working_status: '',
            phone_number: '',
            group_unit: '',
            user_permissions: {},
        }
    } else {
        return {
            first_name: prevInfo.first_name,
            last_name: prevInfo.last_name,
            military_rank: prevInfo.military_rank,
            military_part: prevInfo.military_part,
            work_code: prevInfo.work_code,
            employment_date: prevInfo.employment_date,
            employment_type: prevInfo.employment_type,
            birth_date: prevInfo.birth_date,
            father_name: prevInfo.father_name,
            national_id_number: prevInfo.national_id_number,
            marriage_status: prevInfo.marriage_status,
            working_status: prevInfo.working_status,
            phone_number: prevInfo.phone_number,
            group_unit: prevInfo.group_unit,
            user_permissions: prevInfo.user_permissions,
        }
    }
}

function initUserDuty(prevInfo) {

    if (prevInfo === null) {
        return {
            first_name: '',
            last_name: '',
            military_rank: '',
            military_part: '',
            dispatch_date: '',
            duty_date: '',
            discharge_date: '',
            birth_date: '',
            father_name: '',
            national_id_number: '',
            marriage_status: '',
            working_status: '',
            phone_number: '',
            group_unit: '',
            user_permissions: {},
        }
    } else {
        return {
            first_name: prevInfo.first_name,
            last_name: prevInfo.last_name,
            military_rank: prevInfo.military_rank,
            military_part: prevInfo.military_part,
            dispatch_date: prevInfo.dispatch_date,
            duty_date: prevInfo.duty_date,
            discharge_date: prevInfo.discharge_date,
            birth_date: prevInfo.birth_date,
            father_name: prevInfo.father_name,
            national_id_number: prevInfo.national_id_number,
            marriage_status: prevInfo.marriage_status,
            working_status: prevInfo.working_status,
            phone_number: prevInfo.phone_number,
            group_unit: prevInfo.group_unit,
            user_permissions: prevInfo.user_permissions,
        }
    }
}

function initStatusFlagsPersonnel(prevInfo) {

    if (prevInfo === null) {
        return {
            first_name: '',
            last_name: '',
            military_rank: '',
            military_part: '',
            work_code: '',
            employment_date: '',
            employment_type: '',
            birth_date: '',
            father_name: '',
            national_id_number: '',
            marriage_status: '',
            working_status: '',
            phone_number: '',
            group_unit: '',
            user_permissions: 'warning',
            form_changed: false
        }
    } else {
        return {
            first_name: checkForStatusFlagString(prevInfo.first_name),
            last_name: checkForStatusFlagString(prevInfo.last_name),
            military_rank: checkForStatusFlagString(prevInfo.military_rank),
            military_part: checkForStatusFlagString(prevInfo.military_part),
            work_code: checkForStatusFlagString(prevInfo.work_code),
            employment_date: checkForStatusFlagString(prevInfo.employment_date),
            employment_type: checkForStatusFlagString(prevInfo.employment_type),
            birth_date: checkForStatusFlagString(prevInfo.birth_date),
            father_name: checkForStatusFlagString(prevInfo.father_name),
            national_id_number: checkForStatusFlagString(prevInfo.national),
            marriage_status: checkForStatusFlagString(prevInfo.marriage_status),
            working_status: checkForStatusFlagString(prevInfo.working_status),
            phone_number: checkForStatusFlagString(prevInfo.phone_number),
            group_unit: checkForStatusFlagString(prevInfo.group_unit),
            user_permissions: prevInfo.user_permissions,
            form_changed: false
        }
    }


}

function initStatusFlagsDuty(prevInfo) {
    if (prevInfo === null) {
        return {
            first_name: '',
            last_name: '',
            military_rank: '',
            military_part: '',
            dispatch_date: '',
            duty_date: '',
            discharge_date: '',
            birth_date: '',
            father_name: '',
            national_id_number: '',
            marriage_status: '',
            working_status: '',
            phone_number: '',
            group_unit: '',
            user_permissions: 'warning',
            form_changed: false
        }
    } else {
        return {
            first_name: checkForStatusFlagString(prevInfo.first_name),
            last_name: checkForStatusFlagString(prevInfo.last_name),
            military_rank: checkForStatusFlagString(prevInfo.military_rank),
            military_part: checkForStatusFlagString(prevInfo.military_part),
            dispatch_date: checkForStatusFlagString(prevInfo.dispatch_date),
            duty_date: checkForStatusFlagString(prevInfo.duty_date),
            discharge_date: checkForStatusFlagString(prevInfo.discharge_date),
            birth_date: checkForStatusFlagString(prevInfo.birth_date),
            father_name: checkForStatusFlagString(prevInfo.father_name),
            national_id_number: checkForStatusFlagString(prevInfo.national_id_number),
            marriage_status: checkForStatusFlagString(prevInfo.marriage_status),
            working_status: checkForStatusFlagString(prevInfo.working_status),
            phone_number: checkForStatusFlagString(prevInfo.phone_number),
            group_unit: checkForStatusFlagString(prevInfo.group_unit),
            user_permissions: prevInfo.user_permissions,
            form_changed: false
        }
    }
}

// B step
const Control_Account_Information_B = ({ onFinish, prevInfo = null }) => {

    const { lang } = useStateContext()
    const hasDefaultValues = prevInfo !== null
    let userType = 'personnel'
    if (hasDefaultValues) {
        userType = prevInfo.type ?? 'personnel'
    }



    const { messageHandler } = useApplication()
    const [radioTypes, setRadioTypes] = useState(userType)

    // results as an object
    const [userPersonnel, setUserPersonnel] = useState(radioTypes === 'personnel' ? initUserPersonnel(prevInfo) : {})

    const [userDuty, setUserDuty] = useState(radioTypes === 'duty' ? initUserDuty(prevInfo) : {})

    // flags for inputs
    const [statusFlagsPersonnel, setStatusFlagsPersonnel] = useState(radioTypes === 'personnel' ? initStatusFlagsPersonnel(prevInfo) : {})
    const [statusFlagsDuty, setStatusFlagsDuty] = useState(radioTypes === 'duty' ? initStatusFlagsDuty(prevInfo) : {})


    // if all flags are empty its good to go to next
    function isValidPersonnelHandler() {


        // set flags using result
        setStatusFlagsPersonnel({
            first_name: checkForStatusFlagString(userPersonnel.first_name),
            last_name: checkForStatusFlagString(userPersonnel.last_name),
            military_rank: checkForStatusFlagString(userPersonnel.military_rank),
            military_part: checkForStatusFlagString(userPersonnel.military_part),
            work_code: checkForStatusFlagString(userPersonnel.work_code),
            employment_date: checkForStatusFlagString(userPersonnel.employment_date),
            employment_type: checkForStatusFlagString(userPersonnel.employment_type),
            birth_date: checkForStatusFlagString(userPersonnel.birth_date),
            father_name: checkForStatusFlagString(userPersonnel.father_name),
            national_id_number: checkForStatusFlagString(userPersonnel.national_id_number),
            marriage_status: checkForStatusFlagString(userPersonnel.marriage_status),
            working_status: checkForStatusFlagString(userPersonnel.working_status),
            phone_number: checkForStatusFlagString(userPersonnel.phone_number),
            group_unit: checkForStatusFlagString(userPersonnel.group_unit),
            user_permissions: Object.keys(userPersonnel.user_permissions).length > 0 ? '' : 'error'
        })

        return (
            statusFlagsPersonnel.first_name !== 'error' &&
            statusFlagsPersonnel.last_name !== 'error' &&
            statusFlagsPersonnel.military_rank !== 'error' &&
            statusFlagsPersonnel.military_part !== 'error' &&
            statusFlagsPersonnel.work_code !== 'error' &&
            statusFlagsPersonnel.employment_date !== 'error' &&
            statusFlagsPersonnel.employment_type !== 'error' &&
            statusFlagsPersonnel.birth_date !== 'error' &&
            statusFlagsPersonnel.father_name !== 'error' &&
            statusFlagsPersonnel.national_id_number !== 'error' &&
            statusFlagsPersonnel.marriage_status !== 'error' &&
            statusFlagsPersonnel.working_status !== 'error' &&
            statusFlagsPersonnel.phone_number !== 'error' &&
            statusFlagsPersonnel.group_unit !== 'error' &&
            statusFlagsPersonnel.user_permissions !== 'error' && statusFlagsPersonnel.form_changed)

    }

    function isValidDutyHandler() {

        // set flags using result
        setStatusFlagsDuty({
            first_name: checkForStatusFlagString(userDuty.first_name),
            last_name: checkForStatusFlagString(userDuty.last_name),
            military_rank: checkForStatusFlagString(userDuty.military_rank),
            military_part: checkForStatusFlagString(userDuty.military_part),
            dispatch_date: checkForStatusFlagString(userDuty.dispatch_date),
            duty_date: checkForStatusFlagString(userDuty.duty_date),
            discharge_date: checkForStatusFlagString(userDuty.discharge_date),
            birth_date: checkForStatusFlagString(userDuty.birth_date),
            father_name: checkForStatusFlagString(userDuty.father_name),
            national_id_number: checkForStatusFlagString(userDuty.national_id_number),
            marriage_status: checkForStatusFlagString(userDuty.marriage_status),
            working_status: checkForStatusFlagString(userDuty.working_status),
            phone_number: checkForStatusFlagString(userDuty.phone_number),
            group_unit: checkForStatusFlagString(userDuty.group_unit),
            user_permissions: Object.keys(userDuty.user_permissions).length > 0 ? '' : 'error'
        })
        logSomething(statusFlagsDuty)

        return (
            statusFlagsDuty.first_name !== 'error' &&
            statusFlagsDuty.last_name !== 'error' &&
            statusFlagsDuty.military_rank !== 'error' &&
            statusFlagsDuty.military_part !== 'error' &&
            statusFlagsDuty.dispatch_date !== 'error' &&
            statusFlagsDuty.duty_date !== 'error' &&
            statusFlagsDuty.discharge_date !== 'error' &&
            statusFlagsDuty.birth_date !== 'error' &&
            statusFlagsDuty.father_name !== 'error' &&
            statusFlagsDuty.national_id_number !== 'error' &&
            statusFlagsDuty.marriage_status !== 'error' &&
            statusFlagsDuty.working_status !== 'error' &&
            statusFlagsDuty.phone_number !== 'error' &&
            statusFlagsDuty.group_unit !== 'error' &&
            statusFlagsDuty.user_permissions !== 'error' && statusFlagsDuty.form_changed)
    }

    function onFinishPersonnelHandler() {
        onFinish(userPersonnel, isValidPersonnelHandler())
    }

    function onFinishDutyHandler() {
        onFinish(userDuty, isValidDutyHandler())
    }

    const radioOptions = [
        {
            label: textHere(TTStaffModel.personnel.personnel, lang),
            value: 'personnel',
            disabled: false,
        },
        {
            label: textHere(TTStaffModel.duty.duty, lang),
            value: 'duty',
            disabled: false,
        },
    ]

    const onChangeRadio = (e) => {
        setRadioTypes(e.target.value)
        if (radioTypes === 'personnel') {
            setUserPersonnel(initUserPersonnel(prevInfo))
            setStatusFlagsPersonnel(initStatusFlagsPersonnel(prevInfo))
        } else if (radioTypes === 'duty') {
            setUserDuty(initUserDuty(prevInfo))
            setStatusFlagsDuty(initStatusFlagsDuty(prevInfo))
        }
    }

    function getDefaultValueForItem(staffModelItem) {
        if (hasDefaultValues) {
            if (radioTypes === 'personnel') {
                if (staffModelItem === TTStaffModel.personnel.first_name.eng) {
                    return userPersonnel.first_name
                } else if (staffModelItem === TTStaffModel.personnel.last_name.eng) {
                    return userPersonnel.last_name
                } else if (staffModelItem === TTStaffModel.personnel.military_rank.eng) {
                    return userPersonnel.military_rank
                } else if (staffModelItem === TTStaffModel.personnel.military_part.eng) {
                    return userPersonnel.military_part
                } else if (staffModelItem === TTStaffModel.personnel.work_code.eng) {
                    return userPersonnel.work_code
                } else if (staffModelItem === TTStaffModel.personnel.employment_date.eng) {
                    return userPersonnel.employment_date
                } else if (staffModelItem === TTStaffModel.personnel.employment_type.eng) {
                    return userPersonnel.employment_type
                } else if (staffModelItem === TTStaffModel.personnel.birth_date.eng) {
                    return userPersonnel.birth_date
                } else if (staffModelItem === TTStaffModel.personnel.father_name.eng) {
                    return userPersonnel.father_name
                } else if (staffModelItem === TTStaffModel.personnel.national_id_number.eng) {
                    return userPersonnel.national_id_number
                } else if (staffModelItem === TTStaffModel.personnel.marriage_status.eng) {
                    return userPersonnel.marriage_status
                } else if (staffModelItem === TTStaffModel.personnel.working_status.eng) {
                    return userPersonnel.working_status
                } else if (staffModelItem === TTStaffModel.personnel.phone_number.eng) {
                    return userPersonnel.phone_number
                } else if (staffModelItem === TTStaffModel.personnel.groups.eng) {
                    return userPersonnel.group_unit
                } else {
                    return ''
                }
            } else if (radioTypes === 'duty') {
                if (staffModelItem === TTStaffModel.duty.first_name.eng) {
                    return userDuty.first_name
                } else if (staffModelItem === TTStaffModel.duty.last_name.eng) {
                    return userDuty.last_name
                } else if (staffModelItem === TTStaffModel.duty.military_rank.eng) {
                    return userDuty.military_rank
                } else if (staffModelItem === TTStaffModel.duty.military_part.eng) {
                    return userDuty.military_part
                } else if (staffModelItem === TTStaffModel.duty.dispatch_date.eng) {
                    return userDuty.dispatch_date
                } else if (staffModelItem === TTStaffModel.duty.discharge_date.eng) {
                    return userDuty.discharge_date
                } else if (staffModelItem === TTStaffModel.duty.birth_date.eng) {
                    return userDuty.birth_date
                } else if (staffModelItem === TTStaffModel.duty.father_name.eng) {
                    return userDuty.father_name
                } else if (staffModelItem === TTStaffModel.duty.national_id_number.eng) {
                    return userDuty.national_id_number
                } else if (staffModelItem === TTStaffModel.duty.marriage_status.eng) {
                    return userDuty.marriage_status
                } else if (staffModelItem === TTStaffModel.duty.working_status.eng) {
                    return userDuty.working_status
                } else if (staffModelItem === TTStaffModel.duty.phone_number.eng) {
                    return userDuty.phone_number
                } else if (staffModelItem === TTStaffModel.duty.group_unit.eng) {
                    return userDuty.group_unit
                } else {
                    return ''
                }
            }
        } else {
            return ''
        }
    }

    function createFormForPersonnel() {
        return <>
            <Form.Item label={textHere(TTStaffModel.personnel.first_name, lang)}>
                <Input
                    status={statusFlagsPersonnel.first_name}
                    key='1'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, first_name: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            first_name: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.first_name.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.last_name, lang)}>
                <Input
                    status={statusFlagsPersonnel.last_name}
                    key='2'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, last_name: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            last_name: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.last_name.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.military_rank, lang)}>
                <Input
                    status={statusFlagsPersonnel.military_rank}
                    key='3'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, military_rank: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            military_rank: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.military_rank.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.military_part, lang)}>
                <Input
                    status={statusFlagsPersonnel.military_part}
                    key='4'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, military_part: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            military_part: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.military_part.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.work_code, lang)}>
                <Input
                    status={statusFlagsPersonnel.work_code}
                    key='5'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, work_code: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            work_code: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.work_code.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.employment_date, lang)}>
                    <HandfulDatePicker key='6' onTrigger={(date, isValid) => {
                        if(isValid){
                        setUserPersonnel((prevState) => ({ ...prevState, employment_date: date }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            employment_date: isValid,
                            form_changed: true
                        }))
                    }
                    }} />

            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.employment_type, lang)}>
                <Select
                    status={statusFlagsPersonnel.employment_type}
                    key='7'
                    options={[
                        {
                            value: 'office',
                            label: textHere(TTStaffModel.type_of_hamkari.rasmi, lang)
                        },
                        {
                            value: 'project',
                            label: textHere(TTStaffModel.type_of_hamkari.paymani, lang)
                        },
                        {
                            value: 'contract',
                            label: textHere(TTStaffModel.type_of_hamkari.gharardadi, lang)
                        },
                    ]}
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, employment_type: e }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            employment_type: checkForStatusFlagString(e),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.employment_type.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.birth_date, lang)}>
                    <HandfulDatePicker key='8' onTrigger={(date, isValid) => {
                        setUserPersonnel((prevState) => ({ ...prevState, birth_date: date }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            employment_date: isValid,
                            form_changed: true
                        }))

                    }} />

            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.father_name, lang)}>
                <Input
                    status={statusFlagsPersonnel.father_name}
                    key='9'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, father_name: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            father_name: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.father_name.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.national_id_number, lang)}>
                <Input
                    status={statusFlagsPersonnel.national_id_number}
                    key='10'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, national_id_number: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            national_id_number: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.national_id_number.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.marriage_status, lang)}>
                <Select
                    status={statusFlagsPersonnel.marriage_status}
                    key='11'
                    options={[
                        {
                            value: 'married',
                            label: textHere(TemplateTexts.options_married, lang)
                        },
                        {
                            value: 'single',
                            label: textHere(TemplateTexts.options_single, lang)
                        }
                    ]}
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, marriage_status: e }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            marriage_status: checkForStatusFlagString(e),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.marriage_status.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.working_status, lang)}>
                <Input
                    status={statusFlagsPersonnel.working_status}
                    key='12'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, working_status: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            working_status: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.working_status.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.phone_number, lang)}>
                <Input
                    status={statusFlagsPersonnel.phone_number}
                    key='13'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, phone_number: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            phone_number: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.phone_number.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.personnel.group_unit, lang)}>
                <Input
                    status={statusFlagsPersonnel.group_unit}
                    key='14'
                    onChange={(e) => {
                        setUserPersonnel((prevState) => ({ ...prevState, group_unit: e.target.value }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            group_unit: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.personnel.group_unit.eng)}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 15 }}
                label={textHere(TTForms.title_permissions, lang)}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder={textHere(TTPlaceholders.click_for_permissions, lang)}
                    defaultValue={hasDefaultValues ? userPersonnel.user_permissions : []}
                    onChange={(selectedItems) => {
                        setUserPersonnel((prevState) => ({ ...prevState, user_permissions: selectedItems }))
                        setStatusFlagsPersonnel((prevState) => ({
                            ...prevState,
                            user_permissions: Object.keys(selectedItems).length > 0 ? '' : 'error',
                            form_changed: true
                        }))
                    }}
                    optionLabelProp="label"
                    status={statusFlagsPersonnel.user_permissions}>

                    {allPermissionsMap.map((item) =>
                        <Option value={item.id} label={item.farsi}>
                            <p>{item.farsi}</p>
                        </Option>
                    )}
                </Select>
            </Form.Item>
        </>
    }

    function createFormForDuty() {
        return <>
            <Form.Item label={textHere(TTStaffModel.duty.first_name, lang)}>
                <Input
                    status={statusFlagsDuty.first_name}
                    key='1'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...prevState, first_name: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            first_name: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.first_name.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.last_name, lang)}>
                <Input
                    status={statusFlagsDuty.last_name}
                    key='2'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...prevState, last_name: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            last_name: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.last_name.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.military_rank, lang)}>
                <Input
                    status={statusFlagsDuty.military_rank}
                    key='3'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...userDuty, military_rank: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            military_rank: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.military_rank.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.military_part, lang)}>
                <Input
                    status={statusFlagsDuty.military_part}
                    key='4'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...userDuty, military_part: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            military_part: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.military_part.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.dispatch_date, lang)}>
                    <HandfulDatePicker key='5' onTrigger={(date,isValid)=>{
                        setUserDuty((prevState) => ({ ...userDuty, dispatch_date: date }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            dispatch_date: isValid,
                            form_changed: true
                        }))
                    }} />            
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.duty_date, lang)}>
                <Input
                    status={statusFlagsDuty.duty_date}
                    key='6'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...userDuty, duty_date: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            duty_date: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.duty_date.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.discharge_date, lang)}>
               <HandfulDatePicker key='7' onTrigger={(date,isValid)=>{
                 setUserDuty((prevState) => ({ ...prevState, discharge_date: date }))
                 setStatusFlagsDuty((prevState) => ({
                     ...prevState,
                     discharge_date: isValid,
                     form_changed: true
                 }))
               }} />

            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.birth_date, lang)}>
            <HandfulDatePicker key='8' onTrigger={(date,isValid)=>{
                 setUserDuty((prevState) => ({ ...prevState, birth_date: date }))
                 setStatusFlagsDuty((prevState) => ({
                     ...prevState,
                     birth_date: isValid,
                     form_changed: true
                 }))
            }} />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.father_name, lang)}>
                <Input
                    status={statusFlagsDuty.father_name}
                    key='9'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...prevState, father_name: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            father_name: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.father_name.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.national_id_number, lang)}>
                <Input
                    status={statusFlagsDuty.national_id_number}
                    key='10'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...prevState, national_id_number: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            national_id_number: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.national_id_number.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.marriage_status, lang)}>
                <Select
                    status={statusFlagsDuty.marriage_status}
                    key='11'
                    options={[
                        {
                            value: 'married',
                            label: textHere(TemplateTexts.options_married, lang)
                        },
                        {
                            value: 'single',
                            label: textHere(TemplateTexts.options_single, lang)
                        }
                    ]}
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...prevState, marriage_status: e }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            marriage_status: checkForStatusFlagString(e),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.marriage_status.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.working_status, lang)}>
                <Input
                    status={statusFlagsDuty.working_status}
                    key='12'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...prevState, working_status: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            working_status: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.working_status.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.phone_number, lang)}>
                <Input
                    status={statusFlagsDuty.phone_number}
                    key='13'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...prevState, phone_number: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            phone_number: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.phone_number.eng)}
                />
            </Form.Item>
            <Form.Item label={textHere(TTStaffModel.duty.group_unit, lang)}>
                <Input
                    status={statusFlagsDuty.group_unit}
                    key='14'
                    onChange={(e) => {
                        setUserDuty((prevState) => ({ ...prevState, group_unit: e.target.value }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            group_unit: checkForStatusFlagString(e.target.value),
                            form_changed: true
                        }))
                    }}
                    defaultValue={getDefaultValueForItem(TTStaffModel.duty.group_unit.eng)}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 15 }}
                label={textHere(TTForms.title_permissions, lang)}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder={textHere(TTPlaceholders.click_for_permissions, lang)}
                    defaultValue={hasDefaultValues ? userDuty.user_permissions : []}
                    onChange={(selectedItems) => {
                        setUserDuty((prevState) => ({ ...userDuty, user_permissions: selectedItems }))
                        setStatusFlagsDuty((prevState) => ({
                            ...prevState,
                            user_permissions: Object.keys(selectedItems).length > 0 ? '' : 'error',
                            form_changed: true
                        }))
                    }}
                    optionLabelProp="label"
                    status={statusFlagsDuty.user_permissions}>

                    {allPermissionsMap.map((item) =>
                        <Option value={item.id} label={item.farsi}>
                            <p>{item.farsi}</p>
                        </Option>
                    )}
                </Select>
            </Form.Item>
        </>
    }


    function onClickNextHandler() {
        if (radioTypes === 'personnel') {
            if (isValidPersonnelHandler()) {
                onFinishPersonnelHandler()
            } else {
                messageHandler('error', textHere(TTAlertTexts.enter_fields_correctly, lang))
            }
        } else if (radioTypes === 'duty') {
            if (isValidDutyHandler()) {
                onFinishDutyHandler()
            } else {
                messageHandler('error', textHere(TTAlertTexts.enter_fields_correctly, lang))
            }
        }
    }

    return <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 7 }}

    >
        <Form.Item
            label={textHere(TTStaffModel.personnel.type, lang)}>
            <Radio.Group
                options={radioOptions}
                onChange={onChangeRadio}
                value={radioTypes}
                optionType="default"
                buttonStyle="solid"
                size='middle'
            />
        </Form.Item>

        {radioTypes === 'personnel' && createFormForPersonnel()}
        {radioTypes === 'duty' && createFormForDuty()}
        <Form.Item wrapperCol={{ offset: 4 }}>
            <ButtonB onClick={() => {
                onClickNextHandler()
            }}>
                {textHere(TTButtons.next_step, lang)}
            </ButtonB>
        </Form.Item>
    </Form>
};

export default Control_Account_Information_B;


