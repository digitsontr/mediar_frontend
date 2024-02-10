// components/NotificationList.js
import React from "react";

function timeSince(notificationTime) {
  const now = new Date();
  const notificationDate = new Date(notificationTime);
  const diffInSeconds = Math.floor((now - notificationDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) {
    return `${diffInMonths}mo`;
  } else if (diffInDays > 0) {
    return `${diffInDays}d`;
  } else if (diffInHours > 0) {
    return `${diffInHours}hr`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}mn`;
  } else {
    return "Now";
  }
}

const Notification = ({ notification, onSelectNotification }) => {
  //console.log("Notification : ", notification);

  return (
    <div>
      <div
        className="list-group-item"
        key={notification.id}
        onClick={() => onSelectNotification(notification)}
      >
        <div className="d-flex w-100 justify-content-start align-items-center">
          <div className="flex-grow-1">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{notification.message.split(" ")[0]}</h5>
              <small className="text-muted">
                {timeSince(notification.time)}
              </small>
            </div>
            <p className="mb-1">{notification.message}</p>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Notification;
