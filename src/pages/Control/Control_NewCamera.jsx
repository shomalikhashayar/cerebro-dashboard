/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Checkbox, Form, Input, Select, Space, Button, Table } from "antd";
import ListItemTitle from "../../components/ListItemTitle";
import ResultForm from "../../components/ResultForm";
import ModalAlert from "../../components/ModelAlert";
import ButtonB from "../../components/ButtonB";
import AxiosInstance from "../../network/axiosInstance";
import { useApplication } from "../../contexts/ContextProviderApp";
import { urlGroups, urlMapCamera, urlPermissions } from '../../network/urls';
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { logSomething, showMapForLocation } from '../../utils/utils';
import { LatLng, marker } from 'leaflet';
import { permissionTaged, isPermissionAllowed } from '../../utils/utils'
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet'
import { useStateContext } from '../../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTButtons, TTControlAccount, TTControlCamera, TTForms, TTPermissions, TTPlaceholders, TTStates } from '../../utils/intl';
import { cameraUrlByTitle, cameraUrlC } from '../../network/NetworkUtils';

const { Option } = Select;

function getPermissionByID(allPermissions, id) {
    for (var permission in allPermissions) {
        if (permission.id === id) {
            return permission;
        }
    }
}


const Control_NewCamera = () => {

    const { lang } = useStateContext()

    const isAllowed = {
        add: isPermissionAllowed(permissionTaged.camera_add),
        view: isPermissionAllowed(permissionTaged.camera_view),
        change: isPermissionAllowed(permissionTaged.camera_change),
        delete: isPermissionAllowed(permissionTaged.camera_delete)
    }

    const mapRef = useRef();

    const ax = AxiosInstance()

    const [contentLoading, setContentLoading] = useState({isLoading:false,cameraExist:false,error:null})
    const [allPermissions, setAllPermissions] = useState(null)
    const [currentCamera, setCurrentCamera] = useState(null)
    const [cameraPositionMarker, setCameraPositionMarker] = useState(new LatLng(0.0, 0.0))



    const [modalVisible, setModalVisible] = useState(false);
     const [inputs, setInputs] = useState({
        camera_title: '', camera_zone_title: '', camera_zone_id: -1,
        camera_lat: 0.0, camera_long: 0.0,
        has_face_recognition: false,
        has_anomaly_detection: false,
        has_license_plate_recognition: false,
    });


    function validateInputs() {
        var res = inputs.camera_title !== '' 
        if(!res){
            setContentLoading(prev=>({...prev,error:textHere(TTAlertTexts.enter_fields_correctly,lang)}))
        } 
        return res
    }

    function getCameraByTitle(title) {
        setContentLoading(prev=>({...prev,isLoading:true}))
        const url = cameraUrlByTitle(title)
        ax.get(url).then(response => {
            const jsonResponse = JSON.parse(response.data)?.data?.results
            if (Object.keys(jsonResponse).length > 0) {
                const item = jsonResponse[0]
                setInputs({
                    camera_title: item?.title, camera_zone_title: item?.zone?.title, camera_zone_id: item?.zone?.id,
                    camera_lat: item?.latitude, camera_long: item?.longitude,
                    has_face_recognition: item?.has_face_recognition,
                    has_anomaly_detection: item?.has_anomaly_detection,
                    has_license_plate_recognition: item?.has_license_plate_recognition,
                })
                setContentLoading(prev=>({...prev,cameraExist:true}))
            } else {
                setContentLoading(prev=>({...prev,cameraExist:false,error:textHere(TTAlertTexts.camera_not_found,lang)}))
            }

        }).catch(error => {
            setContentLoading(prev=>({...prev,cameraExist:false,error:textHere(TTAlertTexts.error_try_again,lang)}))
                }).finally(() => {
            setContentLoading(prev=>({...prev,isLoading:false}))
         })


    }

    function handleCheckCamera() {
        setContentLoading(prev=>({...prev,error:null}))
        if (validateInputs()) {
            getCameraByTitle(inputs.camera_title)
        }  
    }


    function onCreateCamera() {

        if (validateInputs()) {
            const reqBody = {
                "title": "salam",
                "latitude": "1.3",
                "longitude": "1.2",
                "zone": 1,
                "stream_url": ""
            }
            ax.post(urlMapCamera, { body: reqBody })
                .then((response) => {
                }).catch((error) => {
                })
        } 
    }

    function onEditCamera() {
        if (validateInputs()) {
            const reqBody = {
                "title": inputs.camera_title,
                "latitude": inputs.camera_lat,
                "longitude": inputs.camera_long,
                "zone": 1,
                "stream_url": "https://google.com"
            }
            ax.patch(urlGroups, { body: reqBody })
                .then((response) => {
                }).catch((error) => {
                })
        }
    }

    function onDelCamera() {
        if (validateInputs()) {
            ax.delete(urlGroups + `${inputs.group_name}/`)
                .then((response) => {
                }).catch((error) => {
                })
        }
    }


    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setCameraPositionMarker(e.latlng)
                marker.push(e.latlng)
            },
        });
        return false;
    }

    const iconDefault = L.icon({
        iconRetinaUrl: iconRetina,
        iconUrl: iconMarker,
        shadowUrl: iconShadow
    });

    function createTableForCamera(camera) {
        const columns = [
            {
                title: textHere(TTForms.title_title, lang),
                dataIndex: 'field',
                key: 'field',
                render: (text) => <p className='font-bold'>{text}</p>,
            },
            {
                title: textHere(TTForms.title_values, lang),
                dataIndex: 'value',
                key: 'value',
                render: (text) => <p>{text}</p>,
            },
        ]

        var cameradata = [
            {
                key: '1',
                field: textHere(TTControlCamera.title_camera, lang),
                value: camera?.camera_title ?? '',
            },
            {
                key: '2',
                field: textHere(TTControlCamera.title_camera_zone_title, lang),
                value: camera?.camera_zone_title?? '',
            },
            {
                key: '3',
                field: textHere(TTControlCamera.title_camera_location, lang),
                value: <Button type='link' onClick={() => showMapForLocation(camera?.camera_lat, camera?.camera_long)}>
                    {textHere(TTButtons.click, lang)}
                </Button>
            },
            {
                key: '4',
                field: textHere(TTControlCamera.title_camera_has_anomaly_detection, lang),
                value: textHere(camera?.has_anomaly_detection ? TTButtons.yes : TTButtons.no, lang),
            },
            {
                key: '5',
                field: textHere(TTControlCamera.title_camera_has_face_recognition, lang),
                value: textHere(camera?.has_face_recognition ? TTButtons.yes : TTButtons.no, lang),
            },
            {
                key: '6',
                field: textHere(TTControlCamera.title_camera_has_plate_detection, lang),
                value: textHere(camera?.title_camera_has_plate_detection ? TTButtons.yes : TTButtons.no, lang),
            },
        ]

        return <Table
            className='w-1/2 p-5'
            pagination={false}
            loading={false}
            showHeader={true}
            scroll={{ y: 500 }}
            columns={columns}
            dataSource={cameradata} />
    }

    function map() {

        return <MapContainer
            style={{ width: '50wh', height: '40vh' }}
            ref={mapRef}
            center={[35.5, 51.5]}
            zoom={10}
            scrollWheelZoom={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=''
            />
            <MapEvents />
            <React.Fragment>
                <Marker position={cameraPositionMarker} icon={iconDefault} />
            </React.Fragment>
        </MapContainer>;
    }

    function createInputForCamera() {
        return <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
        >
            <Form.Item label={textHere(TTControlCamera.title_camera, lang)}>
                <Space direction='horizontal'>
                    <Input
                        key='1'
                        onChange={(e) => {
                            setInputs((prevState) => ({ ...prevState, camera_title: e.target.value }))
                        }}
                    />
                    <ButtonB
                        loading={contentLoading.isLoading}
                        enabled={isAllowed.view}
                        onClick={() => {
                            handleCheckCamera()
                        }}>
                        {textHere(TTButtons.check, lang)}
                    </ButtonB>

                    {contentLoading.error !== null && <p className='text-red-500 text-xs'>{contentLoading.error}</p>}

                </Space>

            </Form.Item>
            {contentLoading.cameraExist && createTableForCamera(inputs)}

            <Form.Item label={textHere(TTControlCamera.title_camera_zone_title, lang)}>
                <Input
                    key='2'
                    onChange={(e) => {
                        setInputs((prevState) => ({ ...prevState, camera_zone_title: e.target.value }))
                    }}
                />

            </Form.Item>
            <Form.Item label={textHere(TTControlCamera.title_camera_about, lang)}>
                <Space direction='vertical' className='m-3'>
                    <Checkbox
                        checked={inputs.has_anomaly_detection}
                        onChange={(e) => {
                            setInputs((prevState) => ({ ...prevState, has_anomaly_detection: e.target.checked }))
                        }}
                        key='11'
                    >{textHere(TTControlCamera.title_camera_has_anomaly_detection, lang)}</Checkbox>
                    <Checkbox
                        checked={inputs.has_license_plate_recognition}
                        key='12'
                        onChange={(e) => {
                            setInputs((prevState) => ({ ...prevState, has_license_plate_recognition: e.target.checked }))
                        }}
                    >{textHere(TTControlCamera.title_camera_has_plate_detection, lang)}</Checkbox>
                    <Checkbox
                        checked={inputs.has_face_recognition}
                        key='13'
                        onChange={(e) => {
                            setInputs((prevState) => ({ ...prevState, has_face_recognition: e.target.checked }))
                        }}
                    >{textHere(TTControlCamera.title_camera_has_face_recognition, lang)}</Checkbox>
                </Space>
            </Form.Item>
            <Form.Item label={textHere(TTControlCamera.title_camera_location, lang)}>
                <p className='font-bold'>{textHere(TTControlCamera.title_camera_location_desc, lang)}</p>

            </Form.Item>
            <p>position: ({cameraPositionMarker.lat.toFixed(5)},
                {cameraPositionMarker.lng.toFixed(5)}) </p>

            {map()}

            <Form.Item wrapperCol={{ offset: 4 }} className='mt-5'>
                {!currentCamera?.id && <ButtonB
                    
                    enabled={isAllowed.add && !contentLoading.cameraExist}
                    onClick={
                        onCreateCamera
                    }>
                    {textHere(TTButtons.create, lang)}
                </ButtonB>}
                <ButtonB
                    enabled={isAllowed.delete}
                    onClick={onDelCamera
                    }>
                    {textHere(TTButtons.delete, lang)}
                </ButtonB>
                <ButtonB
                    enabled={isAllowed.change}
                    onClick={onEditCamera}>
                    {textHere(TTButtons.update, lang)}
                </ButtonB>
            </Form.Item>

        </Form>
    }


    return (
        <div>
            <div className='flex justify-between pb-10'>
                <div className='w-96 pt-3'>
                    <ListItemTitle title={textHere(TTControlCamera.main_head, lang)} />
                </div>

            </div>
            {isAllowed ? <>
                {createInputForCamera()}
                <div>
                    <ModalAlert
                        title={textHere(TTButtons.action_send_info, lang)}
                        description={textHere(TTAlertTexts.are_you_sure, lang)}
                        okButtonText={textHere(TTButtons.ok, lang)}
                        cancelButtonText={textHere(TTButtons.cancel, lang)}
                        isOpen={modalVisible}
                        okButtonClick={() => {
                        }}
                        cancelButtonClick={() => setModalVisible(false)}
                    />
                </div>
            </> : <ResultForm
                type='info'
                title={textHere(TTPermissions.you_dont_have_permission, lang)}
                subtitle={textHere(TTPermissions.you_dont_have_permission_desc, lang)}
            />}
        </div>
    );
};

export default Control_NewCamera;
