/* eslint-disable react/jsx-pascal-case */
import React, { useState, useRef } from 'react';
import ListItemTitle from "../../components/ListItemTitle";
import { sidebarLinksFa, sidebarLinksEng } from "../../utils/sidebarLinks";
import { Divider, Radio } from 'antd';
import Control_NewAccount from "./Control_NewAccount";
import Control_NewFace from "./Control_NewFace";
import Control_NewPlate from "./Control_NewPlate";
import Control_NewGroup from './Control_NewGroup';
import Control_NewZone from "./Control_NewZone";
import Control_NewCamera from "./Control_NewCamera";
import { UploadOutlined } from '@ant-design/icons'
import ButtonB from "../../components/ButtonB";
import { useStateHeaderContext } from "../../contexts/ContextProviderHeader";
import axios from 'axios';
import { permissionTaged, isPermissionAllowed } from '../../utils/utils'
import { useStateContext } from '../../contexts/ContextProvider';
import { textHere, TTButtons, TTControlAccount, TTControlCamera, TTControlFace, TTControlGroup, TTControlPlate, TTControlZone, TTPlaceholders } from '../../utils/intl';



const Control = () => {

    const { lang } = useStateContext()
    const inputFile = useRef(null)


    const isUserAllowed = {
        add: isPermissionAllowed(permissionTaged.user_add),
        view: isPermissionAllowed(permissionTaged.user_view),
        change: isPermissionAllowed(permissionTaged.user_change),
        delete: isPermissionAllowed(permissionTaged.user_delete)
    }

    const isFaceAllowed = {
        add: isPermissionAllowed(permissionTaged.face_add),
        view: isPermissionAllowed(permissionTaged.face_view),
        change: isPermissionAllowed(permissionTaged.face_change),
        delete: isPermissionAllowed(permissionTaged.face_delete)
    }


    const isPlateAllowed = {
        add: isPermissionAllowed(permissionTaged.plate_add),
        view: isPermissionAllowed(permissionTaged.plate_view),
        change: isPermissionAllowed(permissionTaged.plate_change),
        delete: isPermissionAllowed(permissionTaged.plate_delete)
    }


    const isGroupAllowed = {
        add: isPermissionAllowed(permissionTaged.group_add),
        view: isPermissionAllowed(permissionTaged.group_view),
        change: isPermissionAllowed(permissionTaged.group_change),
        delete: isPermissionAllowed(permissionTaged.group_delete)
    }


    const isCameraAllowed = {
        add: isPermissionAllowed(permissionTaged.camera_add),
        view: isPermissionAllowed(permissionTaged.camera_view),
        change: isPermissionAllowed(permissionTaged.camera_change),
        delete: isPermissionAllowed(permissionTaged.camera_delete)
    }

    const isZoneAllowed = {
        add: isPermissionAllowed(permissionTaged.zone_add),
        view: isPermissionAllowed(permissionTaged.zone_view),
        change: isPermissionAllowed(permissionTaged.zone_change),
        delete: isPermissionAllowed(permissionTaged.zone_delete)
    }


    const { setHeaderContent } = useStateHeaderContext()
    setHeaderContent(lang === 'eng' ? sidebarLinksEng[8] : sidebarLinksFa[8])
    const [controlType, setControlType] = useState('user');

    const [descriptionText, setDescriptionText] = useState('')


    const controlTypeOptions = [
        {
            label: textHere(TTControlAccount.main_head, lang),
            value: 'user',
            disabled: !(isUserAllowed.add || isUserAllowed.view || isUserAllowed.change || isUserAllowed.delete),
        },
        {
            label: textHere(TTControlFace.main_head, lang),
            value: 'face',
            disabled: !(isFaceAllowed.add || isFaceAllowed.view || isFaceAllowed.change || isFaceAllowed.delete),
        },
        {
            label: textHere(TTControlPlate.main_head, lang),
            value: 'plate',
            disabled: !(isPlateAllowed.add || isPlateAllowed.view || isPlateAllowed.change || isPlateAllowed.delete),
        }, {
            label: textHere(TTControlGroup.main_head, lang),
            value: 'groups',
            disabled: !(isGroupAllowed.add || isGroupAllowed.view || isGroupAllowed.change || isGroupAllowed.delete),
        }, {
            label: textHere(TTControlZone.main_head, lang),
            value: 'zones',
            disabled: !(isZoneAllowed.add || isZoneAllowed.view || isZoneAllowed.change || isZoneAllowed.delete),
        }, {
            label: textHere(TTControlCamera.main_head, lang),
            value: 'cameras',
            disabled: !(isCameraAllowed.add || isCameraAllowed.view || isCameraAllowed.change || isCameraAllowed.delete),
        },
    ]
    const onChangeRadio = (e) => {
        setControlType(e.target.value)
    }


    function showControl(control) {
        if (control === controlTypeOptions[0].value) {
            return <><Divider />
                <Control_NewAccount />
                <Divider /></>

        } else if (control === controlTypeOptions[1].value) {
            return <><Divider />
                <Control_NewFace />
                <Divider />
            </>
        } else if (control === controlTypeOptions[2].value) {
            return <><Divider />
                <Control_NewPlate />
                <Divider />
            </>
        } else if (control === controlTypeOptions[3].value) {
            return <><Divider />
                <Control_NewGroup />
                <Divider />
            </>
        } else if (control === controlTypeOptions[4].value) {
            return <><Divider />
                <Control_NewZone />
                <Divider />
            </>
        } else if (control === controlTypeOptions[5].value) {
            return <><Divider />
                <Control_NewCamera />
                <Divider />
            </>
        }
    }

    const handleTextDescription = (controlValue) => {
        var text = ''
        switch (controlValue) {
            case controlTypeOptions[0].value:
                text = textHere(TTPlaceholders.control_account_description, lang)
                break;
            case controlTypeOptions[1].value:
                text = textHere(TTPlaceholders.control_face_description, lang)
                break;
            case controlTypeOptions[2].value:
                text = textHere(TTPlaceholders.control_plate_description, lang)
                break;
            case controlTypeOptions[3].value:
                text  = textHere(TTPlaceholders.control_groups_description,lang)
                break
            case controlTypeOptions[4].value:
                text = textHere(TTPlaceholders.control_zones_description,lang)
                break
            case controlTypeOptions[5].value:
                text = textHere(TTPlaceholders.control_cameras_description,lang)
                break
            default:
                text = textHere(TTPlaceholders.control_account_description, lang)
        }
        return text
    }




    return (<>
        <div className='flex flex-col h-full px-7 overflow-auto text-c1 dark:text-c3'>
            <div className='flex'>
                <div className='w-96'>
                    <ListItemTitle title={textHere(TTButtons.update_info, lang)} />
                </div>
            </div>
            <div className='p-3 flex'>
                <p className='text-end'>{textHere(TTPlaceholders.data_folder, lang)}</p>
                <button className='px-8' onClick={() => {
                    inputFile.current.click();
                }}>
                    <input ref={inputFile} type="file" />
                </button>
            </div>
            <div className='flex p-3'>

                <ButtonB className="w-40" onClick={() => {
                    alert('با موفقیت انجام شد')
                 }}>
                    {textHere(TTButtons.action_settings, lang)}               </ButtonB>
            </div>
            <Divider />
            <div className='flex p-5 justify-center'>
                <p>{textHere(TTPlaceholders.chose_one, lang)}</p>
            </div>

            <Radio.Group
                className="flex p-5 justify-center font-bold"
                options={controlTypeOptions}
                onChange={onChangeRadio}
                value={controlType}
                optionType="button"
                buttonStyle="solid"
                size='large'
            />
            <div className='flex justify-center text-slate-400 dark:text-slate-500 text-xs'><p>{handleTextDescription(controlType)}</p></div>
            {showControl(controlType)}

        </div>
    </>);
};

export default Control;
