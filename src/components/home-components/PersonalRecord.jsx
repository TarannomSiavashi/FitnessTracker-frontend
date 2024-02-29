import { useEffect, useState } from "react";
import { get } from "../../utils/httpClient";
import "../home-components/styles/pr.css";
import LineChart from "../LineChart";

function PersonalRecord({ userId, prId}) {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const fetchedRecords = await get(`/records/${userId}/${prId}`);
        setRecords(fetchedRecords);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, [userId, prId]);

  return (
    <div className="recordsContainer">
      <LineChart records={records} />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Metric (kg)</th>
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
  );
}

export default PersonalRecord;
