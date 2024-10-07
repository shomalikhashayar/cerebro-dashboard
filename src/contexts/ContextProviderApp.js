import React, { createContext, useContext } from "react";
import { notification, message } from "antd";
import {
  AlertOutlined,
  CarOutlined,
  IdcardOutlined
} from '@ant-design/icons';

const StateApplication = createContext();



function createNotificationIcon(ic) {
  if (ic === 'anomaly') {
    return <AlertOutlined />
  } else if (ic === 'face') {
    return <IdcardOutlined />
  } else if (ic === 'plate') {
    return <CarOutlined />
  } else {
    return <></>
  }
}
export const ContextProviderApp = ({ children }) => {
  const [
    notificationApi,
    notificationContextHolder
  ] = notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();

  
  // types: success, error, info
  const notificationHandler = ( notification) => {
    notificationApi.open({
      
              key: notification.id,
              message: notification.title,
              description: notification.content,
              type: notification.type,
              duration: 5000,
              icon: createNotificationIcon(notification.content_type),
              onClick: () => { },
            });
    
  };


  // types: success, error, info,loading
  const messageHandler = (messageType, message) => {
    messageApi.open({ type: messageType, content: message })
  }


  return (
    <StateApplication.Provider value={{
      notificationHandler, messageHandler
    }}>
      {children}
      {notificationContextHolder}
      {messageContextHolder}
    </StateApplication.Provider>
  );
};

export const useApplication = () => useContext(StateApplication);
