import { useEffect, useState } from "react";
import { get } from "../../utils/httpClient";
import Record from "../home-components/record";
import { Link } from "react-router-dom";
import AddPr from '../home-components/addPr'
import "../home-components/styles/prlist.css";

function prList({ userId }) {
  const [personalRecords, setPersonalRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [showAddDialog, setShowAddDialog] = useState(false);

  const openAddDialog = () => {
    setShowAddDialog(true);
  };

  const closeAddDialog = () => {
    setShowAddDialog(false);
  };


  useEffect(() => {
    const fetchPersonalRecords = async () => {
      try {
        const data = await get(`/pr/${userId}`);
        setPersonalRecords(data);
      } catch (error) {
        console.error("Error fetching personal records:", error);
      }
    };

    fetchPersonalRecords();
  }, [userId]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recordPromises = personalRecords.map((pr) =>
          get(`/record/${userId}/${pr.prid}`)
        );
        const fetchedRecords = await Promise.all(recordPromises);
        const flattenedRecords = fetchedRecords.flat();
        setRecords(flattenedRecords);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, [userId, personalRecords, refresh]);

  const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh); // Toggle refresh state
  };

  console.log(records);

  return (
    <div className="prList">
      <h3 id="listTitle">Latest Update on Personal Records</h3>
      {records.map((record, index) => (
        <div key={index}>
          <Link to={`/Records/${personalRecords[index].title}/${userId}/${record.prid}`}>
            <Record record={record} title={personalRecords[index].title} />
          </Link>
        </div>
      ))}
      <button className="addCategory" onClick={openAddDialog}>Add New Personal Record Category</button>

      {showAddDialog && <AddPr userId={userId} onClose={closeAddDialog} onRefresh={handleRefresh}/>}
    </div>
  );
}

export default prList;
