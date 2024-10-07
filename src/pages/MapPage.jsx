import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { sidebarLinksFa,sidebarLinksEng } from "../utils/sidebarLinks";
import { useNavigate } from "react-router-dom";
import { urlMapCamera } from "../network/urls";
import { Spin ,Button} from 'antd';
import axiosInstance from "../network/axiosInstance";
import ResultForm from "../components/ResultForm";
import { MapMarkerIconBuilder } from "../components/MapMarkerIconBuilder";
import { categoryColors } from "../utils/colors";
import ChartCreator from "../components/ChartCreator";
import { useStateHeaderContext } from "../contexts/ContextProviderHeader";
import 'leaflet/dist/leaflet.css'
import { permissionTaged, isPermissionAllowed, logSomething,  } from '../utils/utils'
import { useStateContext } from '../contexts/ContextProvider'
import { textHere, TTButtons,  TTControlCamera, TTControlZone, TTPermissions } from '../utils/intl'
import { useRecoilState } from 'recoil';
import {filterCameraAtom} from '../utils/logic/StateManager'
 

const MapPage = () => {
 
    const isAllowed2ViewCameras = isPermissionAllowed(permissionTaged.camera_view)
    const isAllowed2ViewZones = isPermissionAllowed(permissionTaged.zone_view)

    const { lang } = useStateContext()

    const navigate = useNavigate()
    const { setHeaderContent } = useStateHeaderContext()
    setHeaderContent(lang==='eng'? sidebarLinksEng[9]:sidebarLinksFa[9])
    // check if user has access to see anomaly
    const isAllowed2SeeAnomaly = true
    const [isAllowed, setIsAllowed] = useState(isAllowed2SeeAnomaly)

    const [filterCamera,setFilterCamera] = useRecoilState(filterCameraAtom)



    const mapRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cameraList, setCameraList] = useState([]);

    function onSuccessResponse(response) {
        setError(null)
        setIsLoading(false)
        logSomething(response.data)
        const data = JSON.parse(response?.data)?.data?.results
        logSomething(data)

        setCameraList(data) 
    }

    function onError(error) {
        setError(error)
        setIsLoading(false)


    }

    function onFinally() {
        setIsLoading(false)
    }

    function getCameraListHandler() {
        setError(null)
        setIsLoading(true)
        const ax = axiosInstance()
        ax(urlMapCamera) 
            .then(onSuccessResponse)
            .catch(onError)
            .finally(onFinally)
    }

    useEffect(() => {
        getCameraListHandler()
      
    }, []);

    function notAllowedResultForm() {
        return <ResultForm
            type='warning'
            title={textHere(TTPermissions.you_dont_have_permission, lang)}
            subtitle={textHere(textHere(TTPermissions.you_dont_have_permission_desc, lang))}
        />;
    }

    function whenLoading() {
        return <div className='justify-center items-center w-full h-full'>
            <Spin className='flex items-center'
                tip="Loading" size="large">
                <div className="content" />
            </Spin></div>;
    }


    function markerBuilder() {
        return <>
            {cameraList.map((item, index) => {
                let zone_number = item.zone.id - 1
                if (item.zone.id > categoryColors.length) {
                    zone_number = zone_number % categoryColors.length
                }

                return <Marker
                    position={[item.latitude, item.longitude]}
                    title={'zone name:' + item.zone.title}
                    riseOnHover={true}
                    icon={MapMarkerIconBuilder(categoryColors[zone_number])}
                >
                    <Popup className='font-[IRANSans]'>

                        <ChartCreator />
                        <p>{`${textHere(TTControlCamera.title_camera, lang)}: ${item?.title}`}</p>
                        <p>{`${textHere(TTControlCamera.title_camera_location, lang)}: (${item?.latitude},${item?.longitude})`}</p>
                        <p>{`${textHere(TTControlCamera.title_camera_has_face_recognition, lang)}: ${item?.has_face_recognition ? textHere(TTButtons.yes, lang) : textHere(TTButtons.no, lang)}`} </p>
                        <p>{`${textHere(TTControlCamera.title_camera_has_anomaly_detection, lang)}: ${item?.has_anomaly_detection ? textHere(TTButtons.yes, lang) : textHere(TTButtons.no, lang)}`} </p>
                        <p>{`${textHere(TTControlCamera.title_camera_has_plate_detection, lang)}: ${item?.has_license_plate_recognition ? textHere(TTButtons.yes, lang) : textHere(TTButtons.no, lang)}`}</p>
                        <p>{`${textHere(TTControlZone.title_zone_title, lang)}: ${item?.zone?.title}`} </p>
                        <p>{`${textHere(TTControlZone.title_address, lang)}: ${item?.zone?.address}`} </p>
                        <Button type='link' onClick={()=>{
                            setFilterCamera({title:item?.title,id:item?.id})
                            navigate('/reports')
                        }}>{textHere(TTButtons.view_report,lang)}</Button>

                    </Popup>
                </Marker>
            }
            )
            }
        </>;
    }

    function map() {
        return <MapContainer
            style={{ width: '100wh', height: '90vh' }}
            ref={mapRef}
            center={[35.5, 51.5]}
            zoom={10}
            // style={{height: '80vh', width: '100wv', borderRadius: '20px'}}
            scrollWheelZoom={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markerBuilder()}
        </MapContainer>;
    }

    return (
        <>
            {isAllowed ? <>{isLoading ? whenLoading() : map()}</> : notAllowedResultForm()}
        </>
    );
};

export default MapPage;
