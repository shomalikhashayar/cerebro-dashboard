import React from 'react';
import {Button} from 'antd'

const ButtonB = ({children,className,onClick=(()=>{}),enabled=true,loading=false}) => {

     return (
        <Button        
        disabled={!enabled}
        onClick={onClick} className={className+` bg-c1 dark:bg-c5 text-c3`}
        loading={loading}
        >
            {children}
        </Button>
    );
};

export default ButtonB;
