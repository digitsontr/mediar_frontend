// pages/notifications.js
"use client";

import React, { useState, useEffect } from "react";
import NotificationList from "../../components/notification/notificationList";
import NotificationModal from "../../components/customModal/notificationModal";
import "bootstrap/dist/css/bootstrap.min.css";
import socketClient from "../socketClient";
import axios from "axios";

const NotificationsPage = () => {
  const [state, setState] = useState({
    notifications: [],
    selectedNotification: null,
    isModalOpen: false,
  });

  const [newSocket, setNewSocket] = useState(null);

  const [currentUserIdStr, setCurrentUserIdStr] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = ((window || {}).localStorage || {}).getItem("token") || "";
      const user = ((window || {}).localStorage || {}).getItem("user") || "";
      setCurrentUserIdStr(JSON.parse(user)?.id || null);
      setCurrentUserName(JSON.parse(user)?.username || "");

      if (!token) {
        window.location.href = "/login";
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/auth/notifications/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        //console.log("\nNotificationPage : DATA of Notifications : ", response.data);
        setState((prevState) => ({
          ...prevState,
          notifications: response.data, // Sunucudan gelen bildirim listesini kullan
        }));
      } catch (error) {
        console.error("\nNotificationPage : Notification listesi alınırken hata oluştu:", error);

        window.location.href = "/login";
      }
    };

    {window.localStorage.firstLogin = false}

    fetchData();
  }, []);

  useEffect(() => {
    if (currentUserIdStr) {
      //console.log("\nNotificationPage : USER ID FOR SOCKET : ", currentUserIdStr);
      setNewSocket(socketClient(currentUserIdStr));
    }
  }, [currentUserIdStr]);

  useEffect(() => {
    if (newSocket) {
      const handleNewNotification = (data) => {
        //console.log("\nNotificationPage : NEW NOTIFICATION *********");

        const newNotification = {
          time: data.time,
          message: data.message,
        };

        setState((prevState) => {
          // Yeni bildirimin zaten listede olup olmadığını kontrol et
          const isAlreadyListed = prevState.notifications.some(
            (notification) => notification.message === newNotification.message
          );

          if (!isAlreadyListed) {
            return {
              ...prevState,
              notifications: [...prevState.notifications, newNotification],
            };
          }

          return prevState;
        });
      };

      newSocket.on("new_notification", handleNewNotification);

      // Temizleme fonksiyonu
      return () => newSocket.on("new_notification", handleNewNotification);
    }
  }, [newSocket]);

  const handleNotificationClick = (notification) => {
    setState((prevState) => ({
      ...prevState,
      selectedNotification: notification,
      isModalOpen: true,
    }));
  };

  return (
    <div className="container col-md-6">
      <NotificationList
        notifications={state.notifications}
        onSelectNotification={handleNotificationClick}
      />
      <NotificationModal
        notification={state.selectedNotification}
        show={state.isModalOpen}
        username={currentUserName}
        onHide={() =>
          setState((prevState) => ({ ...prevState, isModalOpen: false }))
        }
      />
    </div>
  );
};

export default NotificationsPage;
