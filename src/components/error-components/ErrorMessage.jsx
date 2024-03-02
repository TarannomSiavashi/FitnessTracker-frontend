import React, { useState } from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({ message }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="error-popup">
          <div className="popup-content">
            <span className="close-btn" onClick={handleClose}>
              &times;
            </span>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

