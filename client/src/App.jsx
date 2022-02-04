import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
// import { ProfileContext, ProfileContextProvider } from './context/ProfileContext';
// import {VideoContext, VideoContextProvider} from './context/VideoContext';
import {VideoContextProvider} from './context/VideoContext';
import Layout from './components/Layout/Layout';

//Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';

import SignUp from "./components/Auth/SignUp";
import SignUpForm from "./components/Auth/SignUpForm";
import Login from "./components/Auth/Login";
import LoginForm from "./components/Auth/LoginForm";
import Home from "./routes/Home";
import Main from "./routes/Main";
import Profile from "./components/Profile/Profile";
import Video from "./components/Video/Video";
import Videos from "./components/Video/Videos"
import VideoAdd from "./components/Video/VideoAdd";
// import Note from "./components/Note/Note";
// import NoteUpload from "./components/Note/UploadNote";
import Notes from "./components/Note/Notes"
import NoteClass from "./components/Note/ClassNote";
import Quiz from "./components/Quiz/Quiz";
import QuizList from "./components/Quiz/QuizList"
import QuizAnswer from "./components/Quiz/AnswerQuiz";
import QuizCreate from "./components/Quiz/CreateQuiz";
import QuizEdit from './components/Quiz/EditQuiz';
import Quizes from './components/Quiz/Quizes5.js';
import Quizes3 from './components/Quiz/Quizes3';
import Quizes4 from './components/Quiz/Quizes4';
import QuizSummary from './components/Quiz/QuizSummary';
import QuizSummary2 from './components/Quiz/QuizSummary2';
import Forum from './components/Forum/Forum';
import ForumDesc from "./components/Forum/ForumDesc";
import ForumCreateTc from "./components/Forum/CreateForumTc";
import Flashcard from "./components/Flashcard/Flashcard";
import FlashcardCreate from './components/Flashcard/CreateFlashcard';
import FlashcardView from './components/Flashcard/ViewFlashcard';
import Chat from "./components/Chat/Chat";
import Submission from "./components/Submission/Submission";
import SubCreate from "./components/Submission/CreateSub";
import SubListSt from "./components/Submission/SubListSt"
import SubListTc from "./components/Submission/SubListTc";
import SubmissionSubmit from "./components/Submission/SubmissionFile";
import SubmissionFile1 from "./components/Submission/SubmissionFile1";
import SubDecs from "./components/Submission/SubDecs";
import Class from "./components/Class/Class";
// import Temp from "./components/Other/Temp";


const theme = createTheme({
    palette: {
      primary: {
        main: '#0582CA'
      },
      secondary: {
        main: '#64b5f6'
      }
    },
    // typography: {
    //   fontFamily: 'Quicksand',
    //   fontWeightLight: 400,
    //   fontWeightRegular: 500,
    //   fontWeightMedium: 600,
    //   fontWeightBold: 700,
    // }
});

const App = () => {

    const [isAuthenticated, setIsAuthenticated] =useState(false);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

    async function isAuth(){
        try {
            const res = await fetch("http://localhost:4400/verify",{
                method: "GET",
                headers:{token : localStorage.token}
            });

            const parseRes = await res.json();
            // console.log(parseRes);

            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        isAuth();
    },[]);

    return(
        // <ProfileContextProvider>
        <ThemeProvider theme={theme}>
            <VideoContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/loginform" render={props => !isAuthenticated? <LoginForm {...props} setAuth={setAuth}/> :<Redirect to="/profile/:id"/>}/>
                        <Route exact path="/signupform" render={props => !isAuthenticated? <SignUpForm {...props} setAuth={setAuth}/> :<Redirect to="/loginform"/>}/>
                        <Layout setAuth={setAuth}>
                            {/* Authentication */}
                            <Route exact path="/" component={props => isAuthenticated? <Home {...props} setAuth={setAuth}/> : <Redirect to="/loginform"/>}/>
                            <Route exact path="/main" component={props => isAuthenticated? <Main {...props} setAuth={setAuth}/> : <Redirect to="/loginform"/>}/>
                            <Route exact path="/login" render={props => !isAuthenticated? <Login {...props} setAuth={setAuth}/> :<Redirect to="/main"/>}/>
                            <Route exact path="/signup" render={props => !isAuthenticated? <SignUp {...props} setAuth={setAuth}/>:<Redirect to="/loginform"/>}/>

                            {/* Profile */}
                            <Route exact path="/profile/:id" component={props => isAuthenticated? <Profile {...props} setAuth={setAuth}/> : <Redirect to="/loginform"/>}/>

                            {/* Quiz */}
                            <Route exact path="/quiz" component={Quiz}/>
                            <Route exact path="/quiz/quizlist/:code/:sub" component={QuizList}/>
                            <Route exact path="/quiz/answer" component={QuizAnswer}/>
                            <Route exact path="/quiz/create" component={QuizCreate}/>
                            <Route exact path="/quiz/edit/:qid" component={QuizEdit}/>
                            <Route exact path="/quiz/quizsummary" component={QuizSummary}/>
                            <Route exact path="/quiz/quizsummary2" component={QuizSummary2}/>
                            <Route exact path="/quiz/quizes3/:id" component={Quizes3}/>
                            <Route exact path="/quiz/quizes4/:id/:subject" component={Quizes4}/>

                            {/* Flashcard */}
                            <Route exact path="/flashcard" component={Flashcard}/>
                            <Route exact path="/flashcard/create/:subject" component={FlashcardCreate}/>
                            <Route exact path="/flashcard/view" component={FlashcardView}/>

                            {/* Forum */}
                            <Route exact path="/forum" component={Forum}/>
                            <Route exact path="/forum/create" component={ForumCreateTc}/>
                            <Route exact path="/forum/description/:id" component={ForumDesc}/>

                            {/* Video */}
                            <Route exact path="/video" component={Video}/>
                            <Route exact path="/videos" component={Videos}/>
                            <Route exact path="/videoadd" component={VideoAdd}/>
                            
                            {/* Note */}
                            <Route exact path="/note" component={Notes}/>
                            <Route exact path="/note/class/:id/:role/:subject/:classname/:code" component={NoteClass}/>

                            {/* Chat */}
                            <Route exact path="/chat" component={Chat}/>

                            {/* Submission */}
                            <Route exact path="/submission" component={Submission}/>

                            <Route exact path="/submission/sublistst" component={SubListSt}/>
                            <Route exact path="/submission/subdecs/:sid" component={SubDecs}/>

                            <Route exact path="/submission/subcreate" component={SubCreate}/>
                            <Route exact path="/submission/sublisttc/:code" component={SubListTc}/>
                            <Route exact path="/submission/submitfile" component={SubmissionSubmit}/>
                            <Route exact path="/submission/submissionfile" component={SubmissionFile1}/>
                            
                            {/* Class */}
                            <Route exact path="/class" component={Class}/>
                        
                        </Layout>
                    </Switch>
                </Router>
            </VideoContextProvider>
        </ThemeProvider>
        // </ProfileContextProvider>
    );
};

export default App;