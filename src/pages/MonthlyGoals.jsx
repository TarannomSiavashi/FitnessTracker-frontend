import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "../utils/httpClient";
import ErrorPopup from "../components/error-components/ErrorMessage";
import "./page-styles/MonthlyGoals.css";

export default function MonthlyGoalsPage() {
  const { userId } = useParams();
  const [goals, setGoals] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCloseErrorPopup = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const fetchedGoals = await get(`/monthlys/${userId}`);
        setGoals(fetchedGoals);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchGoals();
  }, [userId]);

  return (
    <div className="MonthlyPage">
      <h1 id="MG_title">Monthly Goals</h1>
      {errorMessage && (
        <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />
      )}
      <div className="all_M_goals">
        {goals.map((goal) => {
          return (
            <Link to={`/MonthlyGoal/${userId}/${goal.monthid}`}>
              <div key={goal.title} className="M_goal">
                <h2 className="M_title">{goal.title}</h2>
              </div>
            </Link>
          );
        })}

        <div className="newM_buttons">
          <Link to={`/newMonthly/${userId}`}>
            <button className="newM_add">Add New Monthly Goal</button>
          </Link>
          <Link to={`/Home/${userId}`}>
            <button className="newM_back">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
