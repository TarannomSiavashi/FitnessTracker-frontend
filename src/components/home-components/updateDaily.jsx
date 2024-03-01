import React, { useState } from "react";
import ErrorPopup from "../error-components/ErrorMessage";
import "../home-components/styles/updateDaily.css";
import { put } from "../../utils/httpClient";

export default function updateDaily({ userId, goal, onClose }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCloseErrorPopup = () => {
    setErrorMessage("");
  };

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async () => {
    const newMetric = document.getElementById("newStatus").value;
    const updateStatus = {
      status: newMetric,
    };
    try {
      const response = await put(
        `/daily/${userId}/${goal.dayid}`,
        updateStatus
      );
      handleClose();
    } catch (error) {
      setErrorMessage("Error updating daily goal.");
    }
  };

  return (
    <>
      {isOpen && (
        <div>
          {errorMessage && (
            <ErrorPopup
              message={errorMessage}
              onClose={handleCloseErrorPopup}
            />
          )}
          <dialog id="updateDailyDialog" open>
            <h3>{goal.title}</h3>

            <div id="updateStatus">
              <h5>How much you have obtained?</h5>
              <input type="number" id="newStatus" defaultValue={goal.status} />
            </div>
            <div className="buttons">
              <button className="button" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
