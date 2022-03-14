import React, {useState, useEffect} from 'react';
import QuizFinder from '../../apis/QuizFinder';
import { useHistory } from 'react-router';

//Material UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';

const MainTeacher = ({id}) => {

    let history = useHistory();

    //Output
    const [quizes, setQuizes] = useState([]);

    //Delete
    const [qid, setQid] = useState();

    //Error Handling
    const [del, setDel] = useState(false);

    const createQuiz = () => {
        history.push(`/quiz/create`)
    }

    const handleDelete = async (quizid) => {
        await fetch("http://localhost:4400/quiz/delete/quest/"+ quizid, {
        method: 'DELETE'});
        const newQuizes = quizes.filter(quiz => quiz.quizid !== quizid);
        setQuizes(newQuizes);
        setQid(quizid)
        setDel(true);
    }
    
    useEffect(() => {
        
        const fetchQuiz = async () => {
            try {
                const response = await QuizFinder.get(`/display/${id}`)
                setQuizes(response.data.data.quiz)
                // console.log(response)
              } catch (err) {
                console.log(err)
            }
        }

        if(id){
            fetchQuiz();
        }
        
    },[id])

    useEffect(() => {
        
        const deleteQuiz = async () => {
            try {
                const response = await QuizFinder.delete(`/delete/${qid}`)
                // console.log(response)
              } catch (err) {
                console.log(err)
            }
        }

        if(qid && del === true){
            deleteQuiz();
            setDel(false)
        }
        
    },[del])

    // console.log(quizes)
    // console.log(id)

    return ( 
        <Container size="sm">
            <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Quiz List
            </Typography>
            <Divider />
            <Grid container sx={{mt:1}} spacing={2}>
            {quizes && quizes.map(quiz => (
                // <Grid item xs={12} md={6} lg={3} sx={{mt:2}} key={quiz.quizid} >
                <Grid item lg={3} md={3} xs={3} key={quiz.quizid}>
                    <Card elevation={4} >
                        <Link href={`http://localhost:3000/quiz/edit/${quiz.quizid}`}  underline="none">
                        <CardMedia
                            component="img"
                            height="200"
                            image="quizes.jpg"
                            alt="quizes"
                        />
                        <CardContent>
                            <Typography variant="body" color="textSecondary">
                                {quiz.title}
                            </Typography>
                        </CardContent>
                        </Link>
                        <CardActions >
                            <IconButton onClick={() => handleDelete(quiz.quizid)}>
                                <DeleteIcon color="error"/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            </Grid>
            <Button
                color="primary" 
                variant="contained"
                onClick={createQuiz}
                sx={{ mt: 2 }}
                >
                Create Quiz
            </Button>
        </Container>
    );
}
 
export default MainTeacher;