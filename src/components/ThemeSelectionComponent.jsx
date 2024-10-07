import React from 'react';
import {CheckOutlined} from "@ant-design/icons";

const ThemeSelectionComponent = ({themeMode, selected = true}) => {


    return (
        <div className='relative p-5'>
            <div
                className='absolute bottom-0 left-0 w-10 h-10 rounded-full flex items-center justify-center border-1 border-c2 ' />
            <div
                className='absolute bottom-0 -left-3 w-10 h-10 rounded-full flex items-center justify-center border-1 border-c2 ' >
                {selected && <CheckOutlined className={'text-xl '}/>}
            </div>

        </div>
    );
};

export default ThemeSelectionComponent;
