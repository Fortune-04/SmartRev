import React, { useState, useEffect, Fragment} from 'react';
import NoteFinder from "../../apis/NoteFinder";
import ClassFinder from "../../apis/ClassFinder"

//Material UI
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

//Firebase
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

const ClassNote = ({id,role}) => {
    
  //Data
  const [userclasses, setUserclasses] = useState([]);

  //Input
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const [notes, setNotes] = useState([]);

  //Error Handling
  const [toUpdate, setToUpdate] = useState(false);

  //Images
  const img = "pdf-icon3.jpg";

  const handleChange = (e) => {
      for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        newFile["id"] = Math.random();
        setFiles(files => [...files, newFile]);
      }
  };

  const handleUpload = () => {
    const promises = [];
    files.map((file) => {
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((urls) =>{
                setUrls((prevState) => [...prevState, urls]);
            })
        }
      );

    });

    Promise.all(promises)
      .then(() => alert("All files uploaded"))
      .catch((err) => console.log(err));
      
    setToUpdate(true)
  };

  const handleDelete = async (noteid) =>{
    await fetch("http://localhost:4400/note/"+ noteid, {
    method: 'DELETE'});
    const newNotes = notes.filter(note => note.noteid !== noteid);
    setNotes(newNotes);
  }

  useEffect(() => {

    const getInfoSt = async () => {
      try {
        const res = await fetch("http://localhost:4400/profile", {
          method: "GET",
          headers: { token: localStorage.token }
        });

        const parseData = await res.json();
        if(parseData.data.profile[0].math !== null){
          setUserclasses(userclasses => [...userclasses,{classid: 1,name:"Mathematics",code:parseData.data.profile[0].math}]);
        }
        if(parseData.data.profile[0].physics !== null){
          setUserclasses(userclasses => [...userclasses,{classid: 2,name:"Physics",code:parseData.data.profile[0].physics}]);
        }
        if(parseData.data.profile[0].chemistry !== null){
          setUserclasses(userclasses => [...userclasses,{classid: 3,name:"Chemistry",code:parseData.data.profile[0].chemistry}]);
        }
        if(parseData.data.profile[0].biology !== null){
          setUserclasses(userclasses => [...userclasses,{classid: 4,name:"Biology",code:parseData.data.profile[0].biology}]);
        }        

      } catch (err) {
        console.error(err.message);
      }
    }

    const getInfoTc = async () => {
      try {
        const response = await ClassFinder.get(`/find/code/${id}`)
        setUserclasses(response.data.data.class);
      } catch (err) {
        console.error(err.message);
      }
    };

    if(id && role){
      if(role === 'student'){
        getInfoSt();
      }else if(role === 'teacher'){
        getInfoTc();
      }
    }
  
  }, [id, role]);

  useEffect(() => {

    if(urls !== null && toUpdate===true){
      const fetchData = () => {
        urls.map( async (url) => {
          try {
            const body = {url, id};
            const response = await fetch(
                "http://localhost:4400/note/create",
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
        });
      }
      fetchData();
    }

    const fetchFile = async() =>{
      for(let i=0; i < userclasses.length; i++){
        try {
          const response = await NoteFinder.get(`/display/${userclasses[i].code}`)
          if(response.data.data.note.length !==0){
            setNotes(notes => [...notes,response.data.data.note])
          }
          console.log(response)
        } catch (err) {
          console.log(err)
        }
      } 
    }

    // const fetchFile = async() =>{
    //   try {
    //     const response = await NoteFinder.get(`/display`)
    //     setNotes(response.data.data.note)
    //     console.log(response)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    fetchFile();
  
  },[urls, toUpdate]);

  // useEffect(() => {
    
  //   const fetchFile = async(info) =>{
  //     try {
  //       const response = await NoteFinder.get(`/display/${info}`)
  //       setNotes(response.data.data.note)
  //       console.log(response)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  
  //   if(userclasses){
  //     for (let i = 0; i < userclasses.length; i++) {
  //       fetchFile(userclasses[i].code)
  //     }
  //   }

  // }, [userclasses]);

  console.log(notes)
  console.log(userclasses)
  

  return (
    <Container component="main" maxWidth="md">
      {userclasses && userclasses.map(userclass => (
        <Fragment key={userclass.classid}>
          <Typography
              // variant="h6" 
              color="textSecondary"
              // component="h2"
              gutterBottom
          >
              {userclass.name}
          </Typography>
          <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
          <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
          <Stack
            spacing={2} 
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            >
              <input type="file" multiple onChange={handleChange} />
              <Button variant="contained" onClick={handleUpload}>Upload</Button>
          </Stack>
          </Card>
          <Grid container spacing={3}>
            {notes && notes.map((note, i) => (
              <Grid item xs={12} md={6} lg={3} key={note.noteid} >
                <Card >
                  <a href={note.note.note} target="_blank">
                  <CardMedia
                      component="img"
                      // height="100"
                      image={img}
                      alt={note.note.filename}
                  />
                  <CardContent>
                    <Typography variant="body" color="textSecondary">
                        { note.filename }
                    </Typography>
                  </CardContent>
                  </a>
                  <CardActions disableSpacing>
                  <IconButton onClick={() => handleDelete(note.noteid)}>
                      <DeleteOutlinedIcon/>
                  </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Card>
        </Fragment>
      ))}
    </Container>
  );
}
 
export default ClassNote;