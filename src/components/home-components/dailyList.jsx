import { useEffect, useState } from "react";
import { get } from "../../utils/httpClient";
import DailyGoal from "../home-components/dailyGoal";
import ErrorPopup from "../error-components/ErrorMessage";
import { Link } from "react-router-dom";

import "../home-components/styles/dailyList.css";

function dailyList({ userId }) {
  const [dailyGoals, setdailyGoals] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCloseErrorPopup = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await get(`/dailys/${userId}`);
        setdailyGoals(data);
      } catch (error) {
        setErrorMessage("Error in Getting Daily Goals.");
      }
    };

    fetchGoals();
  }, [userId]);

  return (
    <div className="dailyList">
      {errorMessage && (
        <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />
      )}
      <h3 id="dailyListTitle">Daily Goals</h3>
      <div className="charts">
        {dailyGoals.map((goal, index) => (
          <Link to={`/DailyGoal/${userId}/${goal.dayid}`}>
            <div key={index} id="daily_goal_box">
              <DailyGoal goal={goal} />
            </div>
          </Link>
        ))}
      </div>
      <Link to={`/newDaily/${userId}`}><button className="dayButton">Add New Daily Goal</button>
      </Link>
    </div>
  );
}

export default dailyList;
