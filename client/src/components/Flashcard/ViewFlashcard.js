import React, {useState, useEffect} from "react";
import FlashcardFinder from '../../apis/FlashcardFinder';
import Grid from '@mui/material/Grid';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const ViewFlashcard = () => {

    const [list, setList] = useState([]);
    const [content, setContent] = useState();
    const [number, setNumber] = useState(0);

    const handleClickRight = () =>{

        if(number == list.length){
            setNumber(number)
        }else{
            setNumber(number+1);
            setContent(list[number].content);
        }
        return(
            console.log(number)
        )
    }

    const handleClickLeft = () =>{

        if(number == 0){
            setNumber(number)
        }else{
            setNumber(number-1);
            setContent(list[number].content);
        }
        return(
            console.log(number)
        )

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FlashcardFinder.get("/display")
                setList(response.data.data.flashcard)
                setContent(response.data.data.flashcard[0].content)
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    },[]);

    return(
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Grid container spacing={2}>
                <Grid item>
                    <ArrowBackIosOutlinedIcon sx={{ fontSize: 40 }} onClick={handleClickLeft}/>
                </Grid>
                <Grid item>
                    <Card sx={{ minWidth: 250, minHeight: 300 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 17 }}>
                                {content}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <ArrowForwardIosOutlinedIcon sx={{ fontSize: 40 }} onClick={handleClickRight}/>
                </Grid>
            </Grid>
            </Box>
        </Container>
    )
}

export default ViewFlashcard;