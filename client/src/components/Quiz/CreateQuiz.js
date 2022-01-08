import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

const CreateQuiz = () =>{

    const classes = useStyles();
    const [questList, setQuestList] = useState([{quest:"", option1:"", option2:"", option3:"", option4:"", answer:""}]);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const body = {questList};
            const response = await fetch(
                "http://localhost:4400/quiz/create",
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

    console.log(questList);

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
                {questList.map((singleQuest, index) => (
                    
                        <Card sx={{ mb: 2, p: 2 }} key={index}>
                            <TextField className={classes.field}
                                
                                label="Question 1"
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
                    Submit
                    </Button>

                </Stack>
            </form>
        </Container>

    )
}

export default CreateQuiz;