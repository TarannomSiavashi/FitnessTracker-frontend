import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get, put } from "../../utils/httpClient";
import ErrorPopup from "../../components/error-components/ErrorMessage";
import "../monthlyGoal-components/MonthlyGoal.css";

export default function MonthlyGoal() {
  const { userId, monthId } = useParams();
  const [goal, setGoal] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCloseErrorPopup = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const fetchedGoal = await get(`/monthlys/${userId}/${monthId}`);
        setGoal(fetchedGoal[0]);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchGoal();
  }, [userId, monthId]);

  const done = async () => {
    try {
      const response = await put(`/monthly/done/${userId}/${monthId}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="monthly_component">
      {errorMessage && (
        <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />
      )}

      <div className="M_titleButton">
        <h1 id="monthlyTitle">{goal.title}</h1>

        <div className="M_buttonsDone">
          <button id="doneButton" onClick={done}>
            Done
          </button>
          <Link to={`/Home/${userId}`}>
            <button id="doneButton">Back</button>
          </Link>
        </div>
      </div>

      <div className="M_goalInfo">
        <div id="month_info">
          <h4>Description: </h4>
          <h5>{goal.description}</h5>
        </div>
        <div id="month_info">
          <h4>Start Date: </h4>
          <h5>{goal.startdate}</h5>
        </div>

        <div id="month_info">
          <h4>Deadline: </h4>
          <h5>{goal.deadline}</h5>
        </div>

        <div id="month_info">
          <h4>Current State: </h4>
          <h5>{goal.status ? "Done" : "In Progress"}</h5>
        </div>
      </div>
    </div>
  );
}
