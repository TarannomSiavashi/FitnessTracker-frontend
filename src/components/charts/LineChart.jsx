import {
    Chart as ChartJS,
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import {Line} from 'react-chartjs-2';
import { formatISO } from 'date-fns';
import "./LineChart.css";


ChartJS.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function LineChart({records}){
    if (records.length === 0) {
        return <div>Loading...</div>;
    }

    const dates = records.map((record) => formatISO(new Date(record.prdate)));
    const data = {
        labels: dates,
        datasets:[
            {
                label: "Metric",
                data: records.map((record)=>record.metric),
                backgroundColor: '#E5383B',
                borderColor: '#660708',
                tension: 0.4
            }
        ]
    };

    const options = {
        scales:{
            x:{
                type: 'time',
                time: {
                  unit: 'day'  
                }
            },
            y:{
                beginsAtZero: true
            }
        }
    }; 

    return(
        <div className='lineChart'>
            <Line data={data} options={options} />
        </div>
    )
}