import React, {useState, useEffect} from "react";
import ClassFinder from "../../apis/ClassFinder";
import ProfileFinder from "../../apis/ProfileFinder";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

const ClassTeacher = ({id}) => {

    const [code, setCode] = useState();
    const [subject, setSubject] = useState();
    const [update, setUpdate] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ClassFinder.get(`/find/${code}`)
            console.log(response)
            setSubject(response.data.data.class[0].subject);

        } catch (err) {
            console.error(err.message);
        }

        setUpdate(true);
    }
    console.log(subject);

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
        }

    }, [update])

    return ( 
        <Container component="main" maxWidth="xs">
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
                        onChange={(e) => setCode(e.target.value)}
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