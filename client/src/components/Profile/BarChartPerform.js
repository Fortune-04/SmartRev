import React from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChartPerform = () => {
    return (
        <div>
            <Bar
                data={{
                    labels: ['Score', 'Contribution', 'Test'],
                    datasets: [{
                        barPercentage: 0.5,
                        barThickness: 80,
                        maxBarThickness: 80,
                        minBarLength: 2,
                        data: [8.0, 7.9, 9.0],
                        backgroundColor: [
                            'rgba( 34, 139, 34, 1)',
                            'rgba(255, 205, 57, 1)',
                            'rgba(97, 70, 46, 1)',
                          ],
                    }]
                }}
                height={400}
                width={1000}
                options={{
                    indexAxis: 'y',
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }}
            />
        </div>
    );
}
 
export default BarChartPerform;