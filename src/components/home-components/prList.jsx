import { useEffect, useState } from "react";
import { get } from "../../utils/httpClient";
import Record from "../home-components/record";
import { Link } from "react-router-dom";

import "../home-components/styles/prlist.css";

function prList({ userId }) {
  const [personalRecords, setPersonalRecords] = useState([]);
  const [records, setRecords] = useState([]);

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
  }, [userId, personalRecords]);

  return (
    <div className="prList">
      {records.map((record, index) => (
        <div key={index}>
          <Link to={`/Records/${personalRecords[index].title}/${userId}/${record.prid}`}>
            <Record record={record} title={personalRecords[index].title} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default prList;
