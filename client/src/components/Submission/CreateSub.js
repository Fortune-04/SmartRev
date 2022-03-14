import React, { useState, useEffect } from 'react';
import SubmissionFinder from '../../apis/SubmissionFinder';
import ClassFinder from '../../apis/ClassFinder';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

const CreateSub = ({id}) => {

  //Style
  const classes = useStyles();

  //Data
  const [userclasses, setUserclasses] = useState();

  //Input
  const [title, setTitle] = useState('');
  const [date, setDate] = useState();
  // const [subs, setSubs] = useState();
  const [subject, setSubject] = useState('');
  const [nameclass, setNameclass] = useState('');
  const [code, setCode] = useState('');

  //Error Handling
  const [titleError, setTitleError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title == '') {
      setTitleError(true)
    }
    if (code == '') {
      setCodeError(true)
    }

    if( title && date && code){
      for (let i = 0; i < userclasses.length; i++) {
        if(userclasses[i].code === code){
            setSubject(userclasses[i].subject)
            setNameclass(userclasses[i].name)
        }
      }
      setUpdate(true);
    }  
      
  }

  useEffect(() => {

    const getInfo = async () => {
      try {
      const response = await ClassFinder.get(`/find/code/${id}`)
      setUserclasses(response.data.data.class);
      } catch (err) {
          console.error(err.message);
      }
    };

    if(id){
      getInfo();
    }

  }, [id]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await SubmissionFinder.get("/display")
  //         setSubs(response.data.data.sub)
  //         console.log(response)
  //       } 
  //       catch (err) {
  //         console.log(err)
  //       }
  //     }
  //     fetchData();
  // },[]);

  useEffect( async () => {
        
    if(update === true){
      try {
        const body = {id, title, subject, code, nameclass, date};
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
    
  }, [update])

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
          <Card sx={{p: 3, mb:4}}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              {/* <FormControl component="fieldset"> */}
                  <TextField className={classes.field}
                  // onChange={(e) => setTitle(e.target.value)}
                  label="Title" 
                  variant="outlined" 
                  color="secondary" 
                  fullWidth
                  required
                  error={titleError}
                  helperText={titleError? "Empty Field": ""}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    setTitleError(false)
                  }}
                  value={title}
                  sx={{ mb: 2 }}
                  // error={titleError}
                  />
              {/* </FormControl> */}

              <Stack direction="row" spacing={2}>
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
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={code}
                  label="Class"
                  onChange={(e) => {
                    setCode(e.target.value)
                    setCodeError(false)
                  }}
                  error={codeError}
                helperText={codeError? "Empty Field": ""}
                >
                  {userclasses && userclasses.map(userclass => (
                      <MenuItem key={userclass.classid} value={userclass.code}>{userclass.name}</MenuItem>
                    ))}
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

          <Grid container spacing={3}>
          {userclasses && userclasses.map(userclass => (
            <Grid item xs={3}>
              <Link href={`http://localhost:3000/submission/sublisttc/${userclass.code}`} underline="none">
              <Card key={userclass.classid} sx={{ maxWidth: 345 }} elevation={8}>
                  <CardMedia
                      component="img"
                      height="200"
                      image="submit.jpg"
                      alt="submission"
                  />
                  <CardContent style={{backgroundColor : "#bbdefb"}}>
                      <Typography variant="h5">
                        {userclass.name}
                      </Typography>
                  </CardContent>
              </Card>
              </Link>
            </Grid>
          ))}
          </Grid>

          {/* <TableContainer component={Paper}>
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
          </TableContainer> */}
      </Container>
    );
}
 
export default CreateSub;