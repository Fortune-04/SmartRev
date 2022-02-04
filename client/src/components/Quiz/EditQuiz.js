import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ClassFinder from "../../apis/ClassFinder";
import QuizFinder from "../../apis/QuizFinder";

import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

const EditQuiz = () =>{

    const classes = useStyles();

    //Data
    const [id, setId] = useState();
    const [userclasses, setUserclasses] = useState();
    
    //Input to quiz
    const {qid} = useParams();
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [subject, setSubject] = useState('');
    const [nameclass, setNameclass] = useState('');

    //Input to question
    // const [quizid, setQuizid] = useState();
    const [questList, setQuestList] = useState([]);
    // const [questList, setQuestList] = useState([{quest:"", option1:"", option2:"", option3:"", option4:"", answer:""}]);

    //Error handling
    const [update, setUpdate] = useState(false);
    const [addStatus, setAddStatus] = useState(false);
    const [addNewQuest, setAddNewQuest] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        for (let i = 0; i < userclasses.length; i++) {
            if(userclasses[i].code === code){
                setSubject(userclasses[i].subject)
                setNameclass(userclasses[i].name)
            }
        }

        setUpdate(true);
    };

    const handleQuestAdd = () => {
        setQuestList([...questList, {quest:"", option1:"", option2:"", option3:"", option4:"", answer:""}])
    }

    const handleQuestDel = (index) =>{
        const list = [...questList]
        list.splice(index, 1);
        setQuestList(list)
    };

    const handleFormChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...questList];
        list[index][name] = value;
        setQuestList(list);
    }

    useEffect(() => {
        const getProfile = async () => {
            try {
              const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
              });
        
              const parseData = await res.json();
              setId(parseData.data.profile[0].userid);

            } catch (err) {
              console.error(err.message);
            }
        };
        getProfile();

    }, []);

    useEffect(() => {
        const getInfo = async () => {
          try {
          const response = await ClassFinder.get(`/find/code/${id}`)
          console.log(response)
          setUserclasses(response.data.data.class);
          } catch (err) {
              console.error(err.message);
          }
        };

        if(id){
            getInfo();
        }

    }, [id]);

    useEffect( async () => {
        if(update === true){
            try {
                const response = await QuizFinder.put("/update",{
                    id, title, code, subject, nameclass 
                })
                console.log(response)
                // setQuizid(response.data.data.quiz.quizid);
            } catch (err) {
                console.error(err.message);
            }
            setAddStatus(true);
            setUpdate(false);
        }
    }, [update])

    useEffect( async () => {

        if(addStatus === true){

            try {
                const response = await QuizFinder.delete(`/delete/quest/${qid}`)
                console.log(response);
            } catch (err) {
                console.error(err.message);
            }
            setAddStatus(false);
            setAddNewQuest(true);
        }
        
    },[addStatus]);

    useEffect( async () => {

        if(addNewQuest === true){

            for (let i = 0; i < questList.length; i++){

                try {
                    const quizid = qid;
                    const quest = questList[i];
                    const body = {quizid, quest};
                    const response = await fetch(
                        "http://localhost:4400/quiz/create/question",
                        {
                          method: "POST",
                          headers: {
                            "Content-type": "application/json"
                          },
                          body: JSON.stringify(body)
                        }
                    );
                    console.log(response);
                    
                } catch (err) {
                    console.error(err.message);
                }
            }
            setAddNewQuest(false);
        }
        
    },[addNewQuest]);

    useEffect( async () => {
        
        try {
            const response = await QuizFinder.get(`/edit/${qid}`)
            console.log(response);
            setTitle(response.data.data.quiz[0].title);
            setCode(response.data.data.quiz[0].class);
        } catch (err) {
            console.error(err.message);
        }

        try {
            const response = await QuizFinder.get(`/question/${qid}`)
            console.log(response);

            for(let i=0; i<response.data.data.question.length;i++){
                setQuestList(questList => [...questList, {
                    quest: response.data.data.question[i].quest,
                    option1: response.data.data.question[i].option1, 
                    option2: response.data.data.question[i].option2, 
                    option3: response.data.data.question[i].option3, 
                    option4: response.data.data.question[i].option4, 
                    answer: response.data.data.question[i].answer}]);
            }
            console.log(response.data.data.question.length);
        } catch (err) {
            console.error(err.message);
        }
        
    }, [])

    console.log(questList);
    // console.log(quizid);
    // console.log(title);
    // console.log(code);

    return(
        <Container size="sm">

            
            <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Create Quiz
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Stack direction="row" spacing={2}>
                <TextField className={classes.field}   
                    label="title"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    name="title"
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <FormControl sx={{minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={code}
                    label="Class"
                    onChange={(e) => setCode(e.target.value)}
                    >
                    {userclasses && userclasses.map(userclass => (
                        <MenuItem key={userclass.classid} value={userclass.code}>{userclass.name}</MenuItem>
                    ))}
                    
                    </Select>
                </FormControl>
                </Stack>
                {questList.map((singleQuest, index) => (
                    
                        <Card sx={{ mb: 2, p: 2 }} key={index}>
                            <TextField className={classes.field}
                                
                                label="Question"
                                variant="outlined"
                                color="secondary"
                                multiline
                                rows={2}
                                fullWidth
                                required
                                name="quest"
                                value = {singleQuest.quest}
                                onChange={(e) => handleFormChange(e, index)}
                                sx={{ mb: 2 }}
                            />

                            <TextField className={classes.field}
                                label="Option1" 
                                variant="outlined" 
                                color="secondary" 
                                fullWidth
                                required
                                name="option1"
                                value = {singleQuest.option1}
                                onChange={(e) => handleFormChange(e, index)}
                                sx={{ mb: 2 }}
                            />

                            <TextField className={classes.field}
                                label="Option2" 
                                variant="outlined" 
                                color="secondary" 
                                fullWidth
                                required
                                name="option2"
                                value = {singleQuest.option2}
                                onChange={(e) => handleFormChange(e, index)}
                                sx={{ mb: 2 }}
                            />

                            <TextField className={classes.field}
                                label="Option3" 
                                variant="outlined" 
                                color="secondary" 
                                fullWidth
                                required
                                name="option3"
                                value = {singleQuest.option3}
                                onChange={(e) => handleFormChange(e, index)}
                                sx={{ mb: 2 }}
                            />

                            <TextField className={classes.field}
                                label="Option4" 
                                variant="outlined" 
                                color="secondary" 
                                fullWidth
                                required
                                name="option4"
                                value = {singleQuest.option4}
                                onChange={(e) => handleFormChange(e, index)}
                                sx={{ mb: 2 }}
                            />

                            <TextField className={classes.field}
                                label="Answer" 
                                variant="outlined" 
                                color="secondary" 
                                fullWidth
                                required
                                name="answer"
                                value = {singleQuest.answer}
                                onChange={(e) => handleFormChange(e, index)}
                                sx={{ mb: 2 }}
                            />

                            <Stack direction="row" spacing={2}>

                            {questList.length > 1 && (<Button
                            type="remove" 
                            color="error" 
                            variant="contained" 
                            startIcon={<DeleteTwoToneIcon />}
                            onClick = {() => handleQuestDel(index)}
                            >
                            Delete
                            </Button>)}
                            
                            {/* <Button
                            type="submit" 
                            color="secondary" 
                            variant="contained"
                            >
                            Edit
                            </Button> */}

                            </Stack>
                        </Card>
                        
                ))}

                <Stack direction="row" spacing={2}>

                    <Button
                    color="secondary" 
                    variant="contained"
                    onClick={handleQuestAdd}
                    >
                    Add
                    </Button>

                    <Button
                    type="submit" 
                    color="secondary" 
                    variant="contained"
                    >
                    Update
                    </Button>

                </Stack>
            </form>
        </Container>

    )
}

export default EditQuiz;