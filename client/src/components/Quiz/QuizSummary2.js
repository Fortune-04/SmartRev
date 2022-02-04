import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import ProfileFinder from '../../apis/ProfileFinder';

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
import Link from '@mui/material/Link';


const QuizSummary2 = (props) => {

    //Data
    const [id, setId] = useState();

    //Output
    const location = useLocation();
    const [prevMark, setPrevMark] = useState(0);
    const [newMark, setNewMark] = useState(0);
    const [mark, setMark] = useState(0);
    const [remark, setRemark] = useState('')
    const score = location.state.score;
    const numberOfQuestion = location.state.numberOfQuestion;
    const subject = location.state.subject

    useEffect(() => {
        if(score){

            if(score === 0){
                setNewMark(0);
            } else {
                setNewMark((score/numberOfQuestion) *100)
            }
            
        }
    }, [score]);

    useEffect(() => {
        if(newMark){
            if(newMark == 0){
                setRemark('You need more practice!');
            }
            else if (newMark <= 30){
                setRemark('You need more practice!');
            }else if (newMark > 30 && newMark <= 50 ){
                setRemark('Better luck next time!');
            }else if (newMark > 50 && newMark <= 70){
                setRemark('You can do better!');
            }else if (newMark > 70 && newMark <= 79){
                setRemark('You did great!');
            }else{
                setRemark('Excellent');
            }
        }

    }, [newMark]);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
            });
        
            const parseData = await res.json();
            setId(parseData.data.profile[0].userid);
                if(subject === "mathematics"){
                    if(parseData.data.profile[0].mathscore !== 0){
                        setPrevMark(parseData.data.profile[0].mathscore)
                    }
                }else if(subject === "physics"){
                    if(parseData.data.profile[0].physicsscore !== 0){
                        setPrevMark(parseData.data.profile[0].physicsscore)
                    }
                }else if(subject === "chemistry"){
                    if(parseData.data.profile[0].chemistryscore !== 0){
                        setPrevMark(parseData.data.profile[0].chemistryscore)
                    }
                }else if(subject === "biology"){
                    if(parseData.data.profile[0].biologyscore !== 0){
                        setPrevMark(parseData.data.profile[0].biologyscore)
                    }
                }
    
            } catch (err) {
                console.error(err.message);
            }
        };
        getProfile();
    }, []);

    useEffect(() => {
        if(prevMark && newMark){
            if(prevMark !== 0){
                setMark((prevMark + newMark)/2)
            }else {
                setMark(newMark)
            }
        }
    }, [prevMark, newMark]);

    useEffect(async() => {

        if(mark && id && subject){
            try {
                const response = await ProfileFinder.put(`/update/${id}`, {mark, subject});
            } catch (error) {
                console.log(error)
            }
        }

    }, [mark, id, subject]);

    console.log(prevMark)
    console.log(newMark)
    console.log(mark)

    return (
        <Container maxWidth="md">
            <Box
                display="flex" 
                height={600} 
                // bgcolor="lightblue"
            >
                <Box m="auto">
                    <Card variant="outlined">
                        <Box m="auto" sx={{p:5}}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                            <Typography variant="h2" >{remark}</Typography>
                            <Typography variant="h4" >Score : {newMark}%</Typography>
                            <Link href="/quiz" underline="none"><Button>Take Another Quiz</Button></Link>
                            </Stack>
                        </Box>
                        
                    </Card>
                </Box>
            </Box>
        </Container>
    );
}
 
export default QuizSummary2;