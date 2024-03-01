import React, { useState } from "react";
import '../home-components/styles/updateDaily.css';
import { put } from '../../utils/httpClient';

export default function updateDaily({ userId, goal , onClose}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    // setIsOpen(false);
    onClose();
  };

  const handleConfirm = async () => {
    const newMetric = document.getElementById("newStatus").value;
    const updateStatus = {
        status: newMetric
    }
    try {
      const response = await put(`/daily/${userId}/${goal.dayid}`, updateStatus);
      handleClose();
    } catch (error) {
      console.error("Error updating daily goal:", error);
      // Handle error appropriately
    }
  };

  return (
    <>
      {isOpen && (
        <div>
          <dialog id="updateDailyDialog" open>
            <h3>{goal.title}</h3>

            <div id="updateStatus">
              <h5>How much you have obtained?</h5>
              <input type="number" id="newStatus" defaultValue={goal.status} />
            </div>
            <div className="buttons">
              <button className="button" onClick={handleConfirm}>Confirm</button>
              <button className="button" onClick={handleClose}>Cancel</button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
