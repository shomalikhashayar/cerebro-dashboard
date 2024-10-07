import React, {useState} from 'react';
import { Form, Input, Select, Spin, Space} from "antd";
import ResultForm from "../../../components/ResultForm";
import LoadingIndicator from "../../../components/LoadingIndicator";
import ButtonB from '../../../components/ButtonB';
import { useStateContext } from '../../../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTButtons, TTControlPlate, TTForms } from '../../../utils/intl';

const {Option} = Select;


// A Step
const Control_Plate_Get_A = ({onFinish}) => {

    const {lang} = useStateContext()

    // get users account
    const [plateState, setPlateState] = useState({exists: true, requested: false, data: {}})

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


    function onSearchHandler(){

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
        labelCol={{span: 4}}
        wrapperCol={{span: 7}}
    >
        {plateState.requested ? <>
            {loading ? <LoadingIndicator/>
                : <>{plateState.exists ? <ResultForm
                    type='error'
                    title={textHere(TTAlertTexts.plate_not_found,lang)}
                    subtitle={textHere(TTAlertTexts.plate_not_found_desc,lang)}
                /> : createFormForUserData()}</>
            }
        </> : <p className='p-5'>{textHere(TTForms.desc_enter_plate_search,lang)}</p>}
        <Form.Item label="پلاک">
            <Input status={inputStatusFlags.personalCode}
                   onChange={(e) => {
                       setResult({personalCode: e.target.value})
                   }}/>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 4}}>
                 <ButtonB
                        onClick={onSearchHandler}>{textHere(TTButtons.search,lang)}</ButtonB>
                {plateState.exists && <ButtonB 
                                             onClick={onFinishHandler}>{textHere(TTControlPlate.edit_plate,lang)}</ButtonB>}
        </Form.Item>
    </Form>

}

export default Control_Plate_Get_A;
