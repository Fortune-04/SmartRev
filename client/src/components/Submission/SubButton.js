import React, { useState, useEffect} from 'react';

//Firebase
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

//Material UI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SubmissionFinder from '../../apis/SubmissionFinder';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

const SubButton = ({sid, id, fullname}) =>{

    //Output
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    
    //Input
    const [urls, setUrls] = useState([]);
    const [filename, setFilename] = useState('');
    const [url, setUrl] = useState('');

    //Error Handling
    const [update, setUpdate] = useState(false);

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
            
            setFilename(file.name);
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
                        setUrl(urls);
                    })
                }
            );
        });
    
        Promise.all(promises)
          .then(() => alert("All files uploaded"))
          .catch((err) => console.log(err));

        setUpdate(true);
    };

    useEffect(() => {
        const uploadData = async() => {
            try {
                const response = await SubmissionFinder.post('/submissionlist',{sid, id, fullname, url, filename})
                console.log(response);
            } catch (err) {
                console.log(err)
            }
            console.log("executed")
        }
        
        if(url && update === true){
            uploadData();
            setUpdate(false);
        }
    }, [url, setUpdate]);
    

    console.log("files: ", files);
    console.log("urls", urls);
    console.log(url);
    console.log(update)

    return(
        // <Box sx={{mt: 2}}>
        //     <input type="file" multiple onChange={handleChange} />
        //     <Button variant="outlined" onClick={handleUpload}>Upload</Button>
        //     {/* <Typography>Uploading done {progress}%</Typography> */}
        // </Box>

        <Card variant="outlined" sx={{ mt: 1, p: 2 }}>
            <Stack
                spacing={2} 
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >

                <input type="file" multiple onChange={handleChange} />
                <Button variant="outlined" onClick={handleUpload}>Upload</Button>
            </Stack>
        </Card>
    );
}

export default SubButton;