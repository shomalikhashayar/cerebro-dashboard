
export const userAccountUrlC = 'personnel/user/'
export const userAccountUrlById = (id) => `${userAccountUrlC}${id}/`
export const userAccountUrlUD = (username) => `${userAccountUrlC}?username=${username}`//list of results

// user:::

// "id": 4,
// "last_login": null,
// "username": "omid1",
// "password": "omid1"
// "first_name": "",
// "last_name": "",
// "email": "",
// "is_staff": false,
// "is_active": true,
// "date_joined": "2023-07-11T08:12:35.330316+03:30",
// "type": "personnel",
// "rank": null,
// "part": null,
// "birth_date": null,
// "father_name": null,
// "marriage_status": "single",
// "working_status": null,
// "phone_number": null,
// "group_unit": null,
// "national_id_number": null,
// "work_code": null,
// "employment_date": null,
// "employment_type": null,
// "dispatch_date": null,
// "duty_date": null,
// "discharge_date": null,
// "groups": [],
// "user_permissions": []

export const faceUrlC = 'personnel/face/'
export const faceUrlById = (id) => `${faceUrlC}${id}/`
export const faceUrlUD = (username) => `${faceUrlC}?user__username=${username}`//list of results

// face:::

//     "id": 2,
//     "user": USER OBJECT
//     "image": "/media/personnel/faces/1.png",
//     "created_at": "2023-07-11T09:14:30.283497+03:30",
//     "updated_at": "2023-07-11T09:14:30.283529+03:30"




export const licensePlateUrlC = 'personnel/license-plate/'
export const licensePlateUrlById = (id) => `${licensePlateUrlC}${id}`
export const licensePlateUrlUD = (license_plate) => `${licensePlateUrlC}?user__username=${license_plate}`//list of results

// licensePlate:::

// "id": 1,
//                 "user": USER OBJECT,
//                 "type": "convertible",
//                 "year": "2023-03-06",
//                 "color": "black",
//                 "brand": "unknown",
//                 "plate_number": "12 p 365 - 11",
//                 "created_at": "2023-03-15T01:30:20.956891+03:30",
//                 "updated_at": "2023-03-15T01:30:20.956920+03:30"
            


export const groupUrlC = 'personnel/group/'
export const groupUrlByName = (name) => `${groupUrlC}?name=${name}`
export const groupUrlById = (id) => `${groupUrlC}${id}/`

// group:::


    // "id": 1,
    // "name": "one",
    // "permissions": [
    //     1,
    //     2,
    //     3
    // ]



export const zoneUrlC = 'general/zone/'
export const zoneUrlById = (id) => `${zoneUrlC}${id}/`
export const zoneUrlByTitle = (title) => `${zoneUrlC}?title=${title}`

// zone:::


    // "id": 2,
    // "title": "bye",
    // "address": "12313",
    // "created_at": "2023-07-11T09:59:46.094873+03:30",
    // "updated_at": "2023-07-11T09:59:46.094927+03:30",
    // "geo_location": {}


export const cameraUrlC = 'general/camera/'
export const cameraUrlById = (id) => `${cameraUrlC}${id}/`
export const cameraUrlByTitle = (title) => `${cameraUrlC}?title=${title}`



// id": 5,
//         "zone":  ZONE OBJECT,
//         "title": "salam",
//         "latitude": 1.3,
//         "longitude": 1.2,
//         "stream_url": "https://streamurl.com/stream",
//         "frame_width": 1280,
//         "frame_height": 720,
//         "frame_rate": 20,
//         "has_face_recognition": false,
//         "has_anomaly_detection": false,
//         "has_license_plate_recognition": false,
//         "has_car_model_recognition": false,
//         "created_at": "2023-07-11T10:08:35.443367+03:30",
//         "updated_at": "2023-07-11T10:08:35.443401+03:30",
//         "is_active": false
    
