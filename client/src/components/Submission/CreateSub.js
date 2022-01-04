import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import SubmissionFinder from '../../apis/SubmissionFinder';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const CreateSub = () => {

    const [title, setTitle] = useState('')
    const [date, setDate] = useState()

    const [subs, setSubs] = useState()
    const [subject, setSubject] = useState('');

    const handleSubmit = async () => {
        try {
            const body = {title, date, subject};
            const response = await fetch(
                "http://localhost:4400/submission/create",
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
            const response = await SubmissionFinder.get("/display")
            setSubs(response.data.data.sub)
            console.log(response)
          } 
          catch (err) {
            console.log(err)
          }
        }
        fetchData();
    },[]);

    return ( 
        <Container size="sm">
            <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Create Submission
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                {/* <FormControl component="fieldset"> */}
                    <TextField //className={classes.field}
                    // onChange={(e) => setTitle(e.target.value)}
                    label="Title" 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                    onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    value={title}
                    sx={{ mb: 2 }}
                    // error={titleError}
                    />
                {/* </FormControl> */}

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Date and Time"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                          }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <FormControl sx={{minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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
                
                <Button
                  type="submit" 
                  color="secondary" 
                  variant="contained"
                  // sx={{ mb: 3 }}
                  endIcon={<KeyboardArrowRightIcon />}>
                  Submit
                </Button>

            </form>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {subs && subs.map((sub) => (
                        <StyledTableRow key={sub.subid}>
                        <StyledTableCell component="th" scope="row">
                            {sub.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">{sub.date}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
     );
}
 
export default CreateSub;