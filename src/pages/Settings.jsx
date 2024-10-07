import React, { useState } from 'react';
import { sidebarLinksFa,sidebarLinksEng } from "../utils/sidebarLinks";
import ListItemTitle from "../components/ListItemTitle";
import { Checkbox, notification, Select } from "antd";
import ButtonB from "../components/ButtonB";
import { useStateHeaderContext } from "../contexts/ContextProviderHeader";
import { permissionTaged, isPermissionAllowed } from '../utils/utils'
import NotificationUtils from '../utils/notificationUtils'
import { useApplication } from "../contexts/ContextProviderApp";
import { useStateContext } from '../contexts/ContextProvider';
import { textHere, TTButtons, TTSettings, TTStates } from '../utils/intl';
const Settings = () => {

    // const isAllowed = {
    //     add: isPermissionAllowed(permissionTaged.notification_add),
    //     view: isPermissionAllowed(permissionTaged.notification_view),
    //     change: isPermissionAllowed(permissionTaged.notification_change),
    //     delete: isPermissionAllowed(permissionTaged.notification_delete)
    // }
    const { messageHandler } = useApplication()

    const { setHeaderContent } = useStateHeaderContext()

    const {lang,setLang} = useStateContext()

    const [lang_,setLang_] = useState(lang)


    setHeaderContent(lang==='eng'?sidebarLinksEng[10]:sidebarLinksFa[10])

    const notifUtils = new NotificationUtils()

    let settings = notifUtils.getNotificationSettings()

    const [notification_settings, setNotificationSettings] = useState(settings)

    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            key: 'updatable',
            message: textHere(TTSettings.sample_notif,lang),
            description: textHere(TTSettings.descriptions,lang),
            type: 'info',
            duration: 3000,
        });
    };


    function onStoreHandler() {
        notifUtils.setNotificationSettings(notification_settings)
        localStorage.setItem('lang',lang_)
        setLang(lang)
        messageHandler('success', textHere(TTStates.success,lang_))
        window.location.reload();
    }

    return (
        <div className='flex flex-col h-full px-7 overflow-auto text-c1 dark:text-c3'>
            {contextHolder}
            <div className='flex'>
                <div className='w-96'>
                    <ListItemTitle title={textHere(TTSettings.notifications,lang)}/>
                </div>
            </div>
            <div className='flex p-4'>
                <Checkbox
                    checked={notification_settings?.show_anomaly ?? true}
                    onChange={(e) => {
                        setNotificationSettings((prevState) => ({ ...prevState, show_anomaly: e.target.checked }))
                    }}
                ><p>{textHere(TTSettings.anomaly,lang)}</p></Checkbox>
                <Checkbox
                    checked={notification_settings?.show_face ?? true}
                    onChange={(e) => {
                        setNotificationSettings((prevState) => ({ ...prevState, show_face: e.target.checked }))

                    }}><p >{textHere(TTSettings.face,lang)}</p></Checkbox>
                <Checkbox
                    checked={notification_settings?.show_plate ?? true}
                    onChange={(e) => {
                        setNotificationSettings((prevState) => ({ ...prevState, show_plate: e.target.checked }))

                    }}><p >{textHere(TTSettings.plate,lang)}</p></Checkbox>

            </div>
            <div>
                <ButtonB className="w-40 m-5"
                    onClick={openNotification}
                >
                    {textHere(TTSettings.show_sample,lang)}
                </ButtonB>

            </div>
            <div>
                <div className='w-96'>
                    <ListItemTitle title={textHere(TTSettings.language,lang)} />
                </div>
                <div className='w-72 p-5'>
                    <p>{textHere(TTSettings.choose,lang)}</p>
                    <Select
                    className='flex flex-grow'
                        options={
                            [
                                {
                                    value: 'eng',
                                    label: 'English'
                                },
                                {
                                    value: 'fa',
                                    label: 'فارسی'
                                }
                            ]
                        }
                        onChange={(e) => {
                            setLang_(e)
                        }}
                        defaultValue={lang}
                    />
                </div>
            </div>
            <ButtonB
                className=" w-40 m-5"
                onClick={onStoreHandler}
            >
               {textHere(TTButtons.action_settings,lang)}
            </ButtonB>
        </div>
    );
};

export default Settings;
