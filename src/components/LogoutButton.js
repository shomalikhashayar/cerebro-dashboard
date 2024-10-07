import React from 'react';
import {LogoutOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import PopConfirmP from "./PopConfirmP";
import {useStateContext} from '../contexts/ContextProvider'
import { textHere, TTAlertTexts, TTButtons, TTPlaceholders } from '../utils/intl';

const LogoutButton = () => {

    const {lang} = useStateContext()
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }

    const confirm = (e) => {
        handleLogout()
    };
    const cancel = (e) => {

    };

    return (

        <button className='flex p-3 hover:bg-gray-100 hover:rounded-xl dark:hover:bg-gray-700'>
            <PopConfirmP
                title={textHere(TTButtons.logout,lang)}
                autoAdjustOverflow={true}
                description={textHere(TTAlertTexts.are_you_sure,lang)}
                onConfirm={confirm}
                onCancel={cancel}>
                <LogoutOutlined className='text-2xl text-c2 rotate-180 p-1'/>
                <p className='p-1'>{textHere(TTButtons.logout,lang)}</p>
            </PopConfirmP>
        </button>

    );
};

export default LogoutButton;
