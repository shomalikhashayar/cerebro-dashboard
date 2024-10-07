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
import { checkIsStringEmpty, logSomething } from '../../utils/utils';
import {permissionTaged,isPermissionAllowed}from '../../utils/utils'
import { allPermissionsMap } from '../../utils/utils';
import { useStateContext } from '../../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTButtons, TTControlGroup, TTPermissions, TTPlaceholders, TTStates } from '../../utils/intl';

const { Option } = Select;

function getPermissionByID(allPermissions, id) {
    for (var permission in allPermissions) {
        if (permission.id === id) {
            return permission;
        }
    }
}


const Control_NewGroup = () => {
    const {lang} = useStateContext()

    const isAllowed = {
        add:isPermissionAllowed(permissionTaged.group_add),
        view:isPermissionAllowed(permissionTaged.group_view),
        change:isPermissionAllowed(permissionTaged.group_change),
        delete:isPermissionAllowed(permissionTaged.group_delete)
    }

    const { messageHandler } = useApplication()

    const ax = AxiosInstance()

    const [loading, setLoading] = useState(false)

    const [allPermissions, setAllPermissions] = useState(null)

    const [currentGroup, setCurrentGroup] = useState(null)


    const [modalVisible, setModalVisible] = useState(false);
    const [inputs, setInputs] = useState({ group_name: null, group_permissions: [] });

    function getAllGroups() {
        setLoading(true)
        ax.get(urlGroups).then(response => {
            const jsonResponse = JSON.parse(response.data.results)
            if (Object.keys(jsonResponse.results).length === 1 && jsonResponse.results[0].name === inputs.group_name) {
                setCurrentGroup(jsonResponse.results[0])
                messageHandler('success', textHere(TTAlertTexts.group_not_found,lang))
            } else {
                setCurrentGroup(null)
                messageHandler('success', textHere(TTAlertTexts.group_you_can_create_new,lang))
            }
        })
            .catch(error => {
                setCurrentGroup(null)
            }).finally(() => { setLoading(false) })
    }

    function validateInputs() {
        if (checkIsStringEmpty(inputs.group_name) || inputs.group_permissions?.length === 0) {
            messageHandler('error', textHere(TTAlertTexts.enter_fields_correctly,lang))
            return false
        } else {
            return true
        }
    }


    function onCreateGroup() {
        if (validateInputs()) {
            messageHandler('loading', textHere(TTStates.requesting,lang))
            const reqBody = {
                "name": inputs.group_name,
                "permissions": inputs.group_permissions
            }
            ax.post(urlGroups, { body: reqBody })
                .then((response) => {
                    messageHandler('success', textHere(TTControlGroup.state_group_created,lang))
                }).catch((error) => {
                    messageHandler('error',textHere(TTAlertTexts.error_try_again,lang))
                })
        }
    

    }

    function onEditGroup() {
        if (validateInputs()) {
            messageHandler('loading', textHere(TTStates.requesting,lang))
            const reqBody = {
                "name": inputs.group_name,
                "permissions": inputs.group_permissions
            }
            ax.patch(urlGroups, { body: JSON.stringify(reqBody) })
                .then((response) => {
                    messageHandler('success', textHere(TTControlGroup.state_group_edited,lang))
                }).catch((error) => {
                    messageHandler('error',textHere(TTAlertTexts.error_try_again,lang))
                })
        }
    }

    function onDelGroup() {
        if (validateInputs()) {
            messageHandler('loading', 'درحال درخواست...')
            ax.delete(urlGroups + `${inputs.group_name}/`)
                .then((response) => {
                    messageHandler('success', textHere(TTControlGroup.state_group_deleted,lang))
                }).catch((error) => {
                    messageHandler('error', textHere(TTAlertTexts.error_try_again,lang))
                })
        }
    }

    function createInputForGroups() {
        return <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 7 }}

        >

            <Form.Item label={textHere(TTControlGroup.title_group_name,lang)}>
                <Space direction='horizontal'>
                    <Input
                        key='1'
                        onChange={(e) => {
                            setInputs((prevState) => ({ ...prevState, group_name: e.target.value }))
                        }}
                    />
                    <ButtonB 
                    enabled={isAllowed.view}
                    onClick={() => {
                        if (checkIsStringEmpty(inputs.group_name)) {
                            messageHandler('error', textHere(TTAlertTexts.enter_fields_correctly,lang))
                        } else {
                            getAllGroups()
                        }
                    }}>
                        {textHere(TTButtons.check,lang)}
                    </ButtonB>

                </Space>
            </Form.Item>
            <Form.Item label={textHere(TTControlGroup.title_permissions,lang)}>
                {!loading && <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder={textHere(TTPlaceholders.click_for_permissions,lang)}
                    onChange={(selectedItems) => {
                        inputs.group_permissions = selectedItems
                    }}
                    optionLabelProp="label"
                    defaultValue={currentGroup === null ? [] : currentGroup.permissions}
                >

{allPermissionsMap.map((item) =>
                        <Option value={item.id} label={item.farsi}>
                            <p>{item.farsi}</p>
                        </Option>
                    )}
                </Select>}


            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
                {!currentGroup?.id && <ButtonB 
                enabled={isAllowed.add}
                onClick={
                    onCreateGroup
                }>
                    {textHere(TTButtons.create,lang)}
                </ButtonB>}
                <ButtonB 
                enabled={isAllowed.delete}
                onClick={onDelGroup
                }>
                    {textHere(TTButtons.delete,lang)}
                </ButtonB>
                <ButtonB
                enabled={isAllowed.change}
                onClick={onEditGroup}>
                    {textHere(TTButtons.update,lang)}
                </ButtonB>
            </Form.Item>
        </Form>
    }


    return (
        <div>
            <div className='flex justify-between pb-10'>
                <div className='w-96 pt-3'>
                    <ListItemTitle title={textHere(TTControlGroup.main_head,lang)} />
                </div>

            </div>
            {isAllowed ? <>
                {createInputForGroups()}
                <div>
                    <ModalAlert
                        title={textHere(TTButtons.confirm_and_send,lang)}
                        description={textHere(TTAlertTexts.are_you_sure,lang)}
                        okButtonText={textHere(TTButtons.ok,lang)}
                        cancelButtonText={textHere(TTButtons.cancel,lang)}
                        isOpen={modalVisible}
                        okButtonClick={() => {
                        }}
                        cancelButtonClick={() => setModalVisible(false)}
                    />
                </div>
            </> : <ResultForm
                type='info'
                title={textHere(TTPermissions.you_dont_have_permission,lang)}
                subtitle={textHere(TTPermissions.you_dont_have_permission_desc,lang)}
            />}
        </div>
    );
};

export default Control_NewGroup;
