import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import FlashcardList from './FlashcardList';
import FlashcardFinder from '../../apis/FlashcardFinder';

//Material UI
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Stack from '@mui/material/Stack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 300,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const FlashcardCreate = () => {
    
    //Data
    const [userid, setUserid] = useState();
    
    //Output
    const [contents, setContents] = useState(null);
    const [content, setAnycontents] = useState('');
    
    //Other
    const {subject} = useParams();
    const [open, setOpen] = useState(false);

    //To display Flashcard Modal
    const [currentFcIndex, setCurrentFcIndex] = useState(0);
    const [currentFcSelected, setCurrentFcSelected] = useState(null);
    const [showNextButton, setShowNextButton] = useState(true);
    const [showPrevButton, setShowPrevButton] = useState(false);

    //Error Handling
    const [contentError, setContentError] = useState(false);
    const [errorText, setErrorText] = useState(false)
    
    //Modal
    const handleOpen = () => {
        if(contents !==null){
            setOpen(true);
            return 1
        }else {
            return 2
        }
        
    }
    const handleClose = () => setOpen(false);

    const handleNextButton = () => {
        if(currentFcIndex == contents.length-1){
            // Last Flashcard
            // Disable next button
            setShowNextButton(false);
        }else{
            setCurrentFcIndex(currentFcIndex+1);
            setShowNextButton(true);
        }
    }

    const handlePrevButton = () => {
        if(currentFcIndex == 0){
            // Last Flashcard
            // Disable next button
            setShowPrevButton(false);
        }else{
            setCurrentFcIndex(currentFcIndex-1);
            setShowPrevButton(true);
        }
    }

    const handleDelete = async (flashcardid) => {
        
        await fetch("http://localhost:4400/flashcard/"+ flashcardid, {
        method: 'DELETE'});
        const newContents = contents.filter(content => content.flashcardid !== flashcardid);
        setContents(newContents);

    }

    const onSubmitForm = async (e) => {
        

        if(content == ''){
            e.preventDefault()
            setContentError(true)
            setErrorText(true)
        }

        if(content){
            try {
                const body = {userid, subject, content};
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
            // setRender(true);
        }
    }

    useEffect(() => {
        const getProfile = async () => {
            try {
              const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
              });
        
              const parseData = await res.json();
              setUserid(parseData.data.profile[0].userid);

            } catch (err) {
              console.error(err.message);
            }
        };
        getProfile();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FlashcardFinder.get(`/display/${subject}/${userid}`)
                if(response.data.data.flashcard.length !==0){
                    setContents(response.data.data.flashcard)
                }
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }
        if(userid){
            fetchData();
        }
    },[userid]);

    // console.log(showNextButton);
    // console.log(showPrevButton);
    // console.log(contents)
    // console.log(handleOpen());

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
                    {subject.charAt(0).toUpperCase()+subject.slice(1)}
                </Typography>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >  
                    <Box 
                        sx={style} 
                    >
                        <Stack
                            sx={{mt:10}}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}>
                            
                            <IconButton>
                                <ArrowBackIosOutlinedIcon onClick={handlePrevButton} sx={{ fontSize: 40 }}/>
                            </IconButton>
                            {open === true && (
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {contents[currentFcIndex].content}
                                </Typography>)
                            }
                            <IconButton>
                                <ArrowForwardIosOutlinedIcon onClick={handleNextButton} sx={{ fontSize: 40 }}/>
                            </IconButton>
                            
                        </Stack>
                    </Box>
                </Modal>
                <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                        label="Content"
                        fullWidth
                        required
                        value={content}
                        multiline
                        rows={4}
                        style={{width:300}}
                        error={contentError}
                        helperText={errorText? "Empty Field": ""}
                        inputProps={{
                            maxlength: 35
                        }}
                        onChange={(e) => {
                            setAnycontents(e.target.value)
                            setErrorText(false)
                            setContentError(false)
                            }
                        }
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mb: 1 , mt: 1}}
                    >
                    Create Flashcard
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 4 }}
                        color="primary"
                        onClick={handleOpen}
                    >
                        View
                    </Button>
                </Box>
                </Box>
            </Container>
            {contents && <FlashcardList contents={contents} handleDelete={handleDelete} />}
        </Fragment>
    );
}
 
export default FlashcardCreate;
