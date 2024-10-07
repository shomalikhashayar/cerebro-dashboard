import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ButtonB from '../../../components/ButtonB';
import {useStateContext} from '../../../contexts/ContextProvider'
import { textHere, TTAlertTexts, TTButtons, TTForms } from '../../../utils/intl';
import { useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilState } from 'recoil';
import { newFaceDataAtom } from '../../../utils/logic/StateManager';
import { logSomething } from '../../../utils/utils';

// D step
const Control_Face_Confirmation_D = ({ onConfirm, onReset, data }) => {

    const {lang} = useStateContext()
    const [faceData,setfaceData] = useRecoilState(newFaceDataAtom)
    logSomething(faceData)

    const [confirmed, setConfirmed] = useState(null);

    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {

            }
        },
        defaultFileList:
            data.imageList.map((im, index) => {
                return {
                    uid: im.uid,
                    name: `${index}`,
                    status: 'done',
                }
            }),


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
                <Form.Item label={textHere(TTForms.title_first_name,lang)}>
                    <p>{faceData.firstName}</p>
                </Form.Item>
                <Form.Item label={textHere(TTForms.title_last_name,lang)}>
                    <p>{faceData.lastName}</p>
                </Form.Item>
                <Form.Item label={textHere(TTForms.title_org_rank,lang)}>
                    <p>{faceData.level}</p>
                </Form.Item>
                <Form.Item label={textHere(TTForms.title_personnel_code,lang)}>
                    <p>{faceData.personal_code}</p>
                </Form.Item>
                <Form.Item label={textHere(TTForms.title_image,lang)}>
                    <img src={faceData.image[0].url}/>
                </Form.Item>
            </Col>
        </Row>
        <div className='p-8 flex justify-around'>

            <ButtonB onClick={() => showModal('confirm')}>
                {textHere(TTButtons.confirm_and_send,lang)}
            </ButtonB>

            <ButtonB onClick={() => showModal('reset')}>
                {textHere(TTButtons.reset,lang)}
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

export default Control_Face_Confirmation_D;
