import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const MainStudent = ({handleClick,mathCode, phyCode, chemCode, bioCode, math, phy, chem, bio}) => {
    return ( 
    
        <Container>
            <Box
                display="flex" 
                height={700} 
            >
                <Box m="auto">
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Card sx={{ maxWidth: 345 }} onClick={()=> handleClick(mathCode, math)}>
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
                            <Card sx={{ maxWidth: 345 }} onClick={()=> handleClick(phyCode, phy)}>
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
                            <Card sx={{ maxWidth: 345 }} onClick={()=> handleClick(chemCode, chem)}>
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
                            <Card sx={{ maxWidth: 345 }} onClick={()=> handleClick(bioCode, bio)}>
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
    );
}
 
export default MainStudent;