// import { Link, useParams } from "react-router-dom";
// import React, { useState } from 'react';
// import PersonalRecord from "../components/home-components/PersonalRecord";
// import AddRecord from "../components/home-components/addRecord"
// import "../pages/page-styles/PersonalRecord.css";

// function PersonalRecordPage() {
//   const { title, userId, prId } = useParams();

//   const [showAddDialog, setShowAddDialog] = useState(false);

//   const openAddDialog = () => {
//     setShowAddDialog(true);
//   };

//   const closeAddDialog = () => {
//     setShowAddDialog(false);
//   };

//   return (
//     <div className="recordContainer">
//       <h1>{title}</h1>
//       <PersonalRecord userId={userId} prId={prId} />
//       <button className="newRecord" onClick={openAddDialog}>
//         Add New Record
//       </button>

//       {/* {showEditDialog && <AddRecord prid={prId} onClose={closeAddDialog} />} */}
//       {/* <AddRecord prid={prId} onClose={closeAddDialog} /> */}
//       {showAddDialog && <AddRecord prid={prId} onClose={closeAddDialog} />}

//     </div>
//   );
// }

// export default PersonalRecordPage;


import { Link, useParams } from "react-router-dom";
import React, { useState } from 'react';
import PersonalRecord from "../components/home-components/PersonalRecord";
import AddRecord from "../components/home-components/addRecord"
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

  return (
    <div className="recordContainer">
      <h1>{title}</h1>
      <PersonalRecord userId={userId} prId={prId} />
      <button className="newRecord" onClick={openAddDialog}>
        Add New Record
      </button>

      {showAddDialog && <AddRecord prid={prId} onClose={closeAddDialog} />}

    </div>
  );
}

export default PersonalRecordPage;
