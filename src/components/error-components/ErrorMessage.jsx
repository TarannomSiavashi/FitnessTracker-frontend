import React from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({ message }) {
  return (
    <div className="error-popup">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
}
