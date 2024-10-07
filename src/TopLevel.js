import React, { useEffect, useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import App from "./App";
import { useStateContext } from "./contexts/ContextProvider";
import { useStateHeaderContext } from "./contexts/ContextProviderHeader";
import { useApplication } from "./contexts/ContextProviderApp";
import NotificationUtils from './utils/notificationUtils'

import enUS from 'antd/locale/en_US'

const TopLevel = () => {
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;
  const { theme ,lang} = useStateContext();

  const { setNotifications } = useStateHeaderContext()


  const { notificationHandler } = useApplication()

  // setProfile(userInfo2Profile())

  // eslint-disable-next-line no-unused-vars
  const [timer, setTimer] = useState(Date.now());


  // notification worker
  useEffect(() => {
    const notifUtils = new NotificationUtils()

    const interval = setInterval(() => {
      notifUtils.getNotificationsForUser(
        response => {
          notifUtils.storeNewNotifications2Local(response)
        },
        error => { },
        () => {
          notifUtils.notificationQueue(notifList => {
            for (let i = 0; i < notifList.length; i++) {
              const n = notifList[0]
              notificationHandler(n)
              notifUtils.setNotificationAsSeen(n.id)
            }
          })
        }
      )

      const notifList = notifUtils.getNotificationsFromLocal()
      setNotifications(notifList)


      setTimer(Date.now())
      // time of loop
    }, 60 * 1000)
    return () => {
      clearInterval(interval);
    };
  });

  // layout configuration and font
  return (
    <ConfigProvider
      direction={lang==='eng'?'ltr':'rtl'}
      locale={enUS}
      theme={{
        algorithm: theme === "light" ? defaultAlgorithm : darkAlgorithm,
        token: {
          fontFamily: "IRANSans"
        }
      }}
        >
      <App />
    </ConfigProvider>
  );
};

export default TopLevel;
