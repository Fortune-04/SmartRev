import React from 'react';
import { useHistory } from 'react-router';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Quiz = () => {

    let history = useHistory()

    const handleClick = () => {
        history.push(`/quiz/quizlist`)
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }} onClick={()=> handleClick()}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="background1.png"
                        alt="mathematics"
                    />
                    <CardContent>
                        <Typography variant="h5">
                            Mathematics
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }} onClick={()=> handleClick()}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="background1.png"
                        alt="physics"
                    />
                    <CardContent>
                        <Typography variant="h5">
                            Physics
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }} onClick={()=> handleClick()}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="background1.png"
                        alt="chemistry"
                    />
                    <CardContent>
                        <Typography variant="h5">
                            Chemistry
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }} onClick={()=> handleClick()}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="background1.png"
                        alt="biology"
                    />
                    <CardContent>
                        <Typography variant="h5">
                            Biology
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid> 
    );
}
 
export default Quiz;