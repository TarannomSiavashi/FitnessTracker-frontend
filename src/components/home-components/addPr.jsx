import React, { useState } from "react";
import "../user-components/editDialog.css";
import { post } from "../../utils/httpClient";
import "./styles/addPr.css";

export default function AddPr({ userId, prId }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };


  let newCat;

  const handleConfirm = async () => {
    const title = document.getElementById("prTitle").value;
    const unit = document.getElementById("prUnit").value;

    const newCategory = {
      userid: userId,
      title: title,
      unit: unit,
    };

    try {
      const response = await post(`/newCategory`, newCategory);
      // console.log("Category added:", response);
      newCat = response;
      // console.log("New Cat:", newCat);
      //   handleClose();
    } catch (error) {
      console.error("Error adding category:", error);
      // Handle error appropriately
    }

    const date = document.getElementById("recDate").value;
    const metric = document.getElementById("recMetric").value;
    const note = document.getElementById("recNote").value;

    const newRec = {
        prid: newCat.prid,
        prdate: date,
        metric: metric,
        note: note
    }

    // console.log("newRec:", newRec);
    try {
        const response = await post(`/newRecord`, newRec);
        // console.log("Record added:", response);
        handleClose();
      } catch (error) {
        console.error("Error adding record:", error);
        // Handle error appropriately
      }
  };

  return (
    <>
      {isOpen && (
        <div>
          <dialog id="addPr" open>
            <h3 id="header3">Add New Personal Record Category</h3>

            <div id="add_pr">
              <h5 className="pr_header5" style={{ paddingLeft: "45px" }}>
                Title:
              </h5>
              <input type="text" id="prTitle" />
            </div>
            <div id="add_pr">
              <h5 className="pr_header5">Unit of Measurement:</h5>
              <input type="text" id="prUnit" />
            </div>

            <div className="first_rec">
              <h4 className="pr_header4">Add the First Record</h4>
              <div id="add_recDate">
                <label>Record Date:</label>
                <input type="date" id="recDate" />
              </div>

              <div id="add_recMetric">
                <label>Record Metric:</label>
                <input type="number" id="recMetric" />
              </div>

              <div id="add_recNote">
                <label>Note:</label>
                <input type="text" id="recNote" />
              </div>
            </div>

            <div className="buttons">
              <button className="pr_button" onClick={handleConfirm}>
                Add
              </button>
              <button className="pr_button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
