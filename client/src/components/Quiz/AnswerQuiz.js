import React, { Component } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'

import questions from '../../JSON/questions.json';
import isEmpty from '../../utils/is-empty';
import classnames from 'classnames';
import './Quiz.css';


class Quiz extends Component{
    constructor (props) {
        super(props);
        this.state = {
            questions,
            currentQuest: {},
            nextQuest: {},
            prevQuest: {},
            answer: '',
            numberOfQuest: 0,
            numberOfAnsweredQuest: 0,
            currentQuestIndex: 0,
            score: 0,
            correctAns: 0,
            wrongAns: 0,
            nextButtonDisabled: false,
            prevButtonDisabled: true,
            time: {}
        };
        this.interval = null
    }

    componentDidMount(){
        const {questions, currentQuest, nextQuest, prevQuest} = this.state;
        this.displayQuest(questions, currentQuest, nextQuest, prevQuest)
        this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    displayQuest = (questions = this.state.questions, currentQuest, nextQuest, prevQuest) => {
        let { currentQuestIndex } = this.state;
        if( !isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuest = questions[currentQuestIndex];
            nextQuest = questions[currentQuestIndex + 1];
            prevQuest = questions[currentQuestIndex -1];
            const answer = currentQuest.answer;
            this.setState({
                currentQuest: currentQuest,
                nextQuest,
                prevQuest,
                answer
            }, () =>{
                this.hanldeDisableButton();
            });
        }
    };

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            this.correctAnswer();
        }else {
            this.wrongAnswer();
        }
    }

    handleNextButtonClick = () => {
        if(this.state.nextQuest !== undefined){
            this.setState(prevState => ({
                currentQuestIndex: prevState.currentQuestIndex +1,

            }), () => {
                this.displayQuest(this.state.state, this.state.currentQuest, this.state.nextQuest, this.state.prevQuest);
            });
        }
    };

    handlePrevButtonClick = () => {
        if(this.state.prevQuest !== undefined){
            this.setState(prevState => ({
                currentQuestIndex: prevState.currentQuestIndex -1,

            }), () => {
                this.displayQuest(this.state.state, this.state.currentQuest, this.state.nextQuest, this.state.prevQuest);
            });
        }
    };

    handleQuitButtonClick = () => {
        if(window.confirm('Are you sure your want to quit')){
            this.props.history.push('/main');
        }
    };

    handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next-button':
                this.handleNextButtonClick();
                break;
            
            case 'previous-button':
                this.handlePrevButtonClick();
                break;

            case 'quit-button':
                this.handleQuitButtonClick();
                break;

            default:
                break;
        }
    }

    correctAnswer = () => {
        console.log('Correct Answer!');

        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAns: prevState.correctAns + 1,
            currentQuestIndex: prevState.currentQuestIndex + 1,
            numberOfAnsweredQuest: prevState.numberOfAnsweredQuest + 1
        }), () => {
            if(this.state.nextQuest === undefined){
                this.endGame();
            }else{
                this.displayQuest(this.state.questions, this.state.currentQuest, this.state.nextQuest, this.state.prevQuest);
            }
        });
    }

    wrongAnswer = () => {
        console.log('Wrong Answer!');

        this.setState(prevState => ({
            wrongAns: prevState.wrongAns +1,
            currentQuestIndex: prevState.currentQuestIndex + 1,
            numberOfAnsweredQuest: prevState.numberOfAnsweredQuest +1
        }), ()=>{
            if(this.state.nextQuest === undefined){
                this.endGame();
            }else{
                this.displayQuest(this.state.questions, this.state.currentQuest, this.state.nextQuest, this.state.prevQuest);
            }
        });
    }

    startTimer = () =>{
        const countDownTime = Date.now() + 30000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
            const seconds = Math.floor((distance % (1000*60))/1000);

            if (distance < 0 ){
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            }else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000); 
    }

    hanldeDisableButton = () =>{
        if (this.state.prevQuest === undefined || this.state.currentQuestIndex === 0){
            this.setState({
                prevButtonDisabled: true
            });
        }else{
            this.setState({
                prevButtonDisabled: false
            });
        }
        if (this.state.nextQuest === undefined || this.state.currentQuestIndex +1 === this.state.numberOfQuest){
            this.setState({
                nextButtonDisabled: true
            });
        }else{
            this.setState({
                nextButtonDisabled: false
            });
        }
    }

    endGame = () => {
        alert('Quiz has ended!');
        const {state} = this;
        const playerStats ={
            score: state.score,
            numberOfQuest: state.numberOfQuest,
            numberOfAnsweredQuest: state.numberOfAnsweredQuest,
            correctAnswer: state.correctAns,
            wrongAns: state.wrongAns
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/quiz/quizsummary',playerStats)
        }, 1000)
    }

    render () {
        const {currentQuest, currentQuestIndex, numberOfQuest, time} = this.state;
        return (
            <Box
                display="flex" 
                // direction="column"
                // alignItems="center"
                // justifyContent="center"
                style={{ minHeight: '80vh' }}
            >
                <Box m="auto">
                    <Card sx={{p: 5}}>
                    <div className="questions">
                        <div>
                            <p>
                                <span className="left" style={{float: 'left'}}>{currentQuestIndex +1} of {numberOfQuest}</span>
                                <span className="right">{time.minutes}:{time.seconds}</span>
                            </p>
                        </div>
                        <h5>{currentQuest.question}</h5>
                        <div className="options-container">
                            <p onClick={this.handleOptionClick} className="option">{currentQuest.optionA}</p>
                            <p onClick={this.handleOptionClick} className="option">{currentQuest.optionB}</p>
                        </div>
                        <div className="options-container">
                            <p onClick={this.handleOptionClick} className="option">{currentQuest.optionC}</p>
                            <p onClick={this.handleOptionClick} className="option">{currentQuest.optionD}</p>
                        </div>

                        <Stack spacing={2} direction="row">
                            
                            <Button
                                variant="contained"
                                className={classnames('',{'disable': this.state.prevButtonDisabled})}
                                id="previous-button" 
                                onClick={this.handleButtonClick}>
                                Previous
                            </Button> 
                            <Button
                                variant="contained"
                                className={classnames('',{'disable': this.state.nextButtonDisabled})}
                                id="next-button" 
                                onClick={this.handleButtonClick}>
                                Next
                            </Button>
                            <Button
                                variant="contained" 
                                id="quit-button" 
                                onClick={this.handleButtonClick}>
                                Quit
                            </Button>
                        </Stack>

                    </div>
                    </Card>
                </Box>
            </Box>
        );
    }

}

export default Quiz

