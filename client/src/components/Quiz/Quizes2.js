import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router";

import question from '../../JSON/questions.json';
import isEmpty from '../../utils/is-empty';

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

const Quizes2 = () => {

    let history = useHistory()

    //Style
    const classes = useStyles();

    //Quiz
    const [questions, setQuestions] = useState(question);
    const [currentQuest, setCurrentQuest] = useState({});
    const [nextQuest, setNextQuest] = useState({});
    const [prevQuest, setPrevQuest] = useState({});
    const [answer, setAnswer] = useState('');
    const [numberOfQuest, setNumberOfQuest] = useState(0);
    const [numberOfAnsweredQuest, setNumberOfAnsweredQuest] = useState(0);
    const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correntAns, setCorrectAns] = useState(0);
    const [wrongAns, setWrongAns] = useState(0);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
    const [time, setTime] = useState({});
    const interval = null

    useEffect(() => {
        displayQuest(currentQuest, nextQuest, prevQuest);
        setNumberOfQuest(questions.length)
        // startTimer();
      
        return () => {
            clearInterval(interval)
        };
    }, []);

    const displayQuest = (currentQuest, nextQuest, prevQuest) => {
        // let currentQuestIndex = curre;
        if(!isEmpty(questions)){
            currentQuest = questions[currentQuestIndex];
            nextQuest = questions[currentQuestIndex + 1];
            prevQuest = questions[currentQuestIndex -1];
            // const answer = currentQuest.answer;
            setCurrentQuest(currentQuest);
            setNextQuest(nextQuest);
            setPrevQuest(prevQuest);
            setAnswer(currentQuest.answer);
            handleDisableButton();

        }
    };

    const handleOptionClick = (e) => {
        if(e.target.value.toLowerCase() === answer.toLowerCase()){
            correctAnswer();
        }else{
            wrongAnswer();
        }
    }

    const handleNextButtonClick = () => {
        if(nextQuest !== undefined){
            setCurrentQuestIndex(currentQuestIndex+1);
            displayQuest(currentQuest, nextQuest, prevQuest);

        }
    };

    const handlePrevButtonClick = () => {
        if(prevQuest !== undefined){
            setCurrentQuestIndex(currentQuestIndex-1);

            displayQuest(currentQuest, nextQuest, prevQuest)

        }
    };

    const handleQuitButtonClick = () => {
        if(window.confirm('Are you sure your want to quit')){
            history.push('/quiz');
        }
    };

    const handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next-button':
                handleNextButtonClick();
                break;
            
            case 'previous-button':
                handlePrevButtonClick();
                break;

            case 'quit-button':
                handleQuitButtonClick();
                break;

            default:
                break;
        }
    };

    const correctAnswer = () => {
        console.log('Correct Answer!');

        setScore(score+1);
        setCorrectAns(correntAns+1);
        setCurrentQuestIndex(currentQuestIndex+1);
        setNumberOfAnsweredQuest(numberOfAnsweredQuest+1);

            if(nextQuest === undefined){
                // endGame();
            } else{
                displayQuest(questions, currentQuest, nextQuest, prevQuest);
            }

    };

    const wrongAnswer = () => {
        console.log('Wrong Answer!');

        setWrongAns(wrongAns+1);
        setCurrentQuestIndex(currentQuestIndex+1);
        setNumberOfAnsweredQuest(numberOfAnsweredQuest+1);

            if(nextQuest === undefined){
                // endGame();
            }else{
                displayQuest(questions, currentQuest, nextQuest, prevQuest);
            }

    };

    const handleDisableButton = () =>{
        if (prevQuest === undefined || currentQuestIndex === 0){
            setPrevButtonDisabled(true);
        }else{
            setPrevButtonDisabled(false);
        }
        if (nextQuest === undefined || currentQuestIndex +1 === numberOfQuest){
            setNextButtonDisabled(true);
        }else{
            setNextButtonDisabled(false);
        }
    }

    console.log(questions)
    console.log(currentQuestIndex)
    console.log(answer)

    return (
        <Container maxWidth="md">
            <Box
                display="flex" 
                height={600} 
                bgcolor="lightblue"
            >
                <Box m="auto">
                <Stack 
                    spacing={2} 
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{mb: 5}}>

                    <Typography> {currentQuestIndex +1}/{numberOfQuest} </Typography>
                    <Typography> 2:30</Typography>
                </Stack>
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                    <Typography> {currentQuest.question}</Typography>
                    </CardContent>
                </Card>
                <Grid container spacing={1}>
                    <Grid item lg={6}>
                        <Button className={classes.button} value={currentQuest.optionA} onClick={handleOptionClick} fullWidth variant="contained">
                            {currentQuest.optionA}
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button className={classes.button} value={currentQuest.optionB} onClick={handleOptionClick} fullWidth variant="contained">
                            {currentQuest.optionB}
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button className={classes.button} value={currentQuest.optionC} onClick={handleOptionClick} fullWidth variant="contained">
                            {currentQuest.optionC}
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <Button className={classes.button} value={currentQuest.optionD} onClick={handleOptionClick} fullWidth variant="contained">
                            {currentQuest.optionD}
                        </Button>
                    </Grid>
                </Grid>
                <Stack 
                    spacing={2} 
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{mt: 10}}>

                    <Button id="previous-button" variant="contained" onClick={handleButtonClick} >
                        Previous
                    </Button> 
                    <Button id="quit-button" variant="contained" color="error" onClick={handleButtonClick}>
                        Quit
                    </Button>
                    <Button id="next-button" variant="contained" onClick={handleButtonClick}>
                        Next
                    </Button>

                </Stack>
                </Box>
            </Box>
        </Container>
    );

}

export default Quizes2;