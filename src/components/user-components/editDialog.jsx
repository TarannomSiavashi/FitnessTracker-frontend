import React, { useState } from "react";
import "../user-components/editDialog.css";
import { put } from "../../utils/httpClient";

export default function EditDialog({ user, onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async () => {
    const name = document.getElementById("name").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const birthdate = document.getElementById("date").value;

    const updatedUser = {
      id: user.id,
      name: name,
      weight: weight,
      height: height,
      birthdate: birthdate,
    };

    try {
      const response = await put(`/edit/${user.id}`, updatedUser);
      if (response) {
        handleClose();
      } else {
        console.error("PUT request failed or response status is not 200");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div>
          <dialog id="editDialog" open>
            <h3>User Information</h3>

            <div id="editInfo">
              <h5 style={{ paddingLeft: "45px" }} id="edit_info">
                Name
              </h5>
              <input type="text" id="name" defaultValue={user.name} />
            </div>
            <div id="editInfo">
              <h5 id="edit_info"> Weight</h5>
              <input type="number" id="weight" defaultValue={user.weight} />
            </div>

            <div id="editInfo">
              <h5 id="edit_info">Height</h5>
              <input type="number" id="height" defaultValue={user.height} />
            </div>

            <div id="editInfo">
              <h5 id="edit_info">Date of Birth</h5>
              <input type="date" id="date" defaultValue={user.birthdate} />
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
