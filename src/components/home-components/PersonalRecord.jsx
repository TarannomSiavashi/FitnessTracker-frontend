import { useEffect, useState } from "react";
import { get } from "../../utils/httpClient";
import "../home-components/styles/pr.css";
// import LineChart from "../LineChart";
import LineChart from "../charts/LineChart";

function PersonalRecord({ userId, prId }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("RECORDS:", records);

  return (
    <div className="recordsContainer">
      <LineChart records={records} />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Metric ({records[0].unit})</th>
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
