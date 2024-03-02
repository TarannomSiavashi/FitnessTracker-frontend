import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/addDailyGoal.css";
import ErrorPopup from "../error-components/ErrorMessage";
import { post } from "../../utils/httpClient";

export default function addDailyGoal() {
  const { userId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCloseErrorPopup = () => {
    setErrorMessage("");
  };

  const add = async () => {
    const dTitle = document.getElementById("D_title").value;
    const dDesc = document.getElementById("D_desc").value;
    const dMetric = document.getElementById("D_metric").value;
    const dAlarm = document.getElementById("D_alarm").value;
    const dState = 0;

    const newDaily = {
      title: dTitle,
      desc: dDesc,
      metric: dMetric,
      alarm: dAlarm,
      userid: userId,
      status: dState,
    };

    try {
      const response = await post(`/newDaily`, newDaily);
    } catch (error) {
      setErrorMessage("Error in Creating new daily goal");
    }
  };

  return (
    <div className="addDailyContainer">
      {errorMessage && (
        <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />
      )}
      <div className="addDayInfo">
        <h3 id="d_content">Add Daily Goal</h3>
        <div id="day_Info">
          <h4 id="dh4">Title: </h4>
          <input type="text" id="D_title" />
        </div>

        <div id="day_Info">
          <h4 id="dh4">Description: </h4>
          <input type="text" id="D_desc" />
        </div>

        <div id="day_Info">
          <h4 id="dh4">Metric: </h4>
          <input type="number" id="D_metric" />
        </div>

        <div id="day_Info">
          <h4 id="dh4">Set Alarm for: </h4>
          <input type="time" id="D_alarm"></input>
        </div>
        <div className="Dbuttons">
          <button className="D_button" onClick={add}>
            Add
          </button>
          <Link to={`/Home/${userId}`}>
            <button className="D_button">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
