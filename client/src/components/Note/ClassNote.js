import React, { useState, useEffect} from 'react';
import NoteFinder from "../../apis/NoteFinder";
import { useParams } from "react-router-dom";

//Firebase
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

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
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const ClassNote = () => {

    const {id,role,subject,classname,code} = useParams();

    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const [toUpdate, setToUpdate] = useState(false);
    const [notes, setNotes] = useState();
    let img = "/pdf-icon3.jpg";

    //Input for save
    const [link, setLink] = useState('');
    const [filename, setFilename] = useState('');

    //LikeButton
    const [counter, setCounter] = useState(0);
    const [notId, setNotId] = useState();

    //Error Handling
    const [save, setSave] = useState(false);

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        newFile["id"] = Math.random();
        setFiles((prevState) => [...prevState, newFile]);
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
                await getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
                    setUrls((prevState) => [...prevState, {urls:urls, name:file.name}]);
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

    const handleLike = async (noteid) =>{
        try {
            const response = await NoteFinder.get(`/display/save/${noteid}`)
            setLink(response.data.data.note[0].note);
            setFilename(response.data.data.note[0].filename);
            if(response.data.data.note[0].counter === 0){
                setCounter(1)
            }else{
                setCounter(response.data.data.note[0].counter + 1)
            }
            setNotId(noteid);
        } catch (err) {
            console.log(err)
        }
        setSave(true);
    }

    useEffect(() => {

        const updateCounter = async () => {
            try {
                const response = await NoteFinder.put(`/update`, {counter,notId})
            } catch (error) {
                console.log(error)
            }
        }

        if(counter && notId){
            updateCounter();
        }
    }, [counter, notId]);

    useEffect(() => {
        const fetchNotes = async() =>{
            try {
                const response = await NoteFinder.get(`/class/display/${code}`)
                setNotes(response.data.data.note)
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }

        if(code){
        fetchNotes();
        }

    },[code]);

    useEffect(() => {
        const uploadSaveNote = async () => {
            try {
                const response = await NoteFinder.post('/create/save',{id,link,filename})
            } catch (err) {
                console.log(err)
            }
        }

        if(save === true){
            uploadSaveNote();
            setSave(false);
        }

    }, [save]);
    

    useEffect(() => {

        if(urls !== null && toUpdate===true && role==="teacher"){
            const fetchData = () => {
                urls.map( async (url) => {
                    let link = url.urls
                    let name = url.name

                    try {
                        const body = {id, link, name, code, subject, classname};
                        const response = await fetch(
                            "http://localhost:4400/note/class/teacher/create",
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

        if(urls !== null && toUpdate===true && role==="student"){
            const fetchData = () => {
                urls.map( async (url) => {

                    let link = url.urls
                    let name = url.name

                    try {
                        const body = {id, link, name, code, subject};
                        const response = await fetch(
                            "http://localhost:4400/note/class/student/create",
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
            try {
                const response = await NoteFinder.get(`/class/display/${code}`)
                setNotes(response.data.data.note)
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }

        if(id){
            fetchFile();
        }

    },[urls, toUpdate]);

    console.log("files: ", files);
    console.log("urls", urls);
    console.log(id);
    console.log(role)
    console.log(subject)
    console.log(classname)
    console.log(code)

    return(
      <>
      <Container component="main" maxWidth="md">
        <Container>
            <Typography
                // variant="h6" 
                color="textSecondary"
                // component="h2"
                gutterBottom
            >
              Class {<DoubleArrowIcon color="primary"/>} {classname}
            </Typography>
          <Card variant="outlined" sx={{ mb: 1, p: 2 }}>
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
          <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
            <Grid container spacing={3}>
                {notes && notes.map((note, i) => (
                    <Grid item xs={12} md={6} lg={3} key={note.noteid} >
                      <Card >
                          <a href={note.note} target="_blank">
                            <CardMedia
                              component="img"
                              // height="100"
                              image={img}
                              alt={note.filename}
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
                            <IconButton onClick={() => handleLike(note.noteid)}>
                              <FavoriteBorderOutlinedIcon/>
                            </IconButton>
                          </CardActions>
                      </Card>
                    </Grid>
                ))}
            </Grid>
          </Card>  
        </Container>
      </Container>
      </>
  );
}

export default ClassNote;