import React, { Component, Fragment } from 'react';
// import {Helmet} from 'react-Helmet';
import {Link} from 'react-router-dom';

class QuizSummary extends Component{

    constructor (props){
        super(props);
        this.state = {
            score: 0,
            numberOfQuest: 0,
            numberOfAnsweredQuest: 0,
            correctAns: 0,
            wrongAns: 0
        };
    }

    componentDidMount (){
        const {state} = this.props.location;
        if(state){
            this.setState({
                score: (state.score/state.numberOfQuest)*100,
                numberOfQuest: state.numberOfQuest,
                numberOfAnsweredQuest: state.numberOfAnsweredQuest,
                correctAns: state.correctAns,
                wrongAns: state.wrongAns
            });
        } 
    }

    render () {
        const { state, score } = this.props.location;
        let stats, remark;

        if (score <= 30){
            remark = 'You need more practice!';
        }else if (score > 30 && score <= 50 ){
            remark = 'Better luck next time!';
        }else if (score > 50 && score <= 70){
            remark = 'You can do better!';
        }else if (score > 70 && score <= 79){
            remark = 'You did great!';
        }else{
            remark = 'Excellent';
        }

        if (state !== undefined){
            stats = (
                <Fragment>
                {/* <div>
                     <span>asd</span>
                </div> */}
                <h1>Quiz has ended</h1>
                <div className="container">
                    <h4>{remark}</h4>
                    <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                    <span className="stat left">Total number of questions:</span>
                    <span className="right">{this.state.numberOfQuest}</span><br/>

                    <span className="stat left">Total number of questions:</span>
                    <span className="right">{this.state.numberOfQuest}</span><br/>

                    <span className="stat left">Total number of questions:</span>
                    <span className="right">{this.state.numberOfQuest}</span><br/>

                    <span className="stat left">Total number of questions:</span>
                    <span className="right">{this.state.numberOfQuest}</span><br/>

                    <span className="stat left">Total number of questions:</span>
                    <span className="right">{this.state.numberOfQuest}</span>
                </div>
                <section>
                    <ul>
                        <li>
                            <Link to ="/main">Back to Home</Link>
                        </li>
                        <li>
                            <Link to ="/quiz">Play Again</Link>
                        </li>
                    </ul>
                </section>
                </Fragment>
                
            );
        }else{
            stats = (
                <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li>
                            <Link to ="/main">Back to Home</Link>
                        </li>
                        <li>
                            <Link to ="/quiz">Take a Quiz</Link>
                        </li>
                    </ul>
                </section>
            );
        }
        return(
            <Fragment>
                {/* <Helmet><Title>Quiz Summary</Title></Helmet> */}
                {/* <Title>Quiz Summary</Title> */}
                {stats}
            </Fragment>
        );
    }
}

export default QuizSummary