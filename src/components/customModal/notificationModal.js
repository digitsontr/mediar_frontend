// components/NotificationModal.js
import React, { useState } from "react";

const NotificationModal = ({ notification, show, onHide, username }) => {
  const now = new Date();

  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{
        display: show ? "block" : "none",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1000",
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Notification</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onHide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {notification && (
              <>
                <p>
                  <strong>{notification.message.split(" ")[0]}</strong>
                </p>
                <p>
                  {notification.message.replace(
                    username + " kullanıcısını",
                    "sizi"
                  )}
                </p>
                <small className="text-muted">
                  {now.getMinutes() === new Date(notification.time).getMinutes()
                    ? "Now"
                    : `${Math.floor(
                        (now - new Date(notification.time)) / 60000
                      )}mn`}
                </small>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onHide}
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
