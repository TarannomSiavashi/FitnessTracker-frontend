import { useEffect, useState } from "react";
import { get } from "../../utils/httpClient";
import DailyGoal from "../home-components/dailyGoal";
import { Link } from "react-router-dom";

import "../home-components/styles/dailyList.css";

function dailyList({ userId }) {
  const [dailyGoals, setdailyGoals] = useState([]);
  // const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await get(`/dailys/${userId}`);
        setdailyGoals(data);
      } catch (error) {
        console.error("Error fetching daily goals:", error);
      }
    };

    fetchGoals();
  }, [userId]);


  console.log("Goals in list:", dailyGoals);


  return (
    <div className="dailyList">
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
    </div>
  );
}

export default dailyList;
