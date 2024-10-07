import React from 'react';
import { Result} from 'antd';


const ResultForm = ({type, title, subtitle, extras}) => 
        <Result
            status= {type}
            title={title}
            subTitle={subtitle}
            extra={extras}
        />

export default ResultForm;
