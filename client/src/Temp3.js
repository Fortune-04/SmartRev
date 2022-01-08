import React, {useState, useEffect} from 'react';
import QuizFinder from './apis/QuizFinder';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Temp3 = () => {

    const [quizes, setQuizes] = useState();
    
    useEffect(() => {
        
        const fetchQuiz = async () => {
            try {
                const response = await QuizFinder.get("/display")
                setQuizes(response.data.data.quiz[0].question.questList)
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }

        fetchQuiz();

    },[])

    console.log(quizes)

    return ( 
        <>
        {/* {quizes && quizes.map(quiz => (
                    <Grid item xs={12} md={6} lg={4} key={quiz.question} >
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="body" color="textSecondary">
                                    { quiz.option1 }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))} */}
                <div>{}</div>
        </>
    );
}
 
export default Temp3;