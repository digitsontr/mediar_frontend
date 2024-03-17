// components/NotificationList.js
import React from "react";
import Notification from "./notification";

const NotificationList = ({ notifications, onSelectNotification }) => {
  const reversedNotifications = [...notifications].reverse();

  return (
    <div className="list-group">
      <br />

      {reversedNotifications.length > 0 &&
        reversedNotifications.map((notification) => (
          <div key={notification.id}>
            <Notification
              notification={notification}
              onSelectNotification={onSelectNotification}
            />
            <br />
          </div>
        ))}

      <br />
    </div>
  );
};

export default NotificationList;
