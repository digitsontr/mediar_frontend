import React from "react";

const Message = ({ message, onSelectMessage }) => {
  return (
    <div>
      <a
        href="#"
        className="list-group-item list-group-item-action"
        onClick={() => onSelectMessage(message)} // Handler ekle
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{message.name}</h5>
          <small>{message.date}</small>
        </div>
        <p className="mb-1">{message.preview}</p>
      </a>
    </div>
  );
};

export default Message;
