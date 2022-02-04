import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ProfileFinder from '../../apis/ProfileFinder';

const BarChart = ({id}) => {

    const [math, setMath] = useState(0);
    const [phy, setPhy] = useState(0);
    const [chem, setChem] = useState(0);
    const [bio, setBio] = useState(0);

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await ProfileFinder.get(`/${id}`);
                if(response.data.data.profile[0].mathscore !== 0){
                    setMath(response.data.data.profile[0].mathscore);
                }
                if(response.data.data.profile[0].physicsscore !== 0){
                    setPhy(response.data.data.profile[0].physicsscore);
                }
                if(response.data.data.profile[0].chemistryscore !== 0){
                    setChem(response.data.data.profile[0].chemistryscore);
                }
                if(response.data.data.profile[0].biologyscore !== 0){
                    setBio(response.data.data.profile[0].biologyscore);
                }
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    
        if(id){
            getData();
        }
    }, [id]);

    // console.log(math)
    // console.log(id)
    

    return (
        <div>
            <Bar
                title='Score'
                data={{
                    labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
                    datasets: [{
                        barPercentage: 0.5,
                        barThickness: 80,
                        maxBarThickness: 80,
                        minBarLength: 2,
                        data: [math, phy, chem, bio],
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
                options={{
                    // indexAxis: 'y',
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
                    },

                    plugins: {
                        legend: {
                          display: false
                        },
                        title: {
                            display: true,
                            text: 'Score'
                        },
                    }
                }}
            />
        </div>
    );
}
 
export default BarChart;