// import { Link, useParams } from "react-router-dom";
// import React, { useState , useEffect} from "react";
// import PersonalRecord from "../components/home-components/PersonalRecord";
// import AddRecord from "../components/home-components/addRecord";
// import "../pages/page-styles/PersonalRecord.css";

// function PersonalRecordPage() {
//   const { title, userId, prId } = useParams();
//   const [showAddDialog, setShowAddDialog] = useState(false);
//   // const [reloadPr, setReloadPr] = useState(false);

//   const openAddDialog = () => {
//     setShowAddDialog(true);
//   };

//   const closeAddDialog = () => {
//     setShowAddDialog(false);
//     // setReloadPr(true);

//   };

//   console.log("PRID:", prId);

//   // const loadPr = async ()=>{
//   //   try {
//   //     const fetchedRecords = await get(`/records/${userId}/${prId}`);
//   //     setRecords(fetchedRecords);
//   //     console.log("record load:", records);
//   //     setReloadPr(false);
//   //   } catch (error) {
//   //     console.error("Error fetching records:", error);
//   //   }
//   // };

//   // useEffect(()=>{
//   //   if(reloadPr){
//   //     loadPr();
//   //     setReloadPr(false);
//   //   }
//   // }, [reloadPr]);

//   return (
//     <div className="personalRecordPage">
//       <div className="recordContainer">
//         <h1>{title}</h1>
//         {/* <LineChart records={records} /> */}
//         <PersonalRecord userId={userId} prId={prId} />
//         <div className="prPageRec">
//           <button className="newRecord" onClick={openAddDialog}>
//             Add New Record
//           </button>
//           <Link to={`/Home/${userId}`}>
//             <button className="newRecord">Back</button>
//           </Link>
//         </div>

//         {showAddDialog && <AddRecord prid={prId} onClose={closeAddDialog} />}
//       </div>
//     </div>
//   );
// }

// export default PersonalRecordPage;

import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddRecord from "../components/home-components/addRecord";
import "../pages/page-styles/PersonalRecord.css";
import LineChart from "../components/charts/LineChart";
import { get } from "../utils/httpClient"


function PersonalRecordPage() {
  const { title, userId, prId } = useParams();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const openAddDialog = () => {
    setShowAddDialog(true);
  };

  const closeAddDialog = () => {
    setShowAddDialog(false);
    setLoading(true);
  };


  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const fetchedRecords = await get(`/records/${userId}/${prId}`);
        setRecords(fetchedRecords);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, [userId, prId]);

  const load = async ()=>{
    try {
      const fetchedRecords = await get(`/records/${userId}/${prId}`);
      setRecords(fetchedRecords);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    if (loading) {
      load();
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="personalRecordPage">
      <div className="recordContainer">
        <h1>{title}</h1>
        <div className="records_Container">
          <LineChart records={records} />
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Metric ({records[0]?.unit})</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td>{record.prdate}</td>
                  <td>{record.metric}</td>
                  <td>{record.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="prPageRec">
          <button className="newRecord" onClick={openAddDialog}>
            Add New Record
          </button>
          <Link to={`/Home/${userId}`}>
            <button className="newRecord">Back</button>
          </Link>
        </div>

        {showAddDialog && <AddRecord prid={prId} onClose={closeAddDialog} />}
      </div>
    </div>
  );
}

export default PersonalRecordPage;
