import React from 'react';
import { Space, Spin } from 'antd';
const LoadingIndicator = ({text}) => {
    return (
        <Space className='flex flex-col justify-center' size="large">
            <Spin size="large" />
            {text && <p className="font-['IRANSans'] text-gray-500">{text}</p>}
        </Space>
    );
};

export default LoadingIndicator;