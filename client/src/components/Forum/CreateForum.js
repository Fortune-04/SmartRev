import React, { useState, useEffect } from 'react'
import ForumFinder from '../../apis/ForumFinder';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    }
})

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
const rows = [
    createData('Force', 'Physics', 'Afiq', '2/12/2021', 4.0),
    createData('The Atomic Structure', 'Chemistry', 'Diana', '4/5/2021', 4.3),
    createData('Chemical Equation', 'Chemistry', 'Kira', '12/12/2021', 6.0),
    createData('Quadratic Functions', 'Addmath', 'Ahmad', '9/10/2021', 4.3),
    createData('Physiology of Humans And Animals', 'Biology', 'Brian', '23/12/2021', 3.9),
];

const CreateForum = () => {
    const classes = useStyles()
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const [subject, setSubject] = useState('');
    const [lists, setLists] = useState(null);
    const author = "admin";

    const handleSubmit = async(e) => {
        // e.preventDefault()
        setTitleError(false)
        setDetailsError(false)
    
        if (title == '') {
          setTitleError(true)
        }
        if (details == '') {
          setDetailsError(true)
        }
        if (title && details) {
          console.log(title, details)
        }

        try {
          const body = {title, details, subject, author};
          const response = await fetch(
              "http://localhost:4400/forum/create",
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
          const response = await ForumFinder.get("/display")
          setLists(response.data.data.forum)
          console.log(response)
        } 
        catch (err) {
          console.log(err)
        }
      }
      fetchData();
    },[]);

    return(
        <Container size="sm">
            <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Create Forum
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.field}
                onChange={(e) => setTitle(e.target.value)}
                label="Title" 
                variant="outlined" 
                color="secondary" 
                fullWidth
                required
                sx={{ mb: 2 }}
                error={titleError}
                />
                <TextField className={classes.field}
                onChange={(e) => setDetails(e.target.value)}
                label="Details"
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                fullWidth
                required
                sx={{ mb: 2 }}
                error={detailsError}
                />

                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
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
                </Stack>
            </form>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="center">Subject</StyledTableCell>
                        <StyledTableCell align="center">Author</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {lists && lists.map((list) => (
                        <StyledTableRow key={list.forumid}>
                        <StyledTableCell component="th" scope="row">
                            
                            <Link href={`http://localhost:3000/forum/description/${list.forumid}`} underline="hover" >{list.title}</Link>
                        </StyledTableCell>
                        <StyledTableCell align="center">{list.subject}</StyledTableCell>
                        <StyledTableCell align="center">{list.author}</StyledTableCell>
                        <StyledTableCell align="center">{list.date}</StyledTableCell>
                        {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default CreateForum;