// components/MessageView.js
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

const MessageView = ({ currentMessage }) => {
  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    //console.log("Sending message:", messageText);
    // Burada mesaj gönderme işlemini gerçekleştirecek kodu ekleyin.
    // Örneğin, bir API isteği yaparak mesajı gönderebilirsiniz.
  };

  if (!currentMessage) {
    return <div className="p-3">Select message..</div>;
  }

  return (
    <div>
      <div className="p-3 border-bottom">
        <h5>{currentMessage.name}</h5>
        <p>{currentMessage.fullMessage}</p>
      </div>
      <div className="p-3">
        <textarea
          className="form-control"
          placeholder="Bir mesaj yazın..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-3" onClick={sendMessage}>
          Gönder
        </button>
      </div>
    </div>
  );
};

export default MessageView;
