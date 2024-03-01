import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import DoughnutChart from "../components/charts/DoughnutChart";
import UpdateDaily from '../components/home-components/updateDaily'
import "./page-styles/Daily.css";

function Daily() {
  const { userId, dailyId } = useParams();
  console.log("day ID in daily:", dailyId);

  const [goal, setGoal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);


  const openUpdateDialog = () => {
    setShowUpdateDialog(true);
  };

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false);
    // loadUser();
  };

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const fetchedGoal = await get(`/daily/${userId}/${dailyId}`);
        setGoal(fetchedGoal[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };
    fetchGoal();
  }, [userId, dailyId]);

  console.log("Goal in Daily:", goal);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dailyContainer">
      <div className="titleButton">
        <h1 id="dailyTitle">{goal.title}</h1>
        <button id="updateButton" onClick={openUpdateDialog}>Update</button>
      </div>
      <DoughnutChart goal={goal} />

      <div className="goalInfo">
        <div id="day_info">
          <h4>Description: </h4>
          <h5>{goal.description}</h5>
        </div>
        <div id="day_info">
          <h4>Metric: </h4>
          <h5>{goal.metric}</h5>
        </div>

        <div id="day_info">
          <h4>Alarm is Set for: </h4>
          <h5>{goal.alarmtime}</h5>
        </div>

        <div id="day_info">
          <h4>Current State: </h4>
          <h5>{goal.status}</h5>
        </div>
      </div>
      {showUpdateDialog && <UpdateDaily userId={userId} goal={goal} onClose={closeUpdateDialog} />}

    </div>
  );
}

export default Daily;
