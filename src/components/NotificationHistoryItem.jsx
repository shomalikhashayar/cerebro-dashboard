import React from 'react';
import {  AlertOutlined,
    CarOutlined,
    IdcardOutlined} from '@ant-design/icons';
import { timeSince2 } from '../utils/timeSince';

// items in notification list in header
const NotificationHistoryItem = ({notif,onClick}) => {

    function createIcon(ic){
        if(ic === 'anomaly'){
            return <AlertOutlined/>
        }else if (ic === 'face'){
            return <IdcardOutlined/>
        }else if(ic === 'licenseplate'){
            return <CarOutlined/>
        }else{
            return <></>
        }
    }

    let isGranted = true
    return (

            <div
            key={notif.id}
            className={'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 flex  m-1 p-3 border-r-4 '+( isGranted ? 'border-green-500':'border-red-500')}>
                <button onClick={onClick} className='flex flex-grow items-center'>
                    {createIcon(notif.content_type)}
                <p className='px-2'>{notif.title}</p>
                <p className='flex-grow text-end'>{timeSince2(notif.updated_at)}</p>
                </button>
            </div>

    );
};

export default NotificationHistoryItem;
