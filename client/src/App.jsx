import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
// import { ProfileContext, ProfileContextProvider } from './context/ProfileContext';
// import {VideoContext, VideoContextProvider} from './context/VideoContext';
import {VideoContextProvider} from './context/VideoContext';
import Layout from './components/Layout/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import SignUp from "./components/Auth/SignUp";
import SignUpForm from "./components/Auth/SignUpForm";
import Login from "./components/Auth/Login";
import LoginForm from "./components/Auth/LoginForm";
import Home from "./routes/Home";
import Main from "./routes/Main";
import Profile from "./components/Profile/Profile";
import Video from "./components/Video/Video";
import VideoNav from "./components/Video/VideoNav";
import VideoAdd from "./components/Video/VideoAdd";
import Note from "./components/Note/Note";
import NoteUpload from "./components/Note/UploadNote";
import Notes from "./components/Note/Notes"
import Quiz from "./components/Quiz/Quiz";
import QuizAnswer from "./components/Quiz/AnswerQuiz";
import QuizCreate from "./components/Quiz/CreateQuiz";
import QuizSummary from './components/Quiz/QuizSummary';
import Forum from "./components/Forum/Forum";
import ForumCreate from "./components/Forum/CreateForum";
import Flashcard from "./components/Flashcard/Flashcard";
import FlashcardCreate from './components/Flashcard/CreateFlashcard';
import FlashcardView from './components/Flashcard/ViewFlashcard';
import Chat from "./components/Chat/Chat";
import Submission from "./components/Submission/Submission";
import SubList from "./components/Submission/SubList"
import SubCreate from "./components/Submission/CreateSub";
import SubmissionSubmit from "./components/Submission/SubmissionFile";
import SubmissionFile1 from "./components/Submission/SubmissionFile1";
import SubDecs from "./components/Submission/SubDecs";
import Temp from "./Temp";

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
                            <Route exact path="/" component={props => isAuthenticated? <Home {...props} setAuth={setAuth}/> : <Redirect to="/loginform"/>}/>
                            <Route exact path="/main" component={props => isAuthenticated? <Main {...props} setAuth={setAuth}/> : <Redirect to="/loginform"/>}/>
                            <Route exact path="/profile/:id" component={props => isAuthenticated? <Profile {...props} setAuth={setAuth}/> : <Redirect to="/loginform"/>}/>
                            <Route exact path="/video" component={Video}/>
                            {/* <Route exact path="/note" component={NoteUpload}/> */}
                            <Route exact path="/note" component={Notes}/>
                            <Route exact path="/login" render={props => !isAuthenticated? <Login {...props} setAuth={setAuth}/> :<Redirect to="/main"/>}/>
                            <Route exact path="/signup" render={props => !isAuthenticated? <SignUp {...props} setAuth={setAuth}/>:<Redirect to="/loginform"/>}/>
                            <Route exact path="/videonav" component={VideoNav}/>
                            <Route exact path="/videoadd" component={VideoAdd}/>
                            <Route exact path="/quiz" component={Quiz}/>
                            <Route exact path="/quiz/answer" component={QuizAnswer}/>
                            <Route exact path="/quiz/create" component={QuizCreate}/>
                            <Route exact path="/quiz/quizsummary" component={QuizSummary}/>
                            <Route exact path="/forum" component={props => isAuthenticated? <ForumCreate {...props} setAuth={setAuth}/> : <Redirect to="/forum/create"/>}/>
                            <Route exact path="/forum/description" component={Forum}/>
                            <Route exact path="/flashcard" component={Flashcard}/>
                            <Route exact path="/flashcard/create" component={FlashcardCreate}/>
                            <Route exact path="/flashcard/view" component={FlashcardView}/>
                            <Route exact path="/chat" component={Chat}/>
                            <Route exact path="/submission" component={Submission}/>
                            <Route exact path="/submission/subcreate" component={SubCreate}/>
                            <Route exact path="/submission/sublist" component={SubList}/>
                            <Route exact path="/submission/submitfile" component={props => isAuthenticated? <SubmissionSubmit {...props} setAuth={setAuth}/> : <Redirect to="/loginform"/>}/>
                            <Route exact path="/submission/submissionfile" component={SubmissionFile1}/>
                            <Route exact path="/submission/subdecs" component={SubDecs}/>
                        </Layout>
                    </Switch>
                </Router>
            </VideoContextProvider>
        </ThemeProvider>
        // </ProfileContextProvider>
    );
};

export default App;