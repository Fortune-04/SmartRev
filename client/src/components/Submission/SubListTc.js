import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import ClassFinder from '../../apis/ClassFinder';
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

const style = {
    width: '100%',
    // maxWidth: 360,
    bgcolor: 'background.paper',
};

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

const SubListTc = () => {

  //Data
  const {code} = useParams();
  const [id, setId] = useState();
  const [subs, setSubs] = useState();
  // const [userclasses, setUserclasses] = useState();

  //Output
  const [lists, setLists] = useState([]);

  const handleClick = async (subid) => {
    try {
        const response = await SubmissionFinder.get(`/submissionlist/${subid}`);
        setSubs(response.data.data.sub);
    } catch (err) {
        console.log(err)
    }
  };

  // useEffect(() => {
  //     const getProfile = async () => {
  //         try {
  //           const res = await fetch("http://localhost:4400/profile", {
  //             method: "GET",
  //             headers: { token: localStorage.token }
  //           });
      
  //           const parseData = await res.json();
  //           setId(parseData.data.profile[0].userid);

  //         } catch (err) {
  //           console.error(err.message);
  //         }
  //     };
  //     getProfile();

  // }, []);

  // useEffect(() => {
  //     const getInfo = async () => {
  //       try {
  //       const response = await ClassFinder.get(`/find/code/${id}`)
  //       console.log(response)
  //       setUserclasses(response.data.data.class);
  //       } catch (err) {
  //           console.error(err.message);
  //       }
  //     };

  //     if(id){
  //         getInfo();
  //     }

  // }, [id]);

  // useEffect(() => {
  //   const fetchData = async (info) => {
  //     try {
  //       const response = await SubmissionFinder.get(`/${info}`)
  //       if(response.data.data.sub.length !==0 ){
  //         for (let i = 0; i < response.data.data.sub.length; i++) {
  //           setLists(lists => [...lists, response.data.data.sub[i]])
  //         }
  //       }
  //     } 
  //     catch (err) {
  //       console.log(err)
  //     }
  //   }

  //   if(userclasses){
  //     for (let i = 0; i < userclasses.length; i++) {
  //       fetchData(userclasses[i].code)
  //     }
  //   }
  
  // },[userclasses]);

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
                <StyledTableCell align="center">Class</StyledTableCell>
                <StyledTableCell align="center">Subject</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
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
                <StyledTableCell align="center">{sub.filename}</StyledTableCell>
                <StyledTableCell align="center">{sub.filename}</StyledTableCell>
                <StyledTableCell align="center">{sub.filename}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
 
export default SubListTc;