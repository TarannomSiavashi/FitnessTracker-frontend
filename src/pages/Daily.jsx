import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import DoughnutChart from "../components/charts/DoughnutChart";
import UpdateDaily from "../components/home-components/updateDaily";
import ErrorPopup from "../components/error-components/ErrorMessage";
import "./page-styles/Daily.css";

function Daily() {
  const { userId, dailyId } = useParams();

  const [goal, setGoal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCloseErrorPopup = () => {
    setErrorMessage("");
  };

  const openUpdateDialog = () => {
    setShowUpdateDialog(true);
  };

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const fetchedGoal = await get(`/daily/${userId}/${dailyId}`);
        setGoal(fetchedGoal[0]);
        setLoading(false);
      } catch (error) {
        setErrorMessage("Error fetching goal.");
      }
    };
    fetchGoal();
  }, [userId, dailyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dailyContainer">
      {errorMessage && (
        <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />
      )}
      <div className="titleButton">
        <h1 id="dailyTitle">{goal.title}</h1>
        <button id="updateButton" onClick={openUpdateDialog}>
          Update
        </button>
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
      {showUpdateDialog && (
        <UpdateDaily userId={userId} goal={goal} onClose={closeUpdateDialog} />
      )}
    </div>
  );
}

export default Daily;
