import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import SubmissionFinder from '../../apis/SubmissionFinder';

//Material UI
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

const style = {
    width: '100%',
    // maxWidth: 360,
    bgcolor: 'background.paper',
};

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

const SubListTc = () => {

   //Style
   const classes = useStyles();

  //Data
  const {code} = useParams();
  const [id, setId] = useState();
  const [subs, setSubs] = useState();
  // const [userclasses, setUserclasses] = useState();

  //Edit Forum
  const [sbid, setSbid] = useState();
  const [showEdit, setShowEdit] = useState();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState();

  //Output
  const [lists, setLists] = useState([]);

  //Error handling
  const [preview, setPreview] = useState(false)
  const [titleError, setTitleError] = useState(false);

  const handleClick = async (subid) => {
    try {
      const response = await SubmissionFinder.get(`/submissionlist/${subid}`);
      setSubs(response.data.data.sub);
      setSbid(subid)
    } catch (err) {
      console.log(err)
    }

    setPreview(true)
    setShowEdit(false)
  };

  const handleEditClick = async () => {
    setPreview(false)
    setShowEdit(true)

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title == '') {
      setTitleError(true)
    }
    if(title){

      const updateSubmission = async() => {
        try {
          const response = await SubmissionFinder.put('/update', {sbid, title, date})
        } catch (error) {
          console.log(error)
        }
      }

      updateSubmission();
    
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SubmissionFinder.get(`/${code}`)
        setLists(response.data.data.sub);
      } 
      catch (err) {
        console.log(err)
      }
    }

    if(code){
      fetchData();
    }
  
  },[code]);

  return ( 
    <Container maxWidth="md">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Submission List
      </Typography>
      <Divider />
      <List sx={style} component="nav" aria-label="mailbox folders">
        {lists && lists.map((list) => (
            <div key={list.subid}>
            <ListItem button onClick={()=>{handleClick(list.subid)}}>
              <ListItemText primary={list.title} />
              {/* <Button variant="outlined" onClick={()=>{handleClickEdit(list.subid)}}>Edit</Button> */}
            </ListItem>
            <Divider />
            </div>
        ))}
      </List>
      <TableContainer component={Paper} sx={{mt: 4}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">File</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {subs && subs.map((sub) => (
                <StyledTableRow key={sub.submitid}>
                <StyledTableCell component="th" scope="row">
                {sub.fullname}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link href={`${sub.file}`} target="_blank" underline="hover" >{sub.filename}</Link>
                </StyledTableCell>
                <StyledTableCell align="center"><Button variant="outlined" color="error"> Delete</Button></StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
      {preview === true && (
        <Button variant="contained" sx={{mt:2}} onClick={handleEditClick}>Edit</Button>
      )}
      {showEdit === true && (
        <>
        <Card  sx={{ mt: 2, p:2 }}>
        <Typography
          variant="body1" 
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Edit Submission
        </Typography>
        
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField className={classes.field}
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
            // sx={{ mt: 2 }}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
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
          
          <Button
            type="submit" 
            color="primary" 
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}>
            Submit
          </Button>
          </Stack>
        </form>
        </Card>
        </>
      )}
    </Container>

  );
}
 
export default SubListTc;