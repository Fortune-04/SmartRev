import React, {useState, useEffect, useContext} from 'react';
import VideoFinder from '../../apis/VideoFinder';
import ClassFinder from '../../apis/ClassFinder';
import { VideoContext } from '../../context/VideoContext'

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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

const VideoAdd = (props) => {

    //Style
    const classes = useStyles();

    //Data
    const [id, setId] = useState();
    const [userclasses, setUserclasses] = useState();

    //Output
    const [lists, setLists] = useState([]);

    //Input
    const {addVideo} = useContext(VideoContext);
    const {videos, setVideo} = useContext(VideoContext);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [subject, setSubject] = useState('');
    const [code, setCode] = useState('');
    const [nameclass, setNameclass] = useState('');

    //Error Handling
    const [titleError, setTitleError] = useState(false);
    const [linkError, setLinkError] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const [update, setUpdate] = useState(false);
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if (title == '') {
        setTitleError(true)
      }
      if (link == '') {
        setLinkError(true)
      }
      if (code == '') {
        setCodeError(true)
      }
      
      if(title && link && code){
        for (let i = 0; i < userclasses.length; i++) {
          if(userclasses[i].code === code){
              setSubject(userclasses[i].subject)
              setNameclass(userclasses[i].name)
          }
        }
        setUpdate(true);
      }
      
    };

    const handleDelete = async (id) =>{
      try{
          const response = await VideoFinder.delete(`/${id}`)
          setLists(lists.filter(list => {
              return list.videoid !== id
          }))
          console.log(response);
      } catch(err){
          console.log(err)
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

    useEffect(() => {
        const fetchData = async (info) => {
          try {
            const response = await VideoFinder.get(`/${info}`)
            if(response.data.data.video.length !==0 ){
              for (let i = 0; i < response.data.data.video.length; i++) {
                setLists(lists => [...lists, response.data.data.video[i]])
              }
            }
          } 
          catch (err) {
            console.log(err)
          }
        }
    
        if(userclasses){
          for (let i = 0; i < userclasses.length; i++) {
            fetchData(userclasses[i].code)
          }
        }
    
    },[userclasses]);

    useEffect( async () => {
        
        if(update === true){
            try {
                const response = await VideoFinder.post("/", {
                    title,
                    link,
                    subject,
                    code,
                    nameclass
                });
                console.log(response)
                addVideo(response.data.data.video);
            } catch (err) {
                console.log(err);
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
              Create Video
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField className={classes.field}
              onChange={(e) => {
                setTitle(e.target.value)
                setTitleError(false)
              }}
              label="Title" 
              variant="outlined" 
              color="secondary"
              value={title} 
              fullWidth
              required
              sx={{ mb: 2 }}
              error={titleError}
              helperText={titleError? "Empty Field": ""}
              />
              <TextField className={classes.field}
              onChange={(e) => {
                setLink(e.target.value)
                setLinkError(false)
              }}
              label="Link"
              variant="outlined"
              color="secondary"
              value={link}
              fullWidth
              required
              sx={{ mb: 2 }}
              error={linkError}
              helperText={linkError? "Empty Field": ""}
              />

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
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
                      <StyledTableCell align="center">Edit</StyledTableCell>
                      <StyledTableCell align="center">Delete</StyledTableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {lists && lists.map((list) => (
                      <StyledTableRow key={list.videoid}>
                      <StyledTableCell component="th" scope="row">
                          
                      <Link href={`${list.link}`} target="_blank" underline="hover" >{list.title}</Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">{list.nameclass}</StyledTableCell>
                      <StyledTableCell align="center">{list.subject}</StyledTableCell>
                      <StyledTableCell align="center"><Button variant="outlined" color="secondary" startIcon={<EditIcon />} >Edit</Button></StyledTableCell>
                      <StyledTableCell align="center"><Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(list.videoid)}>Delete</Button></StyledTableCell>
                      </StyledTableRow>
                  ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </Container>
    )
}

export default VideoAdd