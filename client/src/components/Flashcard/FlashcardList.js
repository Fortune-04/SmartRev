import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const FlashcardList = ({contents,handleDelete}) => {
    return ( 
        <Container>
            <Grid container spacing={3}>
                {contents.map(content => (
                    <Grid item xs={12} md={6} lg={4} key={content.flashcardid} >
                        <Card elevation={3}>
                            <CardHeader
                                action={
                                    <IconButton onClick={() => handleDelete(content.flashcardid)}>
                                        <DeleteOutlinedIcon/>
                                    </IconButton>
                                }
                            />
                            <CardContent>
                                <Typography variant="body" color="textSecondary">
                                    { content.content }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
 
export default FlashcardList;