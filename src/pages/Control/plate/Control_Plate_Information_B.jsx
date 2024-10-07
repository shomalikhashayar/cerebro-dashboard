import React, { useState } from 'react';
import { Button, Form, Input, Select } from "antd";
import ButtonB from '../../../components/ButtonB';
import { useStateContext } from '../../../contexts/ContextProvider';
import { textHere, TTButtons, TTControlPlate, TTPlaceholders } from '../../../utils/intl';
const { Option } = Select;




// B step
const Control_Plate_Information_B = ({ onFinish }) => {

    const {lang} = useStateContext()
    // results as an object
    const [result, setResult] = useState({
        owner: '',
        model: '',
        plate: '',
        personal_code: '',
    });

    // flags for inputs
    const [inputStatusFlags, setInputStatusFlags] = useState({
        owner: '',
        model: '',
        plate: '',
        personal_code: '',

    })


    // if all flags are empty its good to go to next
    function validateHandler() {
        return (inputStatusFlags.owner !== 'error' &&
            inputStatusFlags.model !== 'error' &&
            inputStatusFlags.plate !== 'error' &&
            inputStatusFlags.personal_code !== 'error' &&
            // in case user clicks for the first time
            result.owner !== '')
    }

    function onFinishHandler() {
        // set flags using result
        setInputStatusFlags({
            owner: result.owner === '' ? 'error' : '',
            model: result.model === '' ? 'error' : '',
            plate: result.plate === '' ? 'error' : '',
            personal_code: result.personal_code === '' ? 'error' : '',
        })
        onFinish(result, validateHandler())

    }


    return <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 7 }}
    >
        <Form.Item label={textHere(TTControlPlate.vehicle_owner,lang)}>
            <Input status={inputStatusFlags.owner}
                onChange={(e) => {
                    setResult({ ...result, owner: e.target.value })
                }} />
        </Form.Item>
        <Form.Item label={textHere(TTControlPlate.vehicle_model,lang)}>
            <Input status={inputStatusFlags.model}
                onChange={(e) => {
                    setResult({ ...result, model: e.target.value })
                }} />
        </Form.Item>
        <Form.Item label={textHere(TTControlPlate.vehicle_plate_number,lang)}>
            <Input status={inputStatusFlags.plate}
                onChange={(e) => {
                    setResult({ ...result, plate: e.target.value })
                }} />
        </Form.Item>
        

        <Form.Item wrapperCol={{ offset: 4 }}>
            <ButtonB
                onClick={onFinishHandler}
            >
                {textHere(TTButtons.next_step,lang)}
            </ButtonB>
        </Form.Item>
    </Form>
};

export default Control_Plate_Information_B;
