import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import FlashcardList from './FlashcardList';
import FlashcardFinder from '../../apis/FlashcardFinder';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FlashcardCreate = () => {

    const [contents, setContents] = useState(null);
    const [content, setAnycontents] = useState('');
    const studentid = 1;
    const subject = "Physics";

    const handleDelete = async (flashcardid) => {
        
        await fetch("http://localhost:4400/flashcard/"+ flashcardid, {
        method: 'DELETE'});
        const newContents = contents.filter(content => content.flashcardid !== flashcardid);
        setContents(newContents);
    }

    const onSubmitForm = async (e) => {
        // e.preventDefault()
        try {
            const body = {studentid, subject, content};
            const response = await fetch(
                "http://localhost:4400/flashcard",
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FlashcardFinder.get("/display")
                setContents(response.data.data.flashcard)
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    },[]);

    return (
        <Fragment>
            {/* <Container>
                <h1 className="mt-5 text-center">Create Flashcard</h1>
                <form onSubmit={onSubmitForm}>
                    <TextareaAutosize
                        required
                        value={content}
                        minRows={4}
                        style={{width:300}}
                        onChange={(e) => setAnycontents(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="success">Create Flashcard</Button>
                </form>
            </Container> */}
            <Container component="main" maxWidth="xs">
                {/* <CssBaseline /> */}
                <Box
                sx={{
                    // marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Typography component="h1" variant="h5">
                    Create Flashcard
                </Typography>
                <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
                    {/* <Grid container spacing={2}> */}
                    <Grid item xs={12}>
                        <TextareaAutosize
                        fullWidth
                        required
                        value={content}
                        minRows={4}
                        style={{width:300}}
                        onChange={(e) => setAnycontents(e.target.value)}
                        />
                    </Grid>  
                    {/* </Grid> */}
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 1 }}
                    >
                    Create Flashcard
                    </Button>
                    <Link to="/flashcard/view">
                        <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 4 }}
                        color="secondary"
                        >
                            View
                        </Button>
                    </Link>
                </Box>
                </Box>
            </Container>
            {contents && <FlashcardList contents={contents} handleDelete={handleDelete} />}
        </Fragment>
    );
}
 
export default FlashcardCreate;
