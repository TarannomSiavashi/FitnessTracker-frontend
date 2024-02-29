import React, { useState } from "react";
import { post } from "../../utils/httpClient";
import "../home-components/styles/addRecord.css";

export default function addRecord({ prid, onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const add = async () => {
    const date = document.getElementById("recordDate").value;
    const metric = document.getElementById("recordMetric").value;
    const note = document.getElementById("recordNote").value;

    console.log("Date:")
    console.log(date);
    const newRecord = {
      prid: prid,
      prdate: date,
      metric: metric,
      note: note,
    };
    console.log(newRecord)
    try {
      const response = await post(`/newRecord`, newRecord);
      console.log("new record:", response);
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="addContainer">
            <div className="newRecPart">
                <label>Record Date:</label>
            <input type="date" id="recordDate" />
            </div>

            <div className="newRecPart">
            <label>Record Metric (kg):</label>
            <input type="number" id="recordMetric" />
            </div>

            <div className="newRecPart">
            <label>Note:</label>
            <input type="text" id="recordNote" />
            </div>

          <div className="recordAddButton">
            <button id="add_record" onClick={add}>
              Add
            </button>
            <button id="back_record" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

