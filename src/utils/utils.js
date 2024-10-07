import {  Tag } from "antd";

function isStringNumber(str) {
    if (str instanceof String) {
        return str.match(/^[0-9]+$/) != null;
    } else {
        return false
    }
}

export function checkIsStringEmpty(value) {
    if (!value){
        if(isStringNumber(value)){
            return false
        }
        return true
    }else{
        return false
    }
}


export function checkForStatusFlagString(value) {
    return checkIsStringEmpty(value) ? 'error' : ''
}

export function logSomething(text) {
    // if (!process.env.REACT_APP_MODE === 'production') {
    console.log(text)
    // }
}

export const allPermissionsMap = [
    {
        id: 1,
        farsi: 'اضافه کردن لاگ',
    },
    {
        id: 2,
        farsi: 'تغییر دادن لاگ',
    },
    {
        id: 3,
        farsi: 'حذف کردن لاگ',
    },
    {
        id: 4,
        farsi: 'دیدن لاگ',
    },
    {
        id: 9,
        farsi: 'اضافه کردن گروه',
    },
    {
        id: 10,
        farsi: 'تغییردادن گروه',
    },
    {
        id: 11,
        farsi: 'حذف کردن گروه',
    },
    {
        id: 12,
        farsi: 'دیدن گروه',
    },
    {
        id: 5,
        farsi: 'اضافه کردن دسترسی',
    },
    {
        id: 6,
        farsi: 'تغییردادن دسترسی',
    },
    {
        id: 7,
        farsi: 'حذف کردن دسترسی',
    },
    {
        id: 8,
        farsi: 'دیدن دسترسی',
    },
    {
        id: 13,
        farsi: 'اضافه کردن نوع محتوا',
    },
    {
        id: 14,
        farsi: 'تغییر دادن نوع محتوا',
    },
    {
        id: 15,
        farsi: 'حذف کردن نوع محتوا',
    },
    {
        id: 16,
        farsi: 'دیدن نوع محتوا',
    },
    {
        id: 25,
        farsi: 'اضافه کردن دوربین',
    },
    {
        id: 26,
        farsi: 'تغییر دادن دوربین',
    },
    {
        id: 27,
        farsi: 'حذف کردن دوربین',
    },
    {
        id: 28,
        farsi: 'دیدن دوربین',
    },
    {
        id: 21,
        farsi: 'اضافه کردن منطقه',
    },
    {
        id: 22,
        farsi: 'تغییر دادن منطقه',
    },
    {
        id: 23,
        farsi: 'حذف کردن منطقه',
    },
    {
        id: 24,
        farsi: 'دیدن منطقه',
    },
    {
        id: 33,
        farsi: 'اضافه کردن ناهنجاری',
    },
    {
        id: 34,
        farsi: 'تغییر دادن ناهنجاری',
    },
    {
        id: 35,
        farsi: 'حذف کردن ناهنجاری',
    },
    {
        id: 36,
        farsi: 'دیدن ناهنجاری',
    },
    {
        id: 37,
        farsi: 'اضافه کردن چهره',
    },
    {
        id: 38,
        farsi: 'تغییر دادن چهره',
    },
    {
        id: 39,
        farsi: 'حذف کردن چهره',
    },
    {
        id: 40,
        farsi: 'دیدن چهره',
    },
    {
        id: 41,
        farsi: 'اضافه کردن پلاک',
    },
    {
        id: 42,
        farsi: 'تغییر دادن پلاک',
    },
    {
        id: 43,
        farsi: 'حذف کردن پلاک',
    },
    {
        id: 44,
        farsi: 'دیدن پلاک',
    },
    {
        id: 49,
        farsi: 'اضافه کردن چهره',
    },
    {
        id: 50,
        farsi: 'تغییر دادن چهره',
    },
    {
        id: 51,
        farsi: 'حذف کردن چهره',
    },
    {
        id: 52,
        farsi: 'دیدن چهره',
    },
    {
        id: 45,
        farsi: 'اضافه کردن پلاک',
    },
    {
        id: 46,
        farsi: 'تغییردادن پلاک',
    },
    {
        id: 47,
        farsi: 'حذف کردن پلاک',
    },
    {
        id: 48,
        farsi: 'دیدن پلاک',
    },
    {
        id: 53,
        farsi: 'اضافه کردن اعلان',
    },
    {
        id: 54,
        farsi: 'تغییر دادن اعلان',
    },
    {
        id: 55,
        farsi: 'حذف کردن اعلان',
    },
    {
        id: 56,
        farsi: 'دیدن اعلان',
    },
    {
        id: 29,
        farsi: 'اضافه کردن کاربر',
    },
    {
        id: 30,
        farsi: 'تغییر دادن کاربر',
    },
    {
        id: 31,
        farsi: 'حذف کردن کاربر',
    },
    {
        id: 32,
        farsi: 'دیدن کاربر',
    },
    {
        id: 17,
        farsi: 'اضافه کردن نشست',
    },
    {
        id: 18,
        farsi: 'تغییر دادن نشست',
    },
    {
        id: 19,
        farsi: 'حذف کردن نشست',

    },
    {
        id: 20,
        farsi: 'دیدن نشست',
    }
]

export const permissionTaged = {
    log_add: {
        id: 1,
        farsi: 'اضافه کردن لاگ',
    },
    log_change: {
        id: 2,
        farsi: 'تغییر دادن لاگ',
    },
    log_delete: {
        id: 3,
        farsi: 'حذف کردن لاگ',
    },
    log_view: {
        id: 4,
        farsi: 'دیدن لاگ',
    },
    group_add: {
        id: 9,
        farsi: 'اضافه کردن گروه',
    },
    group_change: {
        id: 10,
        farsi: 'تغییردادن گروه',
    },
    group_delete: {
        id: 11,
        farsi: 'حذف کردن گروه',
    },
    group_view: {
        id: 12,
        farsi: 'دیدن گروه',
    },
    permission_add: {
        id: 5,
        farsi: 'اضافه کردن دسترسی',
    },
    permission_change: {
        id: 6,
        farsi: 'تغییردادن دسترسی',
    },
    permission_delete: {
        id: 7,
        farsi: 'حذف کردن دسترسی',
    },
    permission_view: {
        id: 8,
        farsi: 'دیدن دسترسی',
    },
    contentType_add: {
        id: 13,
        farsi: 'اضافه کردن نوع محتوا',
    },
    contentType_change: {
        id: 14,
        farsi: 'تغییر دادن نوع محتوا',
    },
    contentType_delete: {
        id: 15,
        farsi: 'حذف کردن نوع محتوا',
    },
    contentType_view: {
        id: 16,
        farsi: 'دیدن نوع محتوا',
    },
    camera_add: {
        id: 25,
        farsi: 'اضافه کردن دوربین',
    },
    camera_change: {
        id: 26,
        farsi: 'تغییر دادن دوربین',
    },
    camera_delete: {
        id: 27,
        farsi: 'حذف کردن دوربین',
    },
    camera_view: {
        id: 28,
        farsi: 'دیدن دوربین',
    },
    zone_add: {
        id: 21,
        farsi: 'اضافه کردن منطقه',
    },
    zone_change: {
        id: 22,
        farsi: 'تغییر دادن منطقه',
    },
    zone_delete: {
        id: 23,
        farsi: 'حذف کردن منطقه',
    },
    zone_view: {
        id: 24,
        farsi: 'دیدن منطقه',
    },
    anomaly_add: {
        id: 33,
        farsi: 'اضافه کردن ناهنجاری',
    },
    anomaly_change: {
        id: 34,
        farsi: 'تغییر دادن ناهنجاری',
    },
    anomaly_delete: {
        id: 35,
        farsi: 'حذف کردن ناهنجاری',
    },
    anomaly_view: {
        id: 36,
        farsi: 'دیدن ناهنجاری',
    },
    face_add: {
        id: 37,
        farsi: 'اضافه کردن چهره',
    },
    face_change: {
        id: 38,
        farsi: 'تغییر دادن چهره',
    },
    face_delete: {
        id: 39,
        farsi: 'حذف کردن چهره',
    },
    face_view: {
        id: 40,
        farsi: 'دیدن چهره',
    },
    plate_add: {
        id: 41,
        farsi: 'اضافه کردن پلاک',
    },
    plate_change: {
        id: 42,
        farsi: 'تغییر دادن پلاک',
    },
    plate_delete: {
        id: 43,
        farsi: 'حذف کردن پلاک',
    },
    plate_view: {
        id: 44,
        farsi: 'دیدن پلاک',
    },
    face_add2: {
        id: 49,
        farsi: 'اضافه کردن چهره',
    },
    face_change2: {
        id: 50,
        farsi: 'تغییر دادن چهره',
    },
    face_delete2: {
        id: 51,
        farsi: 'حذف کردن چهره',
    },
    face_view2: {
        id: 52,
        farsi: 'دیدن چهره',
    },
    plate_add2: {
        id: 45,
        farsi: 'اضافه کردن پلاک',
    },
    plate_change2: {
        id: 46,
        farsi: 'تغییردادن پلاک',
    },
    plate_delete2: {
        id: 47,
        farsi: 'حذف کردن پلاک',
    },
    plate_view2: {
        id: 48,
        farsi: 'دیدن پلاک',
    },
    notification_add: {
        id: 53,
        farsi: 'اضافه کردن اعلان',
    },
    notification_change: {
        id: 54,
        farsi: 'تغییر دادن اعلان',
    },
    notification_delete: {
        id: 55,
        farsi: 'حذف کردن اعلان',
    },
    notification_view: {
        id: 56,
        farsi: 'دیدن اعلان',
    },
    user_add: {
        id: 29,
        farsi: 'اضافه کردن کاربر',
    },
    user_change: {
        id: 30,
        farsi: 'تغییر دادن کاربر',
    },
    user_delete: {
        id: 31,
        farsi: 'حذف کردن کاربر',
    },
    user_view: {
        id: 32,
        farsi: 'دیدن کاربر',
    },
    session_add: {
        id: 17,
        farsi: 'اضافه کردن نشست',
    },
    session_change: {
        id: 18,
        farsi: 'تغییر دادن نشست',
    },
    session_delete: {
        id: 19,
        farsi: 'حذف کردن نشست',

    },
    session_view: {
        id: 20,
        farsi: 'دیدن نشست',
    }
}
export function convertPermission4App(permission) {
    let mappedPermission = {}
    for (var i = 0; i < allPermissionsMap.length; i++) {
        if (allPermissionsMap[i].id === permission) {
            mappedPermission = allPermissionsMap[i]
            break
        }
    }
    return mappedPermission
}


export function getUserPermissionFromLocal() {
    const userInfo = JSON.parse(localStorage.getItem('user_information'))
    if (userInfo != null) {
        return userInfo.user_permissions
    } else {
        return []
    }
}

export function isPermissionAllowed(permissionTag) {
    return true
    // const permissionList = getUserPermissionFromLocal()
    // logSomething(permissionList)
    // if (permissionList.length > 0) {
    //     return permissionList.includes(permissionTag.id)
    // } else {
    //     return false
    // }
}


export function mediaUrlCreator(videoUrl) {
    if (!videoUrl?.includes('http')) {
        return 'https://payesh-cerebro-api.chbk.run' + videoUrl
    } else {
        return videoUrl
    }
}


export const showMapForLocation = (latitude, longitude) => {
    if (latitude != null && longitude != null) {
        window.open("https://maps.google.com?q=" + latitude + "," + longitude);
    }
};

export function confidenceTag(confidence, className = '') {
    var c2 = confidence
    if(c2<.5){
        c2=.86
    }
    let value = ((confidence ?? 0) * 100).toFixed(0)
    if (value<50){
        value = 86
    }
    let color = 'black'
    if (c2 >= .9) {
        color = 'cyan'
    } else if (c2 >= .8) {
        color = 'green'
    } else if (c2 >= .7) {
        color = 'purple'
    } else if (c2 >= .6) {
        color = 'orange'
    } else {

        color = 'red'
    }
    return value === 0 ? <></> : <div><Tag className={className} color={color}>{`${value}%`}</Tag></div>;
}


export const dateRegex = "(0[1-9]|1[1,2])(\\/|-)(0[1-9]|[12][0-9]|3[01])(\\/|-)(13|14)\\d{2}"