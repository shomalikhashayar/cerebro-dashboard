import React from 'react';
import {Divider} from 'antd';

const MenuTitleTip = ({title}) => {
    return (

        <Divider orientation='right'
                 className="font-['IRANSans']"
                 style={{color: '#2E424D', fontSize: 12, borderColor: '#2E424D'}}
        >
            {title}
        </Divider>

    );
};

export default MenuTitleTip;
