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

const ClassTeacher = ({id}) => {

    const [code, setCode] = useState();
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [toupdate, setToupdate] = useState(false);

    const CodeGen = () => {
        let min = Math.ceil(1000);
        let max = Math.floor(9999);

        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setCode(CodeGen());
        setToupdate(true);
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
        }

    }, [code])

    return ( 
        <Container component="main" maxWidth="xs">
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
                            onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setSubject(e.target.value)}
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