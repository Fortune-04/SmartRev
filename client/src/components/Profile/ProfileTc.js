import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import ProfileFinder from "../../apis/ProfileFinder";
import ClassFinder from "../../apis/ClassFinder";

//Material UI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const style = {
    width: '100%',
    // maxWidth: 360,
    bgcolor: 'background.paper',
};

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

const ProfileTc = () =>{

    let history = useHistory();

    //Data
    const [id, setId] = useState();
    const [userclasses, setUserclasses] = useState();
    const [students, setStudents] = useState();
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [school, setSchool] = useState("");

    const handleUpdate = async (e) =>{
        e.preventDefault()
        try{
          const updateProfile = await ProfileFinder.put("/update",{
            id,
            fullname,
            email,
            phonenumber,
            school,
          })
          
          history.push("/loginform")
        }catch (err){
          console.log(err)
        }
        
    };

    const handleClick = async (code,subject) => {
        
        try {
            const response = await ProfileFinder.get(`/${code}/${subject}`);
            setStudents(response.data.data.profile);
        } catch (err) {
            console.log(err)
        }
    };

    const handleDelete = () => {

    }

    useEffect(() => {

        const getProfile = async () => {
            try {
              const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
              });
        
              const parseData = await res.json();
              console.log(parseData);
              setId(parseData.data.profile[0].userid);
              setUsername(parseData.data.profile[0].username);
              setFullname(parseData.data.profile[0].fullname);
              setEmail(parseData.data.profile[0].email);
              setPhonenumber(parseData.data.profile[0].phonenumber);
              setSchool(parseData.data.profile[0].school);
            } catch (err) {
              console.error(err.message);
            }
        };

        getProfile();
    },[]);

    useEffect(() => {
        const getInfo = async () => {
          try {
          const response = await ClassFinder.get(`/find/code/${id}`)
          console.log(response)
          setUserclasses(response.data.data.class);
          } catch (err) {
              console.error(err.message);
          }
        };

        if(id){
          getInfo();
        }

    }, [id]);

    console.log(students);

    return(

        <Grid container spacing={3}>
              <Grid item xs={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 825
                  }}
                >
                  <Box
                    display="flex"
                    height={500}
                  >
                    <Box m="auto">
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                      <Avatar src="/user.png" sx={{ width: 200, height: 200 }}/>
                      <Typography>{username}</Typography>
                      </Stack>
                    </Box>
                    
                  </Box>
                <div className="mb-3 row">
                  <label htmlFor="age" className="col-sm-2 col-form-label">Full Name</label>
                  <div className="col-sm-10">
                    <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" className="form-control" id="email"></input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="gender" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="phoneNum"></input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="school" className="col-sm-2 col-form-label">Phone Number</label>
                  <div className="col-sm-10">
                    <input value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} type="text" className="form-control" id="school"></input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="school" className="col-sm-2 col-form-label">School</label>
                  <div className="col-sm-10">
                    <input value={school} onChange={(e) => setSchool(e.target.value)} type="text" className="form-control" id="school"></input>
                  </div>
                </div>
                <button onClick={handleUpdate} type="submit" className="btn btn-primary mb-3">Update</button>                                                               
        
                </Paper>
              </Grid>
              <Grid item xs={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                    mb: 3
                  }}
                >
                    <List sx={style} component="nav" aria-label="mailbox folders">
                    {userclasses && userclasses.map(userclass => (
                        <Card key={userclass.classid}>
                            <ListItem button onClick={()=>{handleClick(userclass.code, userclass.subject)}}>
                                <ListItemText primary={userclass.name} />
                                <ListItemText primary={userclass.code} />
                            </ListItem>
                        </Card>
                    ))}
                    </List>
                  
                </Paper>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: 400
                  }}    
                >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Phone Number</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {students && students.map((student) => (
                                <StyledTableRow key={student.userid}>
                                <StyledTableCell component="th" scope="row">
                                    
                                {student.fullname}
                                </StyledTableCell>
                                <StyledTableCell align="center">{student.email}</StyledTableCell>
                                <StyledTableCell align="center">{student.phonenumber}</StyledTableCell>
                                <StyledTableCell align="center"><Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(student.userid)}>Remove</Button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
              </Grid>
          </Grid>
    );
}

export default ProfileTc;