import React, {useState} from 'react';
import NotificationHistoryItem from "../NotificationHistoryItem";
import {Badge, Popover} from "antd";
import {BellOutlined} from "@ant-design/icons";
import {useStateHeaderContext} from "../../contexts/ContextProviderHeader";
import {useStateContext} from '../../contexts/ContextProvider'
import ResultForm from "../ResultForm";
import {textHere, TTAlertTexts} from '../../utils/intl'

const NotificationPopover = () => {
    const {lang} = useStateContext()
    const {notifications} = useStateHeaderContext()
    const [notificationOpen, setNotificationOpen] = useState(false);


    return (
        <Popover
            className='px-3'
            overlayStyle={{
                width: "25vw",
            }}
            open={notificationOpen}
            onOpenChange={(e) => {
                setNotificationOpen(e)
            }}
            content={
                <div className='h-56 scroll-auto overflow-auto'>
                    {notifications?.length > 0 ?
                        <>
                        {notifications.map(nf =>
                            <NotificationHistoryItem notif={nf}
                            />
                        )}
                        </>
                        : <ResultForm
                            title={textHere(TTAlertTexts.no_notification_exist,lang)}
                            type='info'
                            subtitle={textHere(TTAlertTexts.no_notification_created,lang)}
                        />}
                </div>
            }
        >
            <button>
                <div>
                    <div className='flex items-center'>
                        <Badge count={notifications.length} 
                        size='default' 
                        overflowCount={99}>
                            <BellOutlined className='text-2xl'/>
                        </Badge>
                    </div>
                </div>
            </button>
        </Popover>
    );
};

export default NotificationPopover;
