/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Space } from "antd";
import ListItemTitle from "../../components/ListItemTitle";
import ResultForm from "../../components/ResultForm";
import ModalAlert from "../../components/ModelAlert";
import ButtonB from "../../components/ButtonB";
import AxiosInstance from "../../network/axiosInstance";
import { useApplication } from "../../contexts/ContextProviderApp";
import { urlGroups, urlPermissions } from '../../network/urls';
import {permissionTaged,isPermissionAllowed}from '../../utils/utils'
import { TTAlertTexts, TTButtons, TTControlZone, textHere } from '../../utils/intl';
import { useStateContext } from '../../contexts/ContextProvider';


const Control_NewZone = () => {

    const { lang } = useStateContext()

    const isAllowed = {
        add:isPermissionAllowed(permissionTaged.zone_add),
        view: isPermissionAllowed(permissionTaged.zone_view),
        change:isPermissionAllowed(permissionTaged.zone_change),
        delete:isPermissionAllowed(permissionTaged.zone_delete),
    }

    const ax = AxiosInstance()

    const [contentLoading, setContentLoading] = useState({isLoading:false,zoneExist:false,error:null})

    const [allPermissions, setAllPermissions] = useState(null)

    const [currentZone, setCurrentZone] = useState(null)

 
    const [modalVisible, setModalVisible] = useState(false);
    const [inputs, setInputs] = useState({ zone_title: '', zone_address: '', zone_geolocation: null });


    function validateInputs() {
        var res = false
        if(inputs.zone_title ==='' || inputs.zone_address ==='' ){
             res = false
             setContentLoading(prev=>({...prev,error:textHere(TTAlertTexts.enter_fields_correctly,lang)}))
        }else {
            res = true
        }
        return res

    }

    function onCreateZone() {
        if (validateInputs()) {
            const reqBody = {
                "title": "bye",
                "address": "12313",
                "geo_location": {}
            }
            ax.post(urlGroups, { body: reqBody })
                .then((response) => {
                }).catch((error) => {
                }).finally(() => {})
        }

    }

    function onEditZone() {
        if (validateInputs()) {
            const reqBody = {
                "title": "bye",
                "address": "12313",
                "geo_location": {}
            }
            ax.patch(urlGroups, { body: JSON.stringify(reqBody) })
                .then((response) => {
                }).catch((error) => {
                })
        }
    }

    function onDelZone() {
        if (validateInputs()) {
            ax.delete(urlGroups + `${inputs.group_name}/`)
                .then((response) => {

                }).catch((error) => {

                })
        }
    }

    function createInputForZone() {
        return <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}

        >
            <Form.Item label={textHere(TTControlZone.title_zone_title,lang)}>
                <Space direction='horizontal'>
                    <Input
                        key='1'
                        onChange={(e) => {
                            setInputs((prevState) => ({ ...prevState, zone_title: e.target.value }))
                        }}
                    />
                    <ButtonB
                    enabled={isAllowed.view}
                    >
                        {textHere(TTButtons.check,lang)}
                    </ButtonB>
                </Space>

            </Form.Item>
            <Form.Item label={textHere(TTControlZone.title_address,lang)}>
                <Input.TextArea
                    rows={4}
                    key='2'
                    onChange={(e) => {
                        setInputs((prevState) => ({ ...prevState, zone_address: e.target.value }))
                    }}
                />

            </Form.Item>
            <Form.Item label={'geo Location'}>
                <Input
                    key='3'
                    onChange={(e) => {
                        setInputs((prevState) => ({ ...prevState, zone_geolocation: e.target.value }))
                    }}
                />

            </Form.Item>



            <Form.Item wrapperCol={{ offset: 4 }}>
                {!currentZone?.id && <ButtonB 
                enabled={isAllowed.add}
                onClick={
                    onCreateZone}>
                    {textHere(TTButtons.create,lang)}
                </ButtonB>}
                <ButtonB
                enabled={isAllowed.delete}
                onClick={onDelZone }>
                    {textHere(TTButtons.delete,lang)}
                </ButtonB>
                <ButtonB 
                enabled={isAllowed.change}
                onClick={onEditZone}>
                    {textHere(TTButtons.update,lang)}
                </ButtonB>
            </Form.Item>
        </Form>
    }


    return (
        <div>
            <div className='flex justify-between pb-10'>
                <div className='w-96 pt-3'>
                    <ListItemTitle title={textHere(TTControlZone.main_head,lang)} />
                </div>

            </div>
            {isAllowed.add ? <>
                {createInputForZone()}
                <div>
                    <ModalAlert
                        title='ثبت اطلاعات منطقه'
                        description='آیا از اطلاعات وارد شده اطمینان دارید؟'
                        okButtonText='بلی'
                        cancelButtonText='خیر'
                        isOpen={modalVisible}
                        okButtonClick={() => {
                        }}
                        cancelButtonClick={() => setModalVisible(false)}
                    />
                </div>
            </> : <ResultForm
                type='info'
                title='عدم دسترسی'
                subtitle='اکانت شما به این صفحه دسترسی ندارد!'
            />}
        </div>
    );
};

export default Control_NewZone;
