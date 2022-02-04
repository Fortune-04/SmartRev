import React, {useState, useEffect} from "react";
import ClassFinder from "../../apis/ClassFinder";
import ProfileFinder from "../../apis/ProfileFinder";

//Material UI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
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

    //Input
    const [code, setCode] = useState();
    const [subject, setSubject] = useState();

    //Modal
    const [open, setOpen] = useState(false);

    //Error handling
    const [errorCode, setErrorCode] = useState(false)
    const [update, setUpdate] = useState(false);

    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ClassFinder.get(`/find/${code}`)
            console.log(response)
            if(response.data.data.class.length !== 0){
                setSubject(response.data.data.class[0].subject);
                setUpdate(true);
            }else{
                setErrorCode(true)
            }
        
        } catch (err) {
            console.error(err.message);
        }

        
    }

    useEffect(() => {
        
        const enterCode = async () => {
            try{
                const updateProfile = await ProfileFinder.put(`/code/${subject}/${id}`,{
                  code,
                })
                
            }catch (err){
                console.log(err)
            }
        }

        if(update === true){
            enterCode();
            setUpdate(false);
            setOpen(true)
        }

    }, [update])

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
                        You have joined a class!
                    </Typography>
                    <Button onClick={handleClose} variant="contained">
                        Ok
                    </Button>
                </Stack>
                </Box>
            </Modal>
            <Box 
                component="form" 
                onSubmit={handleSubmit}
                display="flex"
                height={700}
            >
                <Box m="auto">
                <Card variant="outlined" sx={{p:5}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Enter Your Class Code
                        </Typography>
                    </CardContent>
                    <CardContent>
                    <TextField
                        variant="outlined"
                        autoComplete="off"
                        required
                        fullWidth
                        id="code"
                        label="Code"
                        name="code"
                        value={code}
                        error={errorCode}
                        helperText={errorCode? "Invalid Code": ""}
                        onChange={(e) => {
                            setCode(e.target.value)
                            setErrorCode(false)
                        }}
                    />
                    </CardContent>
                    <CardActions disableSpacing>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mb: 1}}
                        >
                        Enter Class
                    </Button>
                    </CardActions>
                </Card>
                </Box>
            </Box>
        </Container>
    );
}
 
export default ClassTeacher;