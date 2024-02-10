// components/MessageList.js
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import Message from "./message";

const MessageList = ({ messages, onSelectMessage }) => {
  return (
    <div className="list-group">
      {messages.length > 0 &&
        messages.map((message) => (
          <div key={message.id}>
            <Message message={message} onSelectMessage={onSelectMessage} />
          </div>
        ))}
    </div>
  );
};

export default MessageList;
