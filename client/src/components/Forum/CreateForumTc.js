import React, { useState, useEffect } from 'react';
import ForumFinder from '../../apis/ForumFinder';
import ClassFinder from '../../apis/ClassFinder';

//Material UI
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

const CreateForumTc = () => {

  const classes = useStyles();

  const [id, setId] = useState();
  const [author, setAuthor] = useState();
  const [userclasses, setUserclasses] = useState();

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [code, setCode] = useState('');
  const [lists, setLists] = useState([]);
  const [subject, setSubject] = useState('');
  const [nameclass, setNameclass] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [update, setUpdate] = useState(false);
  const [dataupdate, setDataupdate] = useState(false);
  // const [isPending, setIsPending] = useState(false);

  const date = new Date();
  const todayDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

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

    for (let i = 0; i < userclasses.length; i++) {
      if(userclasses[i].code === code){
          setSubject(userclasses[i].subject)
          setNameclass(userclasses[i].name)
      }
    }

    setUpdate(true);
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

        } catch (err) {
          console.error(err.message);
        }
    };
    getProfile();
  }, []);

  useEffect(() => {

    const getInfo = async () => {
      try {
      const response = await ClassFinder.get(`/find/code/${id}`)
      // console.log(response)
      setUserclasses(response.data.data.class);
      } catch (err) {
          console.error(err.message);
      }
    };

    if(id){
      getInfo();
      // setDataupdate(true);
    }

  }, [id]);

  useEffect(() => {
    const fetchData = async (info) => {
      try {
        const response = await ForumFinder.get(`/display/${info}`)
        if(response.data.data.forum.length !==0 ){
          for (let i = 0; i < response.data.data.forum.length; i++) {
            setLists(lists => [...lists, response.data.data.forum[i]])
            // lists.push(response.data.data.forum[i])
          }
        }
      } 
      catch (err) {
        console.log(err)
      }
    }

    if(userclasses){
      // console.log(userclasses);
      // {userclasses.map(userclass => (
      //   fetchData(userclass.code)
      // ))}

      for (let i = 0; i < userclasses.length; i++) {
        fetchData(userclasses[i].code)
      }
    }

    // if(update === true){
    //   {userclasses && userclasses.map((userclass, i) => (
    //     fetchData(userclass.code)
    //   ))}
    // }

  },[userclasses]);

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
    }
  }, [update])

  console.log(lists);

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
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={code}
                  label="Class"
                  onChange={(e) => setCode(e.target.value)}
                >
                  {/* <MenuItem value={"mathematics"}>Mathematics</MenuItem>
                  <MenuItem value={"physics"}>Physics</MenuItem>
                  <MenuItem value={"chemistry"}>Chemistry</MenuItem>
                  <MenuItem value={"biology"}>Biology</MenuItem> */}
                  {userclasses && userclasses.map(userclass => (
                    <MenuItem key={userclass.classid} value={userclass.code}>{userclass.name}</MenuItem>
                  ))}
                  
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
  )
}

export default CreateForumTc;