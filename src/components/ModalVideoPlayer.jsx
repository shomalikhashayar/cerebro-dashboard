import React, { useState } from 'react';
import ReactPlayer from "react-player";
import { Modal, Space, Button } from "antd";
import { confidenceTag, logSomething, showMapForLocation } from '../utils/utils';
import { useStateContext } from '../contexts/ContextProvider'
import { TemplateTexts, textHere, TTButtons, TTPlaceholders } from '../utils/intl';

const ModalVideoPlayer = ({ item, isOpen, handleOk }) => {

    const { lang } = useStateContext()
    // it plays video and if it is an image shows it
    function handleMedia() {
        if (item.type === 'anomaly') {
            return <ReactPlayer
                url={item.video}
                width='100%'
                height='100%'
                controls={true}
            />
        } else {
            return <img src={item.image} alt={textHere(TTPlaceholders.snapshot, lang)} />
        }
    }
    return (
        <Modal title={item.type === 'anomaly' ? textHere(TemplateTexts.heading_event_video, lang) : textHere(TemplateTexts.heading_event_video, lang)}
            open={isOpen}
            onOk={handleOk}
            cancelButtonProps={{ style: { visibility: 'hidden' } }}
            okText={textHere(TTButtons.ok,lang)}
            okButtonProps={{ style: { background: '#2E424D' } }}
            closable={false}
        >
            <div className='flex flex-col'>
                <Space>
                    <p className='font-semibold'>{`${textHere(TemplateTexts.title_camera,lang)}:`}</p>
                    <p>{item?.camera}</p>
                </Space>
                <Space>
                    <p className='font-semibold'>{`${textHere(TemplateTexts.title_zone,lang)}:`}</p>
                    <p>{item?.zone}</p>
                </Space>
                <Space>
                    <p className='font-semibold'>{`${textHere(TemplateTexts.title_address,lang)}:`}</p>
                    <p>{item.address}</p>
                </Space>
                <Space>
                    <p className='font-semibold'>{`${textHere(TemplateTexts.title_location_on_map,lang)}:`}</p>
                    <Button type='link' onClick={() => showMapForLocation(item?.location?.latitude, item?.location?.longitude)}>کلیک کنید</Button>
                </Space>
                <Space>
                    <p className='font-semibold'>{`${textHere(TemplateTexts.title_confidence,lang)}:`}</p>
                    {confidenceTag(item?.confidence)}
                </Space>
                {handleMedia()}

            </div>
        </Modal>
    );
};

export default ModalVideoPlayer;
