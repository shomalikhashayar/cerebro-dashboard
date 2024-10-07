import React, { useState } from 'react';
import { Form, Input } from "antd";
import ButtonB from '../../../components/ButtonB';
import {useStateContext} from '../../../contexts/ContextProvider'
import {textHere, TTButtons, TTForms} from '../../../utils/intl'

// C step
const Control_Account_Credentials_C = ({ onFinish ,prevInfo}) => {


    const {lang} = useStateContext()
    const hasDefaultValues = prevInfo !== null

    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const [result, setResult] = useState({
        username: hasDefaultValues?prevInfo.username:'',
        password: hasDefaultValues?prevInfo.password:'',
        password2: hasDefaultValues?prevInfo.password2:'',
    });

    const [inputStatusFlags, setInputStatusFlags] = useState({
        username: '',
        password: '',
        password2: '',
    });


    // flags must be empty and passwords match
    function validateHandler() {
        return inputStatusFlags.username !== 'error' &&
            inputStatusFlags.password !== 'error' &&
            inputStatusFlags.password2 !== 'error' &&
            // in case user clicks for first time
            result.password2 === result.password && result.password !== ''
    }


    function onFinishHandler() {
        setInputStatusFlags({
            username: result.username === '' ? 'error' : '',
            password: result.password === '' ? 'error' : '',
            password2: result.password2 === '' ? 'error' : ''
        })
        if (result.password !== result.password2) {
            setInputStatusFlags({ ...inputStatusFlags, password: 'error', password2: 'error' })
        }
        onFinish(result, validateHandler())
    }

    return <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 7 }}
    >
        <Form.Item label={textHere(TTForms.credential_username,lang)}>
            <Input status={inputStatusFlags.username}
                onChange={(e) => {
                    setResult({ ...result, username: e.target.value })
                }} 
                defaultValue={result.username}
                />
        </Form.Item>
        <Form.Item label={textHere(TTForms.credential_password,lang)}>
            <Input.Password status={inputStatusFlags.password}
                onChange={(e) => {
                    setResult({ ...result, password: e.target.value })
                }}
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} 
                defaultValue={result.password}
                />

        </Form.Item>
        <Form.Item label={textHere(TTForms.credential_password2,lang)}>
            <Input.Password status={inputStatusFlags.password2}
                onChange={(e) => {
                    setResult({ ...result, password2: e.target.value })
                }}
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} 
                defaultValue={result.password2}
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

export default Control_Account_Credentials_C;
