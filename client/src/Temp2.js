//Temp2 for notes
import React, { useState, useEffect } from 'react';
import ClassFinder from './apis/ClassFinder';

//Material UI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

const Temp2 = ({id}) => {

    //Data
    const [userclasses, setUserclasses] = useState();

    useEffect(() => {

        const getInfo = async () => {
          try {
          const response = await ClassFinder.get(`/find/code/${id}`)
          setUserclasses(response.data.data.class);
          } catch (err) {
              console.error(err.message);
          }
        };
    
        if(id){
          getInfo();
        }
    
    }, [id]);

    return (
        <Container size="sm">
            <Grid container spacing={3}>
                {userclasses && userclasses.map(userclass => (
                    <Grid item xs={3}>
                    <Link href={`http://localhost:3000/note/classtc/${userclass.code}`} underline="none">
                    <Card key={userclass.classid} sx={{ maxWidth: 345 }} >
                        <CardMedia
                            component="img"
                            height="200"
                            image="math-card-background.jpg"
                            alt="mathematics"
                        />
                        <CardContent>
                            <Typography variant="h5">
                                {userclass.name}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
 
export default Temp2;