import React, {useState} from 'react';
import {CaretDownOutlined, CaretUpOutlined, VideoCameraFilled, AlertOutlined,CarOutlined,IdcardOutlined} from '@ant-design/icons'
import EventItemInsideEntity from "./EventItemInsideEntity";
import {timeSince2} from "../utils/timeSince";
import {Tag } from 'antd';
    import { useStateContext } from '../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTPlaceholders } from '../utils/intl';
const ListItemExpandable = ({key, item,type,onClickCameraName=()=>{},hasTagEye=false}) => {

    const {lang}=useStateContext()
    const [expanded, setExpanded] = useState(false);
    let typeHere = type
    var needsTraining = false

    // determine type of event
    if(!type){
        typeHere = 'anomaly'
        if('face_id' in item){
            typeHere = 'face'
        }
        if('plate_number' in item){
            typeHere='plate'
        }
    }

    // determine type of icon used for that event
    let icon
        if(typeHere === 'anomaly'){
            icon =<AlertOutlined/>
            needsTraining=true
        }else if (typeHere === 'face'){
            icon= <IdcardOutlined/>
        }else if(typeHere === 'plate'){
            icon =<CarOutlined/>
        }else{
            icon= <></>
        }
    

    return (
        <div key={key} className='w-full py-2 drop-shadow-md text-c1 dark:text-c3'>
            <div className='flex w-full p-3 border-r-4 border-green-600 items-center justify-between ring-1 ring-c4 dark:ring-c2 bg-c3 dark:bg-c5'>
                <div className='flex'>
                    <div className='px-3'>{icon}</div>
                    <button onClick={() => {
                        setExpanded(!expanded)
                    }}>
                        {expanded ? <CaretUpOutlined className='text-lg'/> :
                            <CaretDownOutlined className='text-lg'/>}
                    </button>
                    <VideoCameraFilled className='text-xl rotate-180 pl-5 pr-3'/>
                    <button onClick={onClickCameraName}> <p className='text-xl font-medium '>{item.camera.title??textHere(TTPlaceholders.camera,lang)}</p></button>
                    <p className='font-lightpr-10 px-5'>{item.camera.zone.title??textHere(TTPlaceholders.zone,lang)}</p>
                    {needsTraining&& <Tag color='warning'>{textHere(TTAlertTexts.eye_needs_training,lang)}</Tag>}
                </div>
                <p className='font-medium'>{timeSince2(item?.detected_at)}</p>
            </div>
            {expanded && <div className='flex p-4 border-r-4 border-green-600 bg-c3 dark:bg-c5 ring-1 ring-c4 dark:ring-c2'>
                <EventItemInsideEntity key={key} item={item} type={typeHere}/>
            </div>}
        </div>
    );
};

export default ListItemExpandable;
