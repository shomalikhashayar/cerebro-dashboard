export const urlLogin = 'token/'
export const urlRefreshToken = 'token/refresh/'
export const urlUsers = 'personnel/user/'
export const urlPermissions = 'personnel/permissions/'
export const urlGroups = 'personnel/group/'

export const urlMessages = 'personnel/messages/'


export const urlMainAnomaly = 'integrator/anomaly/'
export const urlMainFace = 'integrator/face/'
export const urlMainLicensePlate = 'integrator/license-plate/'

export const urlReportAll = 'integrator/all/'

export const urlMapCamera = 'general/camera/'
export const urlMapZones = 'general/zone/'


class UrlManager {
    #urlLogin = 'token/'
    #urlRefreshToken = 'token/refresh/'
    #urlUsers = 'personnel/user/'
    #urlPermissions = 'personnel/permissions/'
    #urlGroups = 'personnel/group/'
    #urlMessages = 'personnel/messages/'
    #urlMainAnomaly = 'integrator/anomaly/'
    #urlMainFace = 'integrator/face/'
    #urlMainLicensePlate = 'integrator/license-plate/'
    #urlReportAll = 'integrator/all/'
    #urlMapCamera = 'general/camera/'
    #urlMapZones = 'general/zone/'

    static getAnomalyUrl = ({
        created_at = null,
        created_at__gt = null,
        created_at__lt = null,
        updated_at = null,
        updated_at__gt = null,
        updated_at__lt = null,
        detected_at = null,
        detected_at__gt = null,
        detected_at__lt = null,
        confidence = null,
        confidence__gt = null,
        confidence__lt = null,
        camera__id = null,
        order_by = null,
        page = null
    }) => this.#rawUrlQueryMaker({
        basicUrl: urlMainAnomaly,
        created_at: created_at,
        created_at__gt: created_at__gt,
        created_at__lt: created_at__lt,
        updated_at: updated_at,
        updated_at__gt: updated_at__gt,
        updated_at__lt: updated_at__lt,
        detected_at: detected_at,
        detected_at__gt: detected_at__gt,
        detected_at__lt: detected_at__lt,
        confidence: confidence,
        confidence__gt: confidence__gt,
        confidence__lt: confidence__lt,
        confidence__lt: confidence__lt,
        camera__id: camera__id,
        order_by: order_by,
        page: page
    })

    static getFaceUrl = ({
        created_at = null,
        created_at__gt = null,
        created_at__lt = null,
        updated_at = null,
        updated_at__gt = null,
        updated_at__lt = null,
        detected_at = null,
        detected_at__gt = null,
        detected_at__lt = null,
        confidence = null,
        confidence__gt = null,
        confidence__lt = null,
        face_id = null,
        order_by = null,
        page = null
    }) => this.#rawUrlQueryMaker({
        basicUrl: this.#urlMainFace,
        created_at: created_at,
        created_at__gt: created_at__gt,
        created_at__lt: created_at__lt,
        updated_at: updated_at,
        updated_at__gt: updated_at__gt,
        updated_at__lt: updated_at__lt,
        detected_at: detected_at,
        detected_at__gt: detected_at__gt,
        detected_at__lt: detected_at__lt,
        confidence: confidence,
        confidence__gt: confidence__gt,
        confidence__lt: confidence__lt,
        face_id: face_id,
        face_id: face_id,
        order_by: order_by,
        page: page

    })


    static getLicensePlateUrl = ({
        created_at = null,
        created_at__gt = null,
        created_at__lt = null,
        updated_at = null,
        updated_at__gt = null,
        updated_at__lt = null,
        detected_at = null,
        detected_at__gt = null,
        detected_at__lt = null,
        plate_number = null,
        order_by = null,
        page = null
    }) => this.#rawUrlQueryMaker({
        basicUrl: this.#urlMainLicensePlate,
        created_at: created_at,
        created_at__gt: created_at__gt,
        created_at__lt: created_at__lt,
        updated_at: updated_at,
        updated_at__gt: updated_at__gt,
        updated_at__lt: updated_at__lt,
        detected_at: detected_at,
        detected_at__gt: detected_at__gt,
        detected_at__lt: detected_at__lt,
        plate_number: plate_number,
        order_by: order_by,
        page: page
    })

    static getReportAllUrl = ({
        created_at = null,
        created_at__gt = null,
        created_at__lt = null,
        updated_at = null,
        updated_at__gt = null,
        updated_at__lt = null,
        detected_at = null,
        detected_at__gt = null,
        detected_at__lt = null,
        confidence = null,
        confidence__gt = null,
        confidence__lt = null,
        camera__id = null,
        order_by = null,
        page = null }) => this.#rawUrlQueryMaker({
            basicUrl: this.#urlReportAll,
            created_at: created_at,
            created_at__gt: created_at__gt,
            created_at__lt: created_at__lt,
            updated_at: updated_at,
            updated_at__gt: updated_at__gt,
            updated_at__lt: updated_at__lt,
            detected_at: detected_at,
            detected_at__gt: detected_at__gt,
            detected_at__lt: detected_at__lt,
            confidence: confidence,
            confidence__gt: confidence__gt,
            confidence__lt: confidence__lt,
            camera__id: camera__id,
            order_by: order_by,
            page: page
        })

    static getCameraUrl = ({
        title = null,
        zone__id = null,
        zone__title = null,
        created_at = null,
        created_at__gt = null,
        created_at__lt = null,
        updated_at = null,
        updated_at__gt = null,
        updated_at__lt = null,
        order_by = null,
        page = null
    }) => this.#rawUrlQueryMaker({
        basicUrl: this.urlMapCamera,
        title: title,
        zone__id: zone__id,
        zone__title: zone__title,
        created_at: created_at,
        created_at__gt: created_at__gt,
        created_at__lt: created_at__lt,
        updated_at: updated_at,
        updated_at__gt: updated_at__gt,
        updated_at__lt: updated_at__lt,
        order_by: order_by,
        page: page
    })

    static getZoneUrl = ({
        title = null,
        address = null,
        created_at = null,
        created_at__gt = null,
        created_at__lt = null,
        updated_at = null,
        updated_at__gt = null,
        updated_at__lt = null,
        order_by = null,
        page = null
    }) => this.#rawUrlQueryMaker({
        basicUrl: this.urlMapZone,
        title: title,
        address: address,
        created_at: created_at,
        created_at__gt: created_at__gt,
        created_at__lt: created_at__lt,
        updated_at: updated_at,
        updated_at__gt: updated_at__gt,
        updated_at__lt: updated_at__lt,
        order_by: order_by,
        page: page
    })

    static getUserUrl = ({
        last_login=null,
        last_login__gt=null,
        last_login__lt=null,
        date_joined=null,
        date_joined__gt=null,
        date_joined__lt=null,
        username=null,
        first_name=null,
        last_name=null,
        order_by=null,
        page=null,
    })=> this.#rawUrlQueryMaker({
        basicUrl: this.urlUsers,
        last_login: last_login,
        last_login__gt: last_login__gt,
        last_login__lt: last_login__lt,
        date_joined: date_joined,
        date_joined__gt: date_joined__gt,
        date_joined__lt: date_joined__lt,
        username: username,
        first_name: first_name,
        last_name: last_name,
        order_by: order_by,
        page: page
    })

    /**
     * @param {string} basicUrl base of url to add some filters
     * @param {string} created_at time of creation (2023-03-15T01:22:00.290455+03:30) (if exists)
     * @param {string} created_at__gt time of creation greater threshold (2023-03-15T01:22:00.290455+03:30) (if exists)
     * @param {string} created_at__lt time of creation less threshold (2023-03-15T01:22:00.290455+03:30) (if exists)
     * @param {string} updated_at time of update (2023-03-15T01:22:00.290455+03:30) (if exists)
     * @param {string} updated_at__gt time of update greater threshold (2023-03-15T01:22:00.290455+03:30) (if exists)
     * @param {string} updated_at__lt time of update less threshold (2023-03-15T01:22:00.290455+03:30) (if exists)
     * @param {string} detected_at time of detection (2023-03-15T01:22:00.290455+03:30) (if exists)
     * @param {string} detected_at__gt time of detection greater threshold (2023-03-15T01:22:00.290455+03:30) (if exists)
     * @param {string} detected_at__lt time of detection less threshold (2023-03-15T01:22:00.290455+03:30) (if exists)
     * @param {number} confidence confidence of detection (0.0-1.0) (if exists)
     * @param {number} confidence__gt confidence of detection greater threshold (0.0-1.0) (if exists)
     * @param {number} confidence__lt confidence of detection less threshold (0.0-1.0) (if exists)
     * @param {number} camera__id id of camera (if exists)
     * @param {string} order_by field to order by (created_at, updated_at, detected_at, confidence, camera__id) (if exists)
     * @param {number} page page number: starts from 1 if `next` or `previous` was not null (if exists)
     * @param {number} face_id id of face (if exists)
     * @param {string} plate_number number of license plate (if exists)
     * @param {string} title title of license plate (if exists)
     * @param {number} zone__id id of zone (if exists)
     * @param {string} zone__title title of zone (if exists)
     * @param {string} address address of license plate (if exists)
     * @param {string} username username of user (if exists)
     * @param {string} last_login last login of user (if exists)
     * @param {string} last_login__gt last login greater threshold of user (if exists)
     * @param {string} last_login__lt last login less threshold of user (if exists)
     * @param {string} date_joined date joined of user (if exists)
     * @param {string} date_joined__gt date joined greater threshold of user (if exists)
     * @param {string} date_joined__lt date joined less threshold of user (if exists)
     * @param {string} first_name first name of user (if exists)
     * @param {string} last_name last name of user (if exists)
     * @param {string} user_username username of user (if exists)
     * @param {string} user_firstname first name of user (if exists)
     * @param {string} user_lastname last name of user (if exists)
     
     * @returns {string} url with query
     */
    static #rawUrlQueryMaker = (basicUrl, {
        created_at = null,
        created_at__gt = null,
        created_at__lt = null,
        updated_at = null,
        updated_at__gt = null,
        updated_at__lt = null,
        detected_at = null,
        detected_at__gt = null,
        detected_at__lt = null,
        confidence = null,
        confidence__gt = null,
        confidence__lt = null,
        camera__id = null,
        order_by = null,
        page = null,
        face_id = null,
        plate_number = null,
        title = null,
        zone__id = null,
        zone__title = null,
        address = null,
        username = null,
        last_login = null,
        last_login__gt = null,
        last_login__lt = null,
        date_joined = null,
        date_joined__gt = null,
        date_joined__lt = null,
        first_name = null,
        last_name = null,
        user_username = null,
        user_firstname = null,
        user_lastname = null,
    }) => {
        let url = basicUrl + '?'
        if (created_at) url += `created_at=${created_at}&`
        if (created_at__gt) url += `created_at__gt=${created_at__gt}&`
        if (created_at__lt) url += `created_at__lt=${created_at__lt}&`
        if (updated_at) url += `updated_at=${updated_at}&`
        if (updated_at__gt) url += `updated_at__gt=${updated_at__gt}&`
        if (updated_at__lt) url += `updated_at__lt=${updated_at__lt}&`
        if (detected_at) url += `detected_at=${detected_at}&`
        if (detected_at__gt) url += `detected_at__gt=${detected_at__gt}&`
        if (detected_at__lt) url += `detected_at__lt=${detected_at__lt}&`
        if (confidence) url += `confidence=${confidence}&`
        if (confidence__gt) url += `confidence__gt=${confidence__gt}&`
        if (confidence__lt) url += `confidence__lt=${confidence__lt}&`
        if (camera__id) url += `camera__id=${camera__id}&`
        if (order_by) url += `order_by=${order_by}&`
        if (page) url += `page=${page}`
        return url
    }

}




