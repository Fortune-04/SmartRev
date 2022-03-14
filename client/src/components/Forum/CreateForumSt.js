import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import ForumFinder from '../../apis/ForumFinder';
import ClassFinder from '../../apis/ClassFinder';

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
import Card from '@mui/material/Card';

const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    }
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0782cb',
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

const CreateForumSt = () => {

  const classes = useStyles();
  // let history = useHistory();

  //Data
  const [id, setId] = useState();
  const [userclasses, setUserclasses] = useState();
  const [stclasses,setStclasses] = useState([]);
  const [lists, setLists] = useState([]);
  const [subCode, setSubCode] = useState([]);

  //Input
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [author, setAuthor] = useState();
  const [code, setCode] = useState('');
  const [nameclass, setNameclass] = useState('');
  const [subject, setSubject] = useState('');
  
  //Error Handling
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [update, setUpdate] = useState(false);

  //Others
  const date = new Date();
  const todayDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  const handleSubmit = async(e) => {
    
    // setTitleError(false)
    // setDetailsError(false)

    if (title == '') {
      e.preventDefault()
      setTitleError(true)
    }
    if (details == '') {
      e.preventDefault()
      setDetailsError(true)
    }
    if (code == '') {
      e.preventDefault()
      setSubjectError(true)
    }

    if (title && details && code) {
      try {
        const response = await ClassFinder.get(`/find/${code}`)
        setNameclass(response.data.data.class[0].name)
        setSubject(response.data.data.class[0].subject)
        setUpdate(true);
      } catch (err) {
        console.log(err)
      }
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
        setAuthor(parseData.data.profile[0].fullname);
        setId(parseData.data.profile[0].userid);
        setSubCode(subCode => [...subCode, parseData.data.profile[0].math]);
        setSubCode(subCode => [...subCode, parseData.data.profile[0].physics]);
        setSubCode(subCode => [...subCode, parseData.data.profile[0].chemistry]);
        setSubCode(subCode => [...subCode, parseData.data.profile[0].biology]);
        setStclasses(stclasses => [...stclasses, {sub:"Mathematics", cod:parseData.data.profile[0].math}])
        setStclasses(stclasses => [...stclasses, {sub:"Physics", cod:parseData.data.profile[0].physics}])
        setStclasses(stclasses => [...stclasses, {sub:"Chemistry", cod:parseData.data.profile[0].chemistry}])
        setStclasses(stclasses => [...stclasses, {sub:"Biology", cod:parseData.data.profile[0].biology}])

        } catch (err) {
        console.error(err.message);
        }
    };
    getProfile();
  }, []);

  // useEffect(() => {

  //     const getInfo = async () => {
  //     try {
  //     const response = await ClassFinder.get(`/find/code/${id}`)
  //     console.log(response)
  //     setUserclasses(response.data.data.class);
  //     } catch (err) {
  //         console.error(err.message);
  //     }
  //     };

  //     if(id){
  //     getInfo();
  //     // setDataupdate(true);
  //     }

  // }, [id]);

  useEffect(() => {
      const fetchData = async (info) => {
        try {
          const response = await ForumFinder.get(`/display/${info}`)
          if(response.data.data.forum.length !==0 ){
            for (let i = 0; i < response.data.data.forum.length; i++) {
              setLists(lists => [...lists, response.data.data.forum[i]])
            }
          }
        } 
        catch (err) {
          console.log(err)
        }
      }
  
      if(subCode.length === 4){
        for (let i = 0; i < subCode.length; i++) {
          if(subCode[i] !== null){
            fetchData(subCode[i])
          }
        }
      }
  
  },[subCode]);

  useEffect( async () => {
    if(update === true){
      try {
        const body = {title, details, author, todayDate, code, nameclass, subject};
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
      // history.push("/loginform")
      
    }
    
  }, [update])

  return (
      <Container size="sm">
        <Typography
            variant="h6" 
            color="textSecondary"
            component="h2"
            gutterBottom
        >
            Create Forum
        </Typography>
        <Card sx={{p: 3, mb:2}}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField className={classes.field}
            onChange={(e) => {
              setTitle(e.target.value)
              setTitleError(false)
            }}
            label="Title" 
            variant="outlined" 
            color="secondary" 
            fullWidth
            required
            sx={{ mb: 2 }}
            error={titleError}
            helperText={titleError? "Empty Field": ""}
            />
            <TextField className={classes.field}
            onChange={(e) => {
              setDetails(e.target.value)
              setDetailsError(false)
            }}
            label="Details"
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
            fullWidth
            required
            sx={{ mb: 2 }}
            error={detailsError}
            helperText={detailsError? "Empty Field": ""}
            />

            <Stack direction="row" spacing={2} >
            <FormControl sx={{minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={code}
                label="Class"
                onChange={(e) => {
                  setCode(e.target.value)
                  setSubjectError(false)
                }}
                error={subjectError}
                helperText={subjectError? "Empty Field": ""}
              >
                  {stclasses && stclasses.map((stclass,i) => 
                  {if(stclass.cod !== null)
                      {return(<MenuItem key={i} value={stclass.cod}>{stclass.sub}</MenuItem>)}}
                  )}
                {/* <MenuItem value={"mathematics"}>Mathematics</MenuItem>
                <MenuItem value={"physics"}>Physics</MenuItem>
                <MenuItem value={"chemistry"}>Chemistry</MenuItem>
                <MenuItem value={"biology"}>Biology</MenuItem> */}

                {/* {userclasses && userclasses.map(userclass => (
                  <MenuItem key={userclass.classid} value={userclass.code}>{userclass.name}</MenuItem>
                ))} */}
                
              </Select>
            </FormControl>
            <Button
              type="submit" 
              color="primary" 
              variant="contained"
              // sx={{ mb: 3 }}
              endIcon={<KeyboardArrowRightIcon />}>
              Submit
            </Button>
            </Stack>
        </form>
        </Card>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell align="center">Class</StyledTableCell>
                    <StyledTableCell align="center">Subject</StyledTableCell>
                    <StyledTableCell align="center">Author</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {lists && lists.map((list) => (
                    <StyledTableRow key={list.forumid}>
                    <StyledTableCell component="th" scope="row">
                        
                    <Link href={`http://localhost:3000/forum/description/${list.forumid}`} underline="hover" >{list.title}</Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">{list.nameclass}</StyledTableCell>
                    <StyledTableCell align="center">{list.subject}</StyledTableCell>
                    <StyledTableCell align="center">{list.author}</StyledTableCell>
                    <StyledTableCell align="center">{list.date}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  );
}
 
export default CreateForumSt;