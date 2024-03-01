import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import PersonalRecord from "../components/home-components/PersonalRecord";
import AddRecord from "../components/home-components/addRecord";
import "../pages/page-styles/PersonalRecord.css";

function PersonalRecordPage() {
  const { title, userId, prId } = useParams();

  const [showAddDialog, setShowAddDialog] = useState(false);

  const openAddDialog = () => {
    setShowAddDialog(true);
  };

  const closeAddDialog = () => {
    setShowAddDialog(false);
  };

  console.log("PRID:", prId);

  return (
    <div className="recordContainer">
      <h1>{title}</h1>
      {/* <LineChart records={records} /> */}
      <PersonalRecord userId={userId} prId={prId} />
      <div className="prPageRec">
        <button className="newRecord" onClick={openAddDialog}>
          Add New Record
        </button>
       <Link to={`/Home/${userId}`}><button className="newRecord">Back</button></Link>
      </div>

      {showAddDialog && <AddRecord prid={prId} onClose={closeAddDialog} />}
    </div>
  );
}

export default PersonalRecordPage;
