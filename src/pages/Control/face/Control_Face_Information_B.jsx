import React, { useState } from 'react';
import { Button, Form, Input, Select } from "antd";
import ButtonB from '../../../components/ButtonB';
import { useStateContext } from '../../../contexts/ContextProvider';
import { textHere, TTButtons, TTForms } from '../../../utils/intl';
import { useSetRecoilState } from 'recoil';
import { newFaceDataAtom } from '../../../utils/logic/StateManager';



// B step
const Control_Face_Information_B = ({ onFinish }) => {

const setFaceData = useSetRecoilState(newFaceDataAtom)

    const {lang} = useStateContext()

    // results as an object
    const [result, setResult] = useState({
        firstName: '',
        lastName: '',
        level: '',
        personal_code: '',

    });

    // flags for inputs
    const [inputStatusFlags, setInputStatusFlags] = useState({
        firstName: 'a',
        lastName: '',
        level: '',
        personal_code: '',

    })


    // if all flags are empty its good to go to next
    function validateHandler() {
        return (inputStatusFlags.firstName !== 'error' &&
            inputStatusFlags.lastName !== 'error' &&
            inputStatusFlags.level !== 'error' &&
            inputStatusFlags.personal_code !== 'error' &&
            // in case user clicks for the first time
            result.firstName !== '')
    }

    function onFinishHandler() {
        // set flags using result
        setInputStatusFlags({
            firstName: result.firstName === '' ? 'error' : '',
            lastName: result.lastName === '' ? 'error' : '',
            level: result.level === '' ? 'error' : '',
            personal_code: result.personal_code === '' ? 'error' : '',
        })
        setFaceData(result)

        onFinish(result, validateHandler())
    }


    return <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 7 }}
    >
        <Form.Item label={textHere(TTForms.title_first_name,lang)}>
            <Input status={inputStatusFlags.firstName}
                onChange={(e) => {
                    setResult({ ...result, firstName: e.target.value })
                }} />
        </Form.Item>
        <Form.Item label={textHere(TTForms.title_last_name,lang)}>
            <Input status={inputStatusFlags.lastName}
                onChange={(e) => {
                    setResult({ ...result, lastName: e.target.value })
                }} />
        </Form.Item>
        <Form.Item label={textHere(TTForms.title_org_rank,lang)}>
            <Input status={inputStatusFlags.level}
                onChange={(e) => {
                    setResult({ ...result, level: e.target.value })
                }} />
        </Form.Item>
        <Form.Item label={textHere(TTForms.title_personnel_code,lang)}>
            <Input status={inputStatusFlags.personal_code}
                onChange={(e) => {
                    setResult({ ...result, personal_code: e.target.value })
                }}
                maxLength={15}
            />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
            <ButtonB onClick={onFinishHandler}
            >
                {textHere(TTButtons.next_step,lang)}
            </ButtonB>
        </Form.Item>
    </Form>
};

export default Control_Face_Information_B;
