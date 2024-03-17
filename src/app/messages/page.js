// pages/messages.js
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import MessageList from "../../components/message/messageList";
import MessageView from "../../components/message/messageView";

const Messages = () => {
  const [messages] = useState([
    // Dummy data, gerçek uygulamada API'den alınacak
    {
      name: "Cem Atik",
      date: "4 Kas",
      preview: "Hi Furkan, At Talentsync, we're all about...",
    },
    { name: "Ahmet Temel", date: "5 Kas", preview: "Selam" },
    {
      name: "Ahu Yılmaz",
      date: "4 Kas",
      preview: "Hi Furkan, At Talentsync, we're all about...",
    },
    // ... diğer mesajlar
  ]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const handleSelectMessage = (message) => {
    setCurrentMessage(message);
  };

  /*
  if (window.localStorage.token == undefined) {
    window.location.href = "/login";
  }
  */

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="col-md-4">
          <MessageList
            messages={messages}
            onSelectMessage={handleSelectMessage}
          />
        </div>
        <div className="col-md-8">
          <MessageView currentMessage={currentMessage} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
