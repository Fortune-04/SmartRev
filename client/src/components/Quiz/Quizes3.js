import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import isEmpty from '../../utils/is-empty';
import QuizFinder from '../../apis/QuizFinder';

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

const Quizes3 = (props) => {

    let history = useHistory()
    const {id} = useParams();

    //Style
    const classes = useStyles();

    //Quiz
    const [questions, setQuestions] = useState([]);
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
    //const [time, setTime] = useState({});
    //const interval = null

    //Color Change
    const [option1, setOption1] = useState('primary')

    //Error Handling
    const [toUpdate, setToUpdate] = useState(false);
    const [start, setStart] = useState(false);
    const [response, setResponse] = useState();

    useEffect(() => {
        // var response=null
        const fetchQuest = async () => {
            try {
                // response = await QuizFinder.get(`/question/${id}`)
                setResponse(await QuizFinder.get(`/question/${id}`))
                // setNumberOfQuest(response.data.data.question.length)
                // setQuestions(response.data.data.question)
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }

        if(id){
            fetchQuest();
            // if(response !== null){
            //     setToUpdate(true);
            //     console.log("masuk if response")
            // }
        }
    }, [id]);

    useEffect(() => {
        if(response){
            setNumberOfQuest(response.data.data.question.length)
            setQuestions(response.data.data.question)
            setToUpdate(true);
        }
        
    }, [response]);
    

    useEffect(() => {
        console.log("ques length = ",questions.length === numberOfQuest)
        console.log("to update = ",toUpdate === true)
        if(questions.length === numberOfQuest && toUpdate === true){
            setCurrentQuest(questions[currentQuestIndex]);
            setNextQuest(questions[currentQuestIndex + 1]);
            setPrevQuest(questions[currentQuestIndex -1]);
            setAnswer(questions[currentQuestIndex].answer)
            console.log("masuk effect")
            // setRender(true)
            // displayQuest();
            // setNumberOfQuest(questions.length)
            // startTimer();
        }

        // if(questions && toUpdate === true){
        //     currentQuest = questions[currentQuestIndex];
        //     nextQuest = questions[currentQuestIndex + 1];
        //     prevQuest = questions[currentQuestIndex -1];
        //     const curAnswer = currentQuest.answer;
        //     setAnswer(curAnswer);
        // }
      
        // return () => {
        //     clearInterval(interval)
        // };
    }, [questions, toUpdate]);
    
    // useEffect(() => {
    //   setAnswer(currentQuest.answer)
    // }, [currentQuest]);
    

    const displayQuest = () => {
        // console.log(questions)
        // let currentQuestIndex = curre;
        // if(!isEmpty(questions)){
        //     currentQuest = questions[currentQuestIndex];
        //     nextQuest = questions[currentQuestIndex + 1];
        //     prevQuest = questions[currentQuestIndex -1];
        //     // const answer = currentQuest.answer;
        //     setCurrentQuest(currentQuest);
        //     setNextQuest(nextQuest);
        //     setPrevQuest(prevQuest);
        //     setAnswer(currentQuest.answer);
        //     handleDisableButton();

        // }

        // if(questions){
        //     currentQuest = questions[currentQuestIndex];
        //     nextQuest = questions[currentQuestIndex + 1];
        //     prevQuest = questions[currentQuestIndex -1];
        //     const answer = currentQuest.answer;
        //     setCurrentQuest(currentQuest);
        //     setNextQuest(nextQuest);
        //     setPrevQuest(prevQuest);
        //     setAnswer(answer);
        //     handleDisableButton();
        //     console.log(currentQuest)
        // }

        // if(questions){
            // currentQuest = questions[currentQuestIndex];
            // nextQuest = questions[currentQuestIndex + 1];
            // prevQuest = questions[currentQuestIndex -1];
            // const answer = currentQuest.answer;
            // setCurrentQuest(questions[currentQuestIndex]);
            setNextQuest(questions[currentQuestIndex+1]);
            setPrevQuest(questions[currentQuestIndex-1]);
            // setAnswer(questions[currentQuestIndex+1].answer);
            handleDisableButton();
            // console.log(questions[currentQuestIndex])
            // console.log(currentQuest)
        // }
    };

    const handleStart = () => {
        setStart(true);
    }

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
            setAnswer(questions[currentQuestIndex+1].answer);
            // displayQuest(questions, currentQuest, nextQuest, prevQuest);
            displayQuest();
        }
    };

    const handlePrevButtonClick = () => {
        if(prevQuest !== undefined){
            setCurrentQuestIndex(currentQuestIndex-1);
            setAnswer(questions[currentQuestIndex-1].answer);
            // displayQuest(questions, currentQuest, nextQuest, prevQuest)
            displayQuest()
        }
    };

    const handleQuitButtonClick = () => {
        if(window.confirm('Are you sure your want to quit')){
            history.push('/quiz');
        }
    };

    const handleSubmitButtonClick = () => {
        setStart(false)
        history.push({ 
            pathname: '/quiz/quizsummary2',
            state: {score}
        });
    }

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

            case 'submit-button':
                handleSubmitButtonClick();
                break;

            default:
                break;
        }
    };

    const correctAnswer = () => {
        console.log('Correct Answer!');

        setScore(score+1);
        // setCorrectAns(correntAns+1);
        // setCurrentQuestIndex(currentQuestIndex+1);
        // setNumberOfAnsweredQuest(numberOfAnsweredQuest+1);

        

            if(nextQuest === undefined){
                endGame();
            } else{
                setAnswer(questions[currentQuestIndex+1].answer);
            }
            // else{
            //     // displayQuest(questions, currentQuest, nextQuest, prevQuest);
            //     displayQuest();
            // }

    };

    const wrongAnswer = () => {
        console.log('Wrong Answer!');

        // setWrongAns(wrongAns+1);
        // setCurrentQuestIndex(currentQuestIndex+1);
        // setNumberOfAnsweredQuest(numberOfAnsweredQuest+1);
        

            if(nextQuest === undefined){
                endGame();
            }else{
                setAnswer(questions[currentQuestIndex+1].answer);
            }
            // else{
            //     // displayQuest(questions, currentQuest, nextQuest, prevQuest);
            //     displayQuest();
            // }

    };

    const handleDisableButton = () =>{
        if(prevQuest === undefined || currentQuestIndex === 0){
            setPrevButtonDisabled(true);
        }else{
            setPrevButtonDisabled(false);
        }
        if(nextQuest === undefined || currentQuestIndex +1 === numberOfQuest){
            setNextButtonDisabled(true);
        }else{
            setNextButtonDisabled(false);
        }
    }

    const endGame = () => {
        alert('Quiz has ended!');
        setStart(false)
        // const playerStats ={
        //     score: state.score,
        //     numberOfQuest: state.numberOfQuest,
        //     numberOfAnsweredQuest: state.numberOfAnsweredQuest,
        //     correctAnswer: state.correctAns,
        //     wrongAns: state.wrongAns
        // };
        // console.log(playerStats);
        // setTimeout(() => {
            history.push({ 
                pathname: '/quiz/quizsummary2',
                state: {score}
            });
        // }, 1000)
    }

    // console.log("answer2 =",questions[currentQuestIndex].answer)
    // console.log(currentQuest)
    // // console.log(questions.length)
    // console.log("answer = ",answer)
    // console.log("Current Index = ", currentQuestIndex)
    // console.log("Number of question = ", numberOfQuest)
    console.log(score)
    // console.log(nextQuest);

    // return (
    //     <Container maxWidth="md">
    //         {currentQuest && <Box
    //             display="flex" 
    //             height={600} 
    //             bgcolor="lightblue"
    //         >
    //             <Box m="auto">
    //             <Stack 
    //                 spacing={2} 
    //                 direction="row"
    //                 justifyContent="space-between"
    //                 alignItems="center"
    //                 sx={{mb: 5}}>

    //                 <Typography> {currentQuestIndex +1}/{numberOfQuest} </Typography>
    //                 <Typography> 2:30</Typography>
    //             </Stack>
    //             <Card className={classes.card} variant="outlined">
    //                 <CardContent>
    //                 <Typography> {currentQuest.quest}</Typography>
    //                 </CardContent>
    //             </Card>
    //             <Grid container spacing={1}>
    //                 <Grid item lg={6}>
    //                     <Button className={classes.button} value={currentQuest.option1} onClick={handleOptionClick} fullWidth variant="contained">
    //                         {currentQuest.option1}
    //                     </Button>
    //                 </Grid>
    //                 <Grid item lg={6}>
    //                     <Button className={classes.button} value={currentQuest.option2} onClick={handleOptionClick} fullWidth variant="contained">
    //                         {currentQuest.option2}
    //                     </Button>
    //                 </Grid>
    //                 <Grid item lg={6}>
    //                     <Button className={classes.button} value={currentQuest.option3} onClick={handleOptionClick} fullWidth variant="contained">
    //                         {currentQuest.option3}
    //                     </Button>
    //                 </Grid>
    //                 <Grid item lg={6}>
    //                     <Button className={classes.button} value={currentQuest.option4} onClick={handleOptionClick} fullWidth variant="contained">
    //                         {currentQuest.option4}
    //                     </Button>
    //                 </Grid>
    //             </Grid>
    //             <Stack 
    //                 spacing={2} 
    //                 direction="row"
    //                 justifyContent="space-between"
    //                 alignItems="center"
    //                 sx={{mt: 10}}>

    //                 <Button id="previous-button" variant="contained" onClick={handleButtonClick} >
    //                     Previous
    //                 </Button> 
    //                 <Button id="quit-button" variant="contained" color="error" onClick={handleButtonClick}>
    //                     Quit
    //                 </Button>
    //                 <Button id="next-button" variant="contained" onClick={handleButtonClick}>
    //                     Next
    //                 </Button>

    //             </Stack>
    //             </Box>
    //         </Box>}
            
    //     </Container>
    // );

    if(start === false){
        return(
            <>
                <Button onClick={handleStart}>Start</Button>
            </>
        )
    }else if(start === true){
        // console.log(currentQuest)
        // console.log(questions.length)
        console.log("answer = ",answer)
        console.log("Current Index = ", currentQuestIndex)
        console.log("Number of question = ", numberOfQuest)
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
                        <Typography> {questions[currentQuestIndex].quest}</Typography>
                        </CardContent>
                    </Card>
                    <Grid container spacing={1}>
                        <Grid item lg={6}>
                            <Button className={classes.button} value={questions[currentQuestIndex].option1} onClick={handleOptionClick} fullWidth variant="contained">
                                {questions[currentQuestIndex].option1}
                            </Button>
                        </Grid>
                        <Grid item lg={6}>
                            <Button className={classes.button} value={questions[currentQuestIndex].option2} onClick={handleOptionClick} fullWidth variant="contained">
                                {questions[currentQuestIndex].option2}
                            </Button>
                        </Grid>
                        <Grid item lg={6}>
                            <Button className={classes.button} value={questions[currentQuestIndex].option3} onClick={handleOptionClick} fullWidth variant="contained">
                                {questions[currentQuestIndex].option3}
                            </Button>
                        </Grid>
                        <Grid item lg={6}>
                            <Button className={classes.button} value={questions[currentQuestIndex].option4} onClick={handleOptionClick} fullWidth variant="contained">
                                {questions[currentQuestIndex].option4}
                            </Button>
                        </Grid>
                    </Grid>
                    <Stack 
                        spacing={2} 
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{mt: 10}}>
    
                        {/* <Button id="previous-button" variant="contained" onClick={handleButtonClick} disabled={prevButtonDisabled} >
                            Previous
                        </Button>  */}
                        <Button id="quit-button" variant="contained" color="error" onClick={handleButtonClick}>
                            Quit
                        </Button>
                        {/* <Button id="submit-button" variant="contained" color="success" onClick={handleButtonClick}>
                            Submit
                        </Button> */}
                        <Button id="next-button" variant="contained" onClick={handleButtonClick} disabled={nextButtonDisabled}>
                            Next
                        </Button>
                    </Stack>
                    </Box>
                </Box>
            </Container>
        );
    }
    

    // return(
    //     <>
    //     {questions && questions.map(question => (
    //         <div>{question.quest}</div>
    //     ))}
    //     </>
    // );

}

export default Quizes3;