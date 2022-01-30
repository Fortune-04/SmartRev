import React from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = () => {
    return (
        <div>
            <Bar
                data={{
                    labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
                    datasets: [{
                        barPercentage: 0.5,
                        barThickness: 80,
                        maxBarThickness: 80,
                        minBarLength: 2,
                        data: [80, 78, 98, 60],
                        backgroundColor: [
                            'rgba( 255, 0, 0, 0.5)',
                            'rgba( 0, 0, 0, 0.5)',
                            'rgba(97, 70, 46, 0.5)',
                            'rgba(0, 128, 0, 0.5)',
                        ],
                    }]
                }}
                height={400}
                width={1000}
            />
        </div>
    );
}
 
export default BarChart;