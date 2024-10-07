import React ,{useState,useCallback, useRef}from 'react';
import {Button, Modal, Upload} from "antd";
import {PlusOutlined,CloseOutlined,CameraOutlined} from "@ant-design/icons";
import Webcam from "react-webcam";
import ButtonB from '../../../components/ButtonB';
import { useStateContext } from '../../../contexts/ContextProvider';
import { textHere, TTButtons, TTControlPlate } from '../../../utils/intl';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

// C step
const Control_Plate_Images_C = ({onFinish}) => {

    const {lang} = useStateContext()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://cdn-icons-png.flaticon.com/512/3939/3939528.png',
        // },
        // {
        //     uid: '-2',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://cdn-icons-png.flaticon.com/512/3939/3939528.png',
        // },
        // {
        //     uid: '-3',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://cdn-icons-png.flaticon.com/512/3939/3939528.png',
        // },
        // {
        //     uid: '-4',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://cdn-icons-png.flaticon.com/512/3939/3939528.png',
        // },
        // {
        //     uid: '-xxx',
        //     percent: 50,
        //     name: 'image.png',
        //     status: 'uploading',
        //     url: 'https://cdn-icons-png.flaticon.com/512/3939/3939528.png',
        // },
        // {
        //     uid: '-5',
        //     name: 'image.png',
        //     status: 'error',
        // },
    ]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({fileList: newFileList}) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                {textHere(TTControlPlate.upload_plate_file,lang)}
            </div>
        </div>
    );

    const webcamRef = useRef(null)
    const capture = useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        setIsCaptured(true)
        setPicture(pictureSrc)

    })

    const [isCaptured, setIsCaptured] = useState(false);
    const [picture, setPicture] = useState('');


    function handleUploadImage() {
        setFileList((prev) => [...prev, {
            uid: '-xxx1',
            percent: 80,
            name: 'image.png',
            status: 'done',
            url: picture,
        }])
    }

    const [valid, setValid] = useState(true);


    function validateInputs() {
        setValid(Object.keys(fileList).length > 0)
    }

    function onFinishHandler() {

        onFinish(fileList, valid)
    }

    return  <div>
        <div className='flex col-span-2 py-2 gap-5'>
            <div>
                {picture === '' ? <Webcam
                    className='border-4 border-c2 rounded-lg'
                    audio={false}
                    height={400}
                    width={400}
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                /> : <img className='border-4 border-c2 rounded-lg' src={picture} alt='taken portrait'/>}
                <div className='w-400 mt-2 flex justify-between'>
                    {isCaptured ?
                        <>
                            <Button type="primary"
                                    className="font-['IRANSans'] bg-red-700"
                                    icon={<CloseOutlined />}
                                    onClick={() => {
                                        setPicture('')
                                        setIsCaptured(false)
                                    }
                                    }>
                                {textHere(TTButtons.delete,lang)}
                            </Button>
                            <Button type="primary"
                                    className="font-['IRANSans'] bg-green-700"
                                    icon={<CloseOutlined />}
                                    onClick={handleUploadImage}>
                                {textHere(TTButtons.confirm,lang)}
                            </Button>
                        </>
                        :
                        <Button type="primary"
                                className="  bg-c2"
                                icon={<CameraOutlined />}
                                onClick={capture}>
                            {textHere(TTButtons.take_picture,lang)}
                        </Button>
                    }

                </div>
            </div>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </div>

        <ButtonB
                onClick={onFinishHandler}>
                    {textHere(TTButtons.next_step,lang)}
        </ButtonB>

    </div>
};

export default Control_Plate_Images_C;
