import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ButtonB from '../../../components/ButtonB';
import {useStateContext} from '../../../contexts/ContextProvider'
import { textHere, TTAlertTexts, TTButtons, TTControlPlate } from '../../../utils/intl';

// D step
const Control_Plate_Confirmation_D = ({ onConfirm, onReset, data }) => {

    const {lang} = useStateContext()
    const [confirmed, setConfirmed] = useState(null);

    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                
            }
        },
        defaultFileList: [
            // {
            //     uid: '1',
            //     name: 'تصویر روبرو',
            //     status: 'uploading',
            //     url: 'http://www.baidu.com/xxx.png',
            //     percent: 33,
            // },
            // {
            //     uid: '2',
            //     name: 'تصویر کناری',
            //     status: 'done',
            //     url: 'http://www.baidu.com/yyy.png',
            // },
            // {
            //     uid: '3',
            //     name: 'تصویر کناری2',
            //     status: 'done',
            //     url: 'http://www.baidu.com/yyy.png',
            // },
            // {
            //     uid: '4',
            //     name: 'تصویر کناری3',
            //     status: 'done',
            //     url: 'http://www.baidu.com/yyy.png',
            // },
            // {
            //     uid: '5',
            //     name: 'تصویر طرفین',
            //     status: 'error',
            //     response: 'Server Error 500',
            //     url: 'http://www.baidu.com/zzz.png',
            // },
        ],
    };


    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    const [btnclick, setBtnclick] = useState('');

    function showModal(btn) {
        
        setBtnclick(btn)
        setOpen(true);
    }
    const handleOk = () => {

        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            
            if (btnclick === 'confirm') {
                onConfirm()
            } else if (btnclick === 'reset') {
                onReset()
            }

        }, 1000);


    };
    const handleCancel = () => {
        setOpen(false);
    };

    return <Form>
        <Row>
            <Col span={12} className='pr-20'>
                <Form.Item label={textHere(TTControlPlate.vehicle_owner,lang)}>
                    <p>{data.owner}</p>
                </Form.Item>
                <Form.Item label={textHere(TTControlPlate.vehicle_model,lang)}>
                    <p>{data.model}</p>
                </Form.Item>
                <Form.Item label={textHere(TTControlPlate.vehicle_plate_number,lang)}>
                    <p>{data.plate}</p>
                </Form.Item>
                
            </Col>


            <Col span={12} className='pr-20'>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Col>
        </Row>
        <div className='p-8 flex justify-around'>

            <ButtonB
                onClick={() => showModal('confirm')}>
                    {textHere(TTButtons.confirm_and_send,lang)}
            </ButtonB>

            <ButtonB
                onClick={() => showModal('reset')}>
                {textHere(TTButtons.reset)}
            </ButtonB>
            <Modal
                title={textHere(TTAlertTexts.are_you_sure,lang)}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okButtonProps={{ className: 'bg-c2' }}
                okText={textHere(TTButtons.ok,lang)}
                cancelText={textHere(TTButtons.cancel,lang)}
            />

        </div>
    </Form>
};

export default Control_Plate_Confirmation_D;
