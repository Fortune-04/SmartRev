import React, {useState, useEffect} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CreateIcon from '@mui/icons-material/Create';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ClassTeacher = ({id}) => {

    const [code, setCode] = useState();
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');

    //Modal
    const [open, setOpen] = useState(false);

    //Error Handling
    const [nameError, setNameError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [toupdate, setToupdate] = useState(false);

    const handleClose = () => setOpen(false);

    const CodeGen = () => {
        let min = Math.ceil(1000);
        let max = Math.floor(9999);

        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name == '') {
            setNameError(true)
        }
        if (subject == '') {
            setSubjectError(true)
        }
      
        if( name && subject){
            setCode(CodeGen());
            setToupdate(true);
        } 

        
    }

    useEffect(() => {

        const createClass = async () => {
            try{
                const body = {id, name, code, subject};
                const response = await fetch(
                    "http://localhost:4400/class/create",
                    {
                        method: "POST",
                        headers: {
                        "Content-type": "application/json"
                        },
                        body: JSON.stringify(body)
                    }
                );
            } catch(err){
                console.error(err.message);
            }
        }

        if(toupdate === true){
            createClass();
            setToupdate(false);
            setOpen(true)
        }

    }, [code])

    return ( 
        <Container component="main" maxWidth="xs">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Stack 
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography sx={{ mt: 2 }}>
                        You have created a class!
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Your Code : {code}
                    </Typography>
                    <Button onClick={handleClose} variant="contained">
                        Ok
                    </Button>
                </Stack>
                </Box>
            </Modal>
            <Box 
                display="flex" 
                height={700} 
                component="form" 
                onSubmit={handleSubmit}
            >
                <Box m="auto">
                <Card variant="outlined" sx={{p:5}}>
                    <CardContent >
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Create Class
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <TextField
                            variant="outlined"
                            autoComplete="off"
                            required
                            fullWidth
                            id="name"
                            label="Class Name"
                            name="name"
                            value={name}
                            error={nameError}
                            helperText={nameError? "Empty Field": ""}
                            onChange={(e) => {
                                setName(e.target.value)
                                setNameError(false)
                            }}
                        />
                    </CardContent>
                    <CardContent>
                        <FormControl fullWidth required>
                            <InputLabel id="subject">Subject</InputLabel>
                            <Select
                                labelId="subject"
                                id="subject"
                                value={subject}
                                label="Subject"
                                error={subjectError}
                                onChange={(e) => {
                                    setSubject(e.target.value)
                                    setNameError(false)
                                }}
                                >
                                <MenuItem value={"mathematics"}>Mathematics</MenuItem>
                                <MenuItem value={"physics"}>Physics</MenuItem>
                                <MenuItem value={"chemistry"}>Chemistry</MenuItem>
                                <MenuItem value={"biology"}>Biology</MenuItem>
                            </Select>
                        </FormControl>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            startIcon={<CreateIcon />}
                            sx={{ mb: 1}}
                            >
                            Create
                        </Button>
                    </CardActions>
                </Card>
                </Box>
            </Box>
        </Container>
    );
}
 
export default ClassTeacher;