import axiosInstance from "../network/axiosInstance"
import { urlMessages } from "../network/urls"
import { logSomething } from "./utils"

class NotificationUtils {


    constructor() {
        this.defaultNotificationSettings = {
            show_anomaly: true,
            show_face: true,
            show_plate: true
        }
        this.ax = axiosInstance()



    }

    // show anomaly
    // show face
    // show plate
    setNotificationSettings(settings) {
        localStorage.setItem('notification_settings', JSON.stringify(settings))
    }

    getNotificationSettings() {
        const settings = JSON.parse(localStorage.getItem('notification_settings'))
        if (settings != null) {
            return settings
        } else {
            return this.defaultNotificationSettings
        }
    }


    // request notifications
    getNotificationsForUser(onResponse, onError, onFinally) {
        if ((localStorage.getItem('login') ?? false)) { //&& localStorage.getItem('active_notifications')) {
            const ax = axiosInstance()
            ax.get(urlMessages)
                .then(response => {
                    var jsonResponse = JSON.parse(response?.data)?.data?.results
                    if (Object.keys(jsonResponse).length > 0) {
                        onResponse(jsonResponse.data)
                    }
                })
                .catch(error => {
                    onError(error)
                }).finally(onFinally)
        }
    }

    // read from local storage
    getNotificationsFromLocal() {
        const notifications = JSON.parse(localStorage.getItem('notification_list'))
        logSomething(notifications)

        if (notifications != null && notifications.length > 0) {
            return notifications
        } else {
            return []
        }
    }

    // compare and add new notifications to local storage
    storeNewNotifications2Local(notificationList) {
        const prevNotifs = this.getNotificationsFromLocal()
        let notifs = [...prevNotifs]
        for (let i = 0; i < notificationList.length; i++) {
            let foundInPrev = false
            for (let j = 0; j < prevNotifs.length; j++) {
                if (notificationList[i].id === prevNotifs[j].id) {
                    foundInPrev = true
                }
            }
            if (!foundInPrev) {
                notifs = [...notifs, notificationList[i]]
            }
        }
        localStorage.setItem('notification_list', JSON.stringify(notifs))
        return notificationList

    }

    storeNotifications2Local(notificationList) {
        localStorage.setItem('notification_list', JSON.stringify(notificationList))
    }

    // this is a queue which decides if it must be shown or not 
    notificationQueue(unseenNotifs) {
        const notifications = this.getNotificationsFromLocal()
        const settings = this.getNotificationSettings()
        let unseenNotificationList = []
        for (let i = 0; i < notifications.length; i++) {
            if (!notifications[i].is_seen) {
                if ((settings.show_anomaly && notifications[i]?.content_type === 'anomaly')
                    || (settings.show_face && notifications[i]?.content_type === 'face')
                    || (settings.show_plate && notifications[i]?.content_type === 'licenseplate')) {
                        
                    unseenNotificationList = [...unseenNotificationList, notifications[i]]
                }
            }
        }
        unseenNotifs(unseenNotificationList)
    }

    // when notif is show, it becomes a seen notif, it's handled locally!!
    setNotificationAsSeen(notifId) {
        const notifications = this.getNotificationsFromLocal()
        if (notifications != null) {
            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].id === notifId) {
                    notifications[i].is_seen = true
                }
            }

        }
        this.storeNotifications2Local(notifications)

    }



}


export default NotificationUtils