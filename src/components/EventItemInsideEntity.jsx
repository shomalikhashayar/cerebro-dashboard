import React, { useState } from 'react';
import { CheckSquareFilled, CloseSquareFilled } from '@ant-design/icons'
import ModalVideoPlayer from "./ModalVideoPlayer";
import { logSomething, mediaUrlCreator,confidenceTag } from '../utils/utils';
import {useStateContext} from '../contexts/ContextProvider'
import { TemplateTexts, textHere, TTPlaceholders } from '../utils/intl';
import ReactPlayer from 'react-player';
const EventItemInsideEntity = ({ key, item, type }) => {    

    const {lang} = useStateContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    function handleOkModel() {
        setIsModalOpen(false)
    }

    // if it was anomaly show video other wise show image
    function handleMedia(imgurl,type) {
        if (type === 'anomaly') {
            return <ReactPlayer
                url={imageUrl}
                width='100%'
                height='100%'
                controls={false}
                loop={true}
                playing={true}
                />
        } else {
            return <img src={imgurl} alt={textHere(TTPlaceholders.snapshot, lang)} />
        }
    }
    let imageUrl = ''

    let title = ''
    // determine title and media content
    if (type === 'anomaly') {
        title = item?.camera?.title
        imageUrl = item?.video_path
    } else if (type === 'face') {
        title = (item?.face_id?.user?.first_name ?? '') + ' ' + (item?.face_id?.user?.last_name ?? '')
        imageUrl =  mediaUrlCreator(item?.face_id?.image)
    } else if (type === 'plate') {
        title = item?.plate_number ?? ''
        imageUrl = mediaUrlCreator(item?.image_path)
    }


    const granted = true
    return (
        <div key={key}
            className={`flex flex-col ${granted ? 'border-green-600' : 'border-red-600'} border-2 bg-gray-300 p-1 w-36 items-center dark:bg-zinc-700`}>
            <div className='flex h-28 w-28 items-center justify-center'>
                <button onClick={showModal}>
                    {handleMedia(imageUrl,type)}
                </button>
            </div>
            <div className='flex items-start p-1'>
                <p className='text-c2 text-ellipsis font-semibold px-1'>
                    {granted ? title : textHere(TTPlaceholders.uknown,lang)}

                </p>
                {granted ? <CheckSquareFilled className='text-green-600 text-lg' /> :
                    <CloseSquareFilled className='text-red-600 text-lg' />}

            </div>
            {granted && <p className='text-c4 text-sm text-ellipsis p-1'></p>}
            {confidenceTag(item?.confidence??0)}

            <ModalVideoPlayer
                item={{
                    type:type,
                    image:imageUrl,
                    video: mediaUrlCreator(item?.video_path),
                    title: textHere(TemplateTexts.heading_event_video,lang),
                    camera: item?.camera?.title ?? textHere(TTPlaceholders.camera,lang),
                    zone: item?.camera?.zone?.title ?? textHere(TTPlaceholders.zone,lang),
                    address: item?.camera?.zone?.address ?? textHere(TTPlaceholders.address,lang),
                    location: { latitude: item?.camera?.latitude, longitude: item?.camera?.longitude },
                    confidence:item?.confidence??0
                }}
                isOpen={isModalOpen}
                handleOk={handleOkModel}
            />
        </div>
    );
};

export default EventItemInsideEntity;
