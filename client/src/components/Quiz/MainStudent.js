import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const MainStudent = ({handleClick}) => {
    return ( 
    
    <Grid container spacing={3}>
        <Grid item xs={3}>
            <Card sx={{ maxWidth: 345 }} onClick={()=> handleClick()}>
                <CardMedia
                    component="img"
                    height="200"
                    image="math-card-background.jpg"
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
                    image="physics-card-background.jpg"
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
                    image="chem-card-background.png"
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
                    image="biology-card-background.jpg"
                    alt="biology"
                />
                <CardContent>
                    <Typography variant="h5">
                        Biology
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    </Grid>  );
}
 
export default MainStudent;