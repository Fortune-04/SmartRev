import React from 'react';
import { useHistory } from 'react-router';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const Flashcard = () =>{

    let history = useHistory()

    const handleClickMath = () => {
        history.push(`/flashcard/create/mathematics`)
    };

    const handleClickPhys = () => {
        history.push(`/flashcard/create/physics`)
    };

    const handleClickChem = () => {
        history.push(`/flashcard/create/chemistry`)
    };

    const handleClickBio = () => {
        history.push(`/flashcard/create/biology`)
    };
    
    return (

        <Container>
            <Box
                display="flex" 
                height={700} 
            >
                <Box m="auto">
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 345 }} onClick={()=> handleClickMath()}>
                            <CardMedia
                                component="img"
                                height="200"
                                image="math-card-background.jpg"
                                alt="mathematics"
                            />
                            <CardContent >
                                <Box
                                    display="flex"  
                                >
                                    <Box m="auto">
                                        <Typography variant="h5">
                                            Mathematics
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 345 }} onClick={()=> handleClickPhys()}>
                            <CardMedia
                                component="img"
                                height="200"
                                image="physics-card-background.jpg"
                                alt="physics"
                            />
                            <CardContent>
                                <Box
                                    display="flex"  
                                >
                                    <Box m="auto">
                                        <Typography variant="h5">
                                            Physics
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 345 }} onClick={()=> handleClickChem()}>
                            <CardMedia
                                component="img"
                                height="200"
                                image="chem-card-background.png"
                                alt="chemistry"
                            />
                            <CardContent>
                                <Box
                                    display="flex"  
                                >
                                    <Box m="auto">
                                        <Typography variant="h5">
                                            Chemistry
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 345 }} onClick={()=> handleClickBio()}>
                            <CardMedia
                                component="img"
                                height="200"
                                image="biology-card-background.jpg"
                                alt="biology"
                            />
                            <CardContent>
                                <Box
                                    display="flex"  
                                >
                                    <Box m="auto">
                                        <Typography variant="h5">
                                            Biology
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                </Box>
            </Box>
        </Container>
    )

}

export default Flashcard;