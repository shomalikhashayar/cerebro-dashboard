import React from 'react';
import {Popconfirm} from "antd";
import {useStateContext} from  '../contexts/ContextProvider'
import { textHere, TTButtons } from '../utils/intl';
const PopConfirmP = ({children, className, title, description, onConfirm, onCancel,open}) => {
    const {lang}=useStateContext()
    return (
        <Popconfirm
            title={title}
            description={description}
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText={textHere(TTButtons.ok,lang)}
            cancelText={textHere(TTButtons.cancel,lang)}
            okButtonProps={{className: 'bg-c2'}}
            overlayClassName={'w-[300px] ' + className}
            open={open}
        >{children}</Popconfirm>
    );
};

export default PopConfirmP;
