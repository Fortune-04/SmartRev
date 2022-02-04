import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import QuizFinder from '../../apis/QuizFinder';
import { useLocation } from "react-router-dom";

//Material UI
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles (() => {
    return{
        card: {
            display: 'block',
            width: '40vw',
            transitionDuration: '0.3s',
            height: '5vw',
            marginBottom: 100
        },
        button: {
            height: '3vw'
        }
    }
})

const Quizes3 = () => {

    let history = useHistory()
    const {id, subject} = useParams();

    //Style
    const classes = useStyles();

    //Questions
    const [questions, setQuestions] = useState([]);
    const [numberOfQuestion, setNumberOfQuestion] = useState(0);

    //Error Handling
    const [response, setResponse] = useState();
    const [toUpdate, setToUpdate] = useState(false);

    //Disable button
    // const [button1, setButton1] = useState(false)
    // const [button2, setButton2] = useState(false)
    // const [button3, setButton3] = useState(false)
    // const [button4, setButton4] = useState(false)

    //Quiz
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)

    useEffect(() => {
        const fetchQuest = async () => {
            try {

                setResponse(await QuizFinder.get(`/question/${id}`))
                console.log(response)
            }catch (err) {
                console.log(err)
            }
        }

        if(id){
            fetchQuest();
        }

    }, [id]);

    useEffect(() => {
        if(response){
            setNumberOfQuestion(response.data.data.question.length)
            setQuestions(response.data.data.question)
            setToUpdate(true);
        }

    }, [response]);

    const validateAnswer = (selectedOption) => {
        let correct_option = questions[currentQuestionIndex]['answer'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        // setIsOptionsDisabled(true);
        // if(questions[currentQuestionIndex]?.option1 !== correctOption && questions[currentQuestionIndex]?.option1 !== currentOptionSelected){
        //     setButton1(true);
        // }
        // if(questions[currentQuestionIndex]?.option2 !== correctOption && questions[currentQuestionIndex]?.option2 !== currentOptionSelected){
        //     setButton2(true);
        // }
        // if(questions[currentQuestionIndex]?.option3 !== correctOption && questions[currentQuestionIndex]?.option3 !== currentOptionSelected){
        //     setButton3(true);
        // }
        // if(questions[currentQuestionIndex]?.option4 !== correctOption && questions[currentQuestionIndex]?.option4 !== currentOptionSelected){
        //     setButton4(true);
        // }
        
        if(selectedOption==correct_option){
            // Set Score
            setScore(score+1)
        }
        // Show Next Button
        setShowNextButton(true)
    }

    const handleNext = () => {
        if(currentQuestionIndex== questions.length-1){
            // Last Question
            // Show Score Modal
            history.push({ 
                pathname: '/quiz/quizsummary2',
                state: {score, numberOfQuestion, subject}
            });
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
            // setButton1(false);
            // setButton2(false);
            // setButton3(false);
            // setButton4(false);
        }
        // Animated.timing(progress, {
        //     toValue: currentQuestionIndex+1,
        //     duration: 1000,
        //     useNativeDriver: false
        // }).start();
    }

    const handleButtonQuit = () => {
        if(window.confirm('Are you sure your want to quit')){
            history.push('/quiz');
        }
    };

    const renderQuestion = () => {
        return (
            <>
                <Stack 
                    spacing={2} 
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{mb: 5}}>

                    <Typography> {currentQuestionIndex+1}/{questions.length} </Typography>
                    {/* <Typography> 2:30</Typography> */}
                </Stack>
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                    <Typography> {questions[currentQuestionIndex]?.quest}</Typography>
                    </CardContent>
                </Card>
            </>
        )
    }

    const renderOptions = () => {
        return (
           <>
                <Grid container spacing={1}>
                    <Grid item lg={6}>
                        <Button 
                            className={classes.button} 
                            //value={questions[currentQuestIndex].option1} 
                            onClick={()=> validateAnswer(questions[currentQuestionIndex]?.option1)} 
                            fullWidth 
                            variant="contained"
                            // disabled={isOptionsDisabled}
                            // disabled={button1}
                            color={
                                questions[currentQuestionIndex]?.option1==correctOption? "success"
                                : questions[currentQuestionIndex]?.option1==currentOptionSelected? "error"
                                : "primary"
                            }
                        >
                            {questions[currentQuestionIndex]?.option1}
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button 
                            className={classes.button} 
                            //value={questions[currentQuestIndex].option2} 
                            onClick={()=> validateAnswer(questions[currentQuestionIndex]?.option2)} 
                            fullWidth 
                            variant="contained"
                            // disabled={isOptionsDisabled}
                            // disabled={button2}
                            color={
                                questions[currentQuestionIndex]?.option2==correctOption? "success"
                                : questions[currentQuestionIndex]?.option2==currentOptionSelected? "error"
                                : "primary"
                            }
                        >
                            {questions[currentQuestionIndex]?.option2}
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button 
                            className={classes.button} 
                            //value={questions[currentQuestIndex].option3} 
                            onClick={()=> validateAnswer(questions[currentQuestionIndex]?.option3)} 
                            fullWidth 
                            variant="contained"
                            // disabled={isOptionsDisabled}
                            // disabled={button3}
                            color={
                                questions[currentQuestionIndex]?.option3==correctOption? "success"
                                : questions[currentQuestionIndex]?.option3==currentOptionSelected? "error"
                                : "primary"
                            }
                        >
                            {questions[currentQuestionIndex]?.option3}
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button 
                            className={classes.button} 
                            //value={questions[currentQuestIndex].option4} 
                            onClick={()=> validateAnswer(questions[currentQuestionIndex]?.option4)} 
                            fullWidth 
                            variant="contained"
                            // disabled={isOptionsDisabled}
                            // disabled={button4}
                            color={
                                questions[currentQuestionIndex]?.option4==correctOption? "success"
                                : questions[currentQuestionIndex]?.option4==currentOptionSelected? "error"
                                : "primary"
                            }
                        >
                            {questions[currentQuestionIndex]?.option4}
                        </Button>
                    </Grid>
                </Grid>
           </>
        )
    }

    const renderNextButton = () => {
        if(showNextButton){
            return (
                <>
                    <Button 
                        variant="contained" 
                        onClick={handleNext} 
                    >
                            Next
                    </Button>
                </>
            )
        }else{
            return null
        }
    }

    console.log(score)

    return(
        <>
        {/* ProgressBar */}
        {/* renderProgressBar() */}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

        <Button variant="contained" color="error" onClick={handleButtonQuit}>
            Quit
        </Button>
        </>
    )
}

export default Quizes3;