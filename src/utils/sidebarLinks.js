import React from "react";
import {
    AlertOutlined,
    CarOutlined,
    IdcardOutlined,
    SettingOutlined,
    FormOutlined,
    EnvironmentOutlined,
    QuestionOutlined,
    PrinterOutlined,
    TeamOutlined,
    UngroupOutlined,
    AimOutlined ,
    ScanOutlined
} from '@ant-design/icons';


export const sidebarLinksEng = [
    {
        key: '1',
        label: 'Anomaly',
        linkto: '/anomaly',
        name:'anomaly',
        icon: <AlertOutlined/>
    },
    {
        key: '2',
        label: 'Face Recog',
        linkto: '/faces',
        name:'face',
        icon: <IdcardOutlined/>
    },
    {
        key: '3',
        label: 'License Plate',
        linkto: '/plates',
        name:'plate',
        icon: <CarOutlined/>
    },
    {
        key: '4',
        label: 'Vehicle Model',
        linkto: '/vehicle_model',
        name:'vehicle_model',
        icon: <ScanOutlined/>
    },
    {
        key: '5',
        label: 'Drone Detection',
        linkto: '/drone_detection',
        name:'drone_detection',
        icon: <AimOutlined/>
    },
    {
        key: '6',
        label: 'Tracking Staff',
        linkto: '/tracking_staff',
        name:'tracking_staff',
        icon: <TeamOutlined/>
    },
    {
        key: '7',
        label: 'Leftover Detection',
        linkto: '/leftover_detection',
        name:'leftover_detection',
        icon: <UngroupOutlined/>
    },
    {
        key: '8',
        label: 'Reports',
        linkto: '/reports',
        name:'report',
        icon: <PrinterOutlined/>
    },
    {
        key: '9',
        label: 'Control',
        linkto: '/control',
        name:'control',
        icon: <FormOutlined/>
    },
    {
        key: '10',
        label: 'Map',
        linkto: '/map',
        name:'map',
        icon: <EnvironmentOutlined/>
    },
    {
        key: '11',
        label: 'Settings',
        linkto: '/settings',
        name:'settings',
        icon: <SettingOutlined/>
    },

    {
        key: '12',
        label: 'Guide',
        linkto: '/guide',
        name:'guide',
        icon: <QuestionOutlined/>
    },

]
export const sidebarLinksFa = [
    {
        key: '1',
        label: 'تشخیص ناهنجاری',
        linkto: '/anomaly',
        name:'anomaly',
        icon: <AlertOutlined/>
    },
    {
        key: '2',
        label: 'تشخیص چهره',
        linkto: '/faces',
        name:'face',
        icon: <IdcardOutlined/>
    },
    {
        key: '3',
        label: 'تشخیص پلاک',
        linkto: '/plates',
        name:'plate',
        icon: <CarOutlined/>
    },
    {
        key: '4',
        label: 'تشخیص مدل ماشین',
        linkto: '/vehicle_model',
        name:'vehicle_model',
        icon: <ScanOutlined/>
    },
    {
        key: '5',
        label: 'تشخیص ریزپرنده',
        linkto: '/drone_detection',
        name:'drone_detection',
        icon: <AimOutlined/>
    },
    {
        key: '6',
        label: 'رصدکردن افراد',
        linkto: '/tracking_staff',
        name:'tracking_staff',
        icon: <TeamOutlined/>
    },
    {
        key: '7',
        label: 'تشخیص اشیا رهاشده',
        linkto: '/leftover_detection',
        name:'leftover_detection',
        icon: <UngroupOutlined/>
    },
    {
        key: '8',
        label: 'گزارشات',
        linkto: '/reports',
        name:'report',
        icon: <PrinterOutlined/>
    },
    {
        key: '9',
        label: 'کنترل',
        linkto: '/control',
        name:'control',
        icon: <FormOutlined/>
    },
    {
        key: '10',
        label: 'نقشه',
        linkto: '/map',
        name:'map',
        icon: <EnvironmentOutlined/>
    },
    {
        key: '11',
        label: 'تنظیمات',
        linkto: '/settings',
        name:'settings',
        icon: <SettingOutlined/>
    },

    {
        key: '12',
        label: 'راهنما',
        linkto: '/guide',
        name:'guide',
        icon: <QuestionOutlined/>
    },

]
