import React from 'react';
import {useNavigate} from "react-router-dom";
import {clearTokens} from "../utils/storageHelper";
import {useStateContext} from "../contexts/ContextProvider";

const Logout = () => {
    const navigate = useNavigate()
    const {setLogin} = useStateContext()
    setLogin(false)
    // todo: clear tokens
    navigate('/login')
    return (
        <div className='flex w-full h-full text-2xl items-center justify-center'>
            <p>درحال خروج...</p>
        </div>
    );
};

export default Logout;
