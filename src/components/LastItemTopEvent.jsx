import React, { useState } from 'react';
import { timeSince2 } from "../utils/timeSince";
import { logSomething, mediaUrlCreator, confidenceTag } from '../utils/utils';
import ModalVideoPlayer from "./ModalVideoPlayer";
import { useStateContext } from '../contexts/ContextProvider'
import { textHere, TTPlaceholders } from '../utils/intl';
import ReactPlayer from 'react-player';

const LastItemTopEvent = ({ key, item, type }) => {

    const { lang } = useStateContext()

    // determine type of event 
    let typeHere = type
    if (type === undefined) {
        typeHere = 'anomaly'
        if ('face_id' in item) {
            typeHere = 'face'
        }
        if ('plate_number' in item) {
            typeHere = 'plate'
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    function handleOkModel() {
        setIsModalOpen(false)
    }

        // if it was anomaly show video other wise show image
    function handleMedia(imgurl,type) {
        logSomething(imageUrl)
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
            return <img src={imgurl} alt={textHere(TTPlaceholders.snapshot, lang)}  />
        }
    }


    let imageUrl = ''
    let latItemTime = ''
    let title = ''

    // determine title and media content

    if (typeHere === 'anomaly') {
        latItemTime = (textHere(TTPlaceholders.last_anomaly, lang) +" "+ timeSince2(item?.detected_at))
        title = item?.camera?.title
        imageUrl = item?.video_path
    } else if (typeHere === 'face') {
        latItemTime = (textHere(TTPlaceholders.last_face, lang) +" "+ timeSince2(item?.detected_at))
        title = (item?.face_id?.user?.first_name ?? '') + ' ' + (item?.face_id?.user?.last_name ?? '')
        imageUrl = mediaUrlCreator(item?.face_id?.image)
    } else if (typeHere === 'plate') {
        latItemTime = (textHere(TTPlaceholders.last_plate, lang) +" "+ timeSince2(item?.detected_at))
        title = item?.plate_number ?? ''
        imageUrl = mediaUrlCreator(item?.image_path)
    }

    return (
        <div key={key} className='flex w-full border-r-8 border-green-600 p-3 drop-shadow-md ring-1 ring-c4 dark:ring-c2 bg-c3 dark:bg-c5'>
            <div className='static flex w-80 h-52 items-center justify-center'>
                <button onClick={showModal}>
                    {/* <img src={imageUrl} alt={textHere(TTPlaceholders.snapshot, lang)} loading='lazy'/> */}
                    {handleMedia(imageUrl,typeHere)}
                </button>
                {confidenceTag(item?.confidence ?? 0, 'absolute top-0 right-0')}
            </div>
            <div className='flex-grow grid grid-cols-3 gap-3 px-2'>
                <div className='col-span-2 grid grid-cols-2 gap-3'>
                    <div className='bg-sky-500 p-2 flex flex-col justify-center'>
                        <p className='text-2xl text-center font-bold'>{item.camera.title ?? textHere(TTPlaceholders.camera, lang)}</p>
                        <p className='text-lg text-center font-light'>{item.camera.zone.title ?? textHere(TTPlaceholders.zone, lang)}</p>
                    </div>
                    <div className='bg-sky-500 p-2 flex flex-col justify-center'>
                        <p className='text-3xl text-center font-bold '>{timeSince2(item?.detected_at)}</p>
                    </div>
                    <div className='col-span-2 bg-sky-300 p-2 px-4 flex justify-between items-center'>
                        <p className='text-4xl text-c1 text-start font-bold leading-loose'>
                            {title}</p>
                        <p className='text-lg text-center font-medium '>{item.part ?? item.camera.zone.title ?? textHere(TTPlaceholders.uknown, lang)}</p>
                    </div>
                </div>
                <div className='bg-sky-300 p-3'>
                    <p className='text-4xl text-center font-bold leading-loose text-clip break-normal'>{latItemTime}</p>
                </div>
            </div>
            <ModalVideoPlayer
                item={{
                    type: typeHere,
                    image: imageUrl,
                    video: mediaUrlCreator(item?.video_path),
                    title: textHere(TTPlaceholders.video, lang),
                    camera: item?.camera?.title ?? textHere(TTPlaceholders.camera, lang),
                    zone: item?.camera?.zone?.title ?? textHere(TTPlaceholders.zone, lang),
                    confidence: item?.confidence ?? 0
                }}
                isOpen={isModalOpen}
                handleOk={handleOkModel}
            />
        </div>
    );


};

export default LastItemTopEvent;
