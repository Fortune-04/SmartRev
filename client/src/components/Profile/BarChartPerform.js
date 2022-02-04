import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import ProfileFinder from '../../apis/ProfileFinder';
// import Chart from 'chart.js/auto';

const BarChartPerform = ({id}) => {

    //Output for score
    const [score, setScore] = useState([]);
    const [displayScore, setDisplayScore] = useState(0);

    //Error handling
    const [toUpdate, setToUpdate] = useState(false);

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await ProfileFinder.get(`/${id}`);

                if(response.data.data.profile[0].mathscore !== 0){
                    setScore(score => [...score, response.data.data.profile[0].mathscore]);
                }
                if(response.data.data.profile[0].physicsscore !== 0){
                    setScore(score => [...score, response.data.data.profile[0].physicsscore] );
                }
                if(response.data.data.profile[0].chemistryscore !== 0){
                    setScore(score => [...score, response.data.data.profile[0].chemistryscore]);
                }
                if(response.data.data.profile[0].biologyscore !== 0){
                    setScore(score => [...score, response.data.data.profile[0].biologyscore]);
                }
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    
        if(id){
            getData();
            setToUpdate(true)
        }
    }, [id]);

    useEffect(() => {
        if(toUpdate === true && score.length === 4){
            let x = 0
            for(let i=0; i < score.length; i++){
                if((i+1) === score.length){
                    x=x+score[i]
                    setDisplayScore((x/(i+1))/10)
                }else{
                    x = x+score[i]
                }
            }
        }
    }, [toUpdate, score]);

    return (
        <div>
            <Bar
                data={{
                    labels: ['Score', 'Contribution', 'Involvement'],
                    datasets: [{
                        barPercentage: 0.5,
                        barThickness: 80,
                        maxBarThickness: 80,
                        minBarLength: 2,
                        data: [displayScore, 7.9, 9.0],
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
                    },
                    plugins: {
                        legend: {
                          display: false
                        },
                        title: {
                            display: true,
                            text: 'Performance'
                        },
                    }
                }}
            />
        </div>
    );
}
 
export default BarChartPerform;