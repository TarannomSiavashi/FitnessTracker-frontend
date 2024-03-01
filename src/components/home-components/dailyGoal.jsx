import "../home-components/styles/dailyGoal.css";
import DoughnutChart from '../charts/DoughnutChart';

function dailyGoal({goal}){
    return <div className="daily_Container">
        <div id="text">{goal.title}:</div>
        <div id="chartContainer">
        <DoughnutChart goal={goal} />
        </div>

    </div>
}

export default dailyGoal;