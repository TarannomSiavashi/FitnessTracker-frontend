import './DoughnutChart.css'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import {Doughnut} from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)


export default function doughnutChart({goal}){
    if (!goal) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: ['Obtained', 'Way to go'],
        datasets: [{
            label: goal.title,
            data: [goal.status, goal.metric-goal.status],
            backgroundColor: ['#660708','#161A1D'],
            borderColor: ['#660708','#161A1D'],
        }]
    };

    const options = {

    };

    return(
        <div className='doughnutChart'>
            <Doughnut data={data} options={options} />
        </div>
    )
}