// import React,{useState} from 'react';

// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import { makeStyles } from '@mui/styles';
// import CardContent from '@mui/material/CardContent';
// import Stack from '@mui/material/Stack';

// const useStyles = makeStyles (() => {
//     return{
//         card: {
//             display: 'block',
//             width: '40vw',
//             transitionDuration: '0.3s',
//             height: '5vw',
//             marginBottom: 100
//         },
//         button: {
//             height: '3vw'
//         }
//     }
// })

// const Quizes = (props) => {
//     const classes = useStyles();

//     const [questions, setQuestions] = useState();
//     const [currentQuest, setCurrentQuest] = useState({});
//     const [nextQuest, setNextQuest] = useState({});
//     const [prevQuest, setPrevQuest] = useState({});
//     const [answer, setAnswer] = useState('');
//     const [numberOfQuest, setNumberOfQuest] = useState(0);
//     const [numberOfAnsweredQuest, setNumberOfAnsweredQuest] = useState(0);
//     const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
//     const [score, setScore] = useState(0);
//     const [correntAns, setCorrectAns] = useState(0);
//     const [wrongAns, setWrongAns] = useState(0);
//     const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
//     const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
//     const [time, setTime] = useState({});
//     const interval = null;

//     useEffect(() => {
//       const {questions, currentQuest, nextQuest, prevQuest} = body;
//       displayQuest(questions, currentQuest, nextQuest, prevQuest);
//       startTimer();
    
//       return () => {
//         interval;
//       };
//     }, []);

//     const displayQuest = (questions = quest, currentQuest, nextQuest, prevQuest) => {
//         let currentQuestIndex;
//         if(!isEmpty(quest)){
//             questions = quest;
//             currentQuest = questions[currentQuestIndex];
//             nextQuest = questions[currentQuestIndex + 1];
//             prevQuest = questions[currentQuestIndex -1];
//             const answer = currentQuest.answer;
//             setCurrentQuest(currentQuest);
//             setNextQuest(nextQuest);
//             setPrevQuest(prevQuest);
//             setAnswer(answer);
//             () => {
//                 handleDisableButton();
//             }
//         }
//     }

//     const handleOptionClick = (e) => {
//         if(e.target.value.toLowerCase() === answer.toLowerCase()){
//             correctAnswer();
//         }else{
//             wrongAnswer();
//         }
//     }

//     const handleNextButtonClick = () => {
//         if(nextQuest !== undefined){
//             setCurrentQuestIndex(currentQuestIndex+1);
//             () => {
//                 displayQuest(nextQuest, currentQuest, nextQuest, prevQuest)
//             }
//         }
//     };

//     const handlePrevButtonClick = () => {
//         if(preQuest !== undefined){
//             setCurrentQuestIndex(currentQuestIndex-1);
//             () => {
//                 displayQuest(prevQuest, currentQuest, nextQuest, prevQuest)
//             }
//         }
//     };

//     const handleQuitButtonClick = () => {
//         if(window.confirm('Are you sure your want to quit')){
//             props.history.push('/quiz');
//         }
//     };

//     const handleButtonClick = (e) => {
//         switch (e.target.id) {
//             case 'next-button':
//                 handleNextButtonClick();
//                 break;
            
//             case 'previous-button':
//                 handlePrevButtonClick();
//                 break;

//             case 'quit-button':
//                 handleQuitButtonClick();
//                 break;

//             default:
//                 break;
//         }
//     }
    
//     const correctAnswer = () => {
//         console.log('Correct Answer!');

//         setScore(score+1);
//         setCorrectAns(correntAns+1);
//         setCurrentQuestIndex(currentQuestIndex+1);
//         setNumberOfAnsweredQuest(numberOfAnsweredQuest+1);
//         () => {
//             if(nextQuest === undefined){
//                 endGame();
//             } else{
//                 displayQuest(questions, currentQuest, nextQuest, prevQuest);
//             }
//         }
//     };

//     const wrongAnswer = () => {
//         console.log('Wrong Answer!');

//         setWrongAns(wrongAns+1);
//         setCurrentQuestIndex(currentQuestIndex+1);
//         setNumberOfAnsweredQuest(numberOfAnsweredQuest+1);
//         () => {
//             if(nextQuest === undefined){
//                 endGame();
//             }else{
//                 displayQuest(questions, currentQuest, nextQuest, prevQuest);
//             }
//         }
//     }

//     const startTimer = () =>{
//         const countDownTime = Date.now() + 30000;
//         this.interval = setInterval(() => {
//             const now = new Date();
//             const distance = countDownTime - now;

//             const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
//             const seconds = Math.floor((distance % (1000*60))/1000);

//             if (distance < 0 ){
//                 clearInterval(this.interval);
//                 this.setState({
//                     time: {
//                         minutes: 0,
//                         seconds: 0
//                     }
//                 }, () => {
//                     this.endGame();
//                 });
//             }else {
//                 this.setState({
//                     time: {
//                         minutes,
//                         seconds
//                     }
//                 })
//             }
//         }, 1000); 
//     }

//     const handleDisableButton = () =>{
//         if (prevQuest === undefined || urrentQuestIndex === 0){
//             setPrevButtonDisabled(true);
//         }else{
//             setPrevButtonDisabled(false);
//         }
//         if (nextQuest === undefined || currentQuestIndex +1 === numberOfQuest){
//             setNextButtonDisabled(true);
//         }else{
//             setNextButtonDisabled(false);
//         }
//     }

//     endGame = () => {
//         alert('Quiz has ended!');
//         const {state} = this;
//         const playerStats ={
//             score: state.score,
//             numberOfQuest: state.numberOfQuest,
//             numberOfAnsweredQuest: state.numberOfAnsweredQuest,
//             correctAnswer: state.correctAns,
//             wrongAns: state.wrongAns
//         };
//         console.log(playerStats);
//         setTimeout(() => {
//             this.props.history.push('/quiz/quizsummary',playerStats)
//         }, 1000)
//     }


//     return (
//         <Container maxWidth="md">
//             <Box
//                 display="flex" 
//                 height={600} 
//                 bgcolor="lightblue"
//             >
//                 <Box m="auto">
//                 <Stack 
//                     spacing={2} 
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     sx={{mb: 5}}>

//                     <Typography> 1/12 </Typography>
//                     <Typography> 2:30</Typography>
//                 </Stack>
//                 <Card className={classes.card} variant="outlined">
//                     <CardContent>
//                     <Typography> Question 1</Typography>
//                     </CardContent>
//                 </Card>
//                 <Grid container spacing={1}>
//                     <Grid item lg={6}>
//                         <Button className={classes.button} fullWidth variant="contained">
//                             Answer 1
//                         </Button>
//                     </Grid>
//                     <Grid item lg={6}>
//                         <Button className={classes.button} fullWidth variant="contained">
//                             Answer 2
//                         </Button>
//                     </Grid>
//                     <Grid item lg={6}>
//                         <Button className={classes.button} fullWidth variant="contained">
//                             Answer 3
//                         </Button>
//                     </Grid>
//                     <Grid item lg={6}>
//                         <Button className={classes.button} fullWidth variant="contained">
//                             Answer 4
//                         </Button>
//                     </Grid>
//                 </Grid>
//                 <Stack 
//                     spacing={2} 
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     sx={{mt: 10}}>

//                     <Button variant="contained" >
//                         Previous
//                     </Button> 
//                     <Button variant="contained" color="error">
//                         Quit
//                     </Button>
//                     <Button variant="contained">
//                         Next
//                     </Button>

//                 </Stack>
//                 </Box>
//             </Box>
//         </Container>
//     );
// }
 
// export default Quizes;