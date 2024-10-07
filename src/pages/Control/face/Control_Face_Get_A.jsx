import React, { useState } from 'react';
import { Form, Input } from "antd";
import ResultForm from "../../../components/ResultForm";
import { LoadingOutlined } from '@ant-design/icons';
import LoadingIndicator from "../../../components/LoadingIndicator";
import ButtonB from '../../../components/ButtonB';
import { useStateContext } from '../../../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTButtons, TTControlFace, TTForms } from '../../../utils/intl';


// A Step
const Control_Face_Get_A = ({ onFinish }) => {

    const {lang} = useStateContext()
    // get users account
    const [faceState, setFaceState] = useState({ exists: true, requested: false, data: {} })

    const [loading, setLoading] = useState(false)
    // results as an object
    const [result, setResult] = useState({
        personalCode: '',
    });

    // flags for inputs
    const [inputStatusFlags, setInputStatusFlags] = useState({
        personalCode: '',

    })

    // if all flags are empty its good to go to next
    function validateHandler() {
        return (inputStatusFlags.personalCode !== 'error' && result.personalCode !== '')
    }


    function onSearchHandler() {

    }

    function onFinishHandler() {
        // set flags using result
        setInputStatusFlags({
            personalCode: result.personalCode === '' ? 'error' : '',
        })

        onFinish(result, validateHandler())
    }


    function createFormForUserData() {
        return <>

        </>
    }


    return <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 7 }}
    >
        {faceState.requested ? <>
            {loading ? <LoadingIndicator />
                : <>{faceState.exists ? <ResultForm
                    type='error'
                    title={textHere(TTAlertTexts.face_not_found,lang)}
                    subtitle={textHere(TTAlertTexts.face_not_found_desc,lang)}
                /> : createFormForUserData()}</>
            }
        </> : <p className='p-5'>{textHere(TTForms.desc_enter_face_search,lang)}</p>}
        <Form.Item label={textHere(TTForms.credential_username)}>
            <Input status={inputStatusFlags.personalCode}
                onChange={(e) => {
                    setResult({ personalCode: e.target.value })
                }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
            <ButtonB onClick={onSearchHandler}>{textHere(TTButtons.search,lang)}</ButtonB>
            {faceState.exists && <ButtonB onClick={onFinishHandler}>{textHere(TTControlFace.edit_face,lang)}</ButtonB>}
        </Form.Item>
    </Form>

}

export default Control_Face_Get_A;
