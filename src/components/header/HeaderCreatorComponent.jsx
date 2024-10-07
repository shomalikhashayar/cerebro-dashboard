import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {useStateContext} from "../../contexts/ContextProvider";
import FiltteringPopover from "./FiltteringPopover";
import SortingPopover from "./SortingPopover";
import NotificationPopover from "./NotificationPopover";
import ProfilePopover from "./ProfilePopover";
import {useStateHeaderContext} from "../../contexts/ContextProviderHeader";
import DarkModeSwitcher from "./DarkModeSwitcher";
// import {ReactComponent as SunSvg} from "../../utils/sun.svg";

const HeaderCreatorComponent = () => {
    const {sidebarCollapsed, setSidebarCollapsed,theme} = useStateContext()
    const {headerContent} = useStateHeaderContext()

    return (

        <div className="flex">
            {React.createElement(sidebarCollapsed ? MenuFoldOutlined : MenuUnfoldOutlined, {
                className: 'trigger',
                onClick: () => setSidebarCollapsed(!sidebarCollapsed),
            })}

            <div className='flex flex-grow px-6 items-center'>
                <div className='text-3xl px-3'>{headerContent.icon}</div>
                <p className='text-3xl p-3'>{headerContent.label}</p>
            </div>
            <DarkModeSwitcher/>
            <FiltteringPopover part={headerContent.name}/>
            <SortingPopover part={headerContent.name}/>
            <NotificationPopover/>
            <ProfilePopover/>

         </div>

    );
};

export default HeaderCreatorComponent;


