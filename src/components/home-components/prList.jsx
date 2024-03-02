import { useEffect, useState } from "react";
import { get } from "../../utils/httpClient";
import Record from "../home-components/record";
import { Link } from "react-router-dom";
import AddPr from "../home-components/addPr";
import ErrorPopup from "../error-components/ErrorMessage";
import "../home-components/styles/prlist.css";

function prList({ userId }) {
  const [personalRecords, setPersonalRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCloseErrorPopup = () => {
    setErrorMessage("");
  };

  const openAddDialog = () => {
    setShowAddDialog(true);
  };

  const closeAddDialog = () => {
    setShowAddDialog(false);
    setRefresh(true);
  };

  useEffect(() => {
    const fetchPersonalRecords = async () => {
      try {
        const data = await get(`/pr/${userId}`);
        setPersonalRecords(data);
      } catch (error) {
        setErrorMessage("Error in Fetching Personal Records.");
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
        setErrorMessage("Error in Fetching Records.");
      }
    };

    fetchRecords();
  }, [userId, personalRecords, refresh]);

  const refreshList = async () => {
    try {
      const recordPromises = personalRecords.map((pr) =>
        get(`/record/${userId}/${pr.prid}`)
      );
      const fetchedRecords = await Promise.all(recordPromises);
      const flattenedRecords = fetchedRecords.flat();
      setRecords(flattenedRecords);
    } catch (error) {
      setErrorMessage("Error in Fetching Records.");
    }
  };

  useEffect(() => {
    if (refresh) {
      refreshList();
      setRefresh(false);
    }
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return (
    <div className="prList">
      {errorMessage && (
        <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />
      )}
      <h3 id="listTitle">Latest Update on Personal Records</h3>
      {records.map((record, index) => (
        <div key={index}>
          <Link
            to={`/Records/${personalRecords[index].title}/${userId}/${record.prid}`}
          >
            <Record record={record} title={personalRecords[index].title} />
          </Link>
        </div>
      ))}
      <button className="addCategory" onClick={openAddDialog}>
        Add New Personal Record Category
      </button>

      {showAddDialog && <AddPr userId={userId} onClose={closeAddDialog} />}
    </div>
  );
}

export default prList;
