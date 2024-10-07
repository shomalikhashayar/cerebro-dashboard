import React,{useState,useCallback,useRef} from 'react';
import Webcam from "react-webcam";
import {Button} from "antd";
import {CloseIcon,CameraAltIcon} from '@ant-design/icons'
import { useStateContext } from '../contexts/ContextProvider';
import { textHere, TTButtons } from '../utils/intl';


const CameraComponent = ({onTakePicture}) => {

    const {lang} = useStateContext()


    const webcamRef = useRef(null)
    const capture = useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        setIsCaptured(true)
        setPicture(pictureSrc)
        onTakePicture(picture)
    })

    const [isCaptured, setIsCaptured] = useState(false);
    const [picture, setPicture] = useState('');
    return (
        <div>
            {picture == '' ? <Webcam
                className='border-4 border-c2 rounded-lg'
                audio={false}
                height={400}
                width={400}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
            /> : <img className='border-4 border-c2 rounded-lg' src={picture}/>}
            <div className='w-400 mt-2 flex justify-between'>
                {isCaptured ?
                    <>
                        <Button type="primary"
                                className="bg-red-700"
                                icon={<CloseIcon/>}
                                onClick={() => {
                                    setPicture('')
                                    setIsCaptured(false)
                                }
                                }>
                            {textHere(TTButtons.delete,lang)}
                        </Button>
                        <Button type="primary"
                                className="bg-green-700"
                                icon={<CloseIcon/>}>
                            {textHere(TTButtons.add,lang)}
                        </Button>
                    </>
                    :
                    <Button type="primary"
                            className=""
                            icon={<CameraAltIcon/>}
                            onClick={capture}>
                        {textHere(TTButtons.take_picture,lang)}                    </Button>
                }

            </div>
        </div>
    );
};

export default CameraComponent;
