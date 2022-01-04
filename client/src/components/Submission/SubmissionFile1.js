import React, { useState} from 'react';
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import Typography from '@mui/material/Typography';
import {useDropzone} from 'react-dropzone';

const SubmissionFile1 = () =>{

    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

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
                await getDownloadURL(uploadTask.snapshot.ref).then((urls) =>{
                    setUrls((prevState) => [...prevState, urls]);
                })
            }
          );
        });
    
        Promise.all(promises)
          .then(() => alert("All files uploaded"))
          .catch((err) => console.log(err));

    };

    console.log("files: ", files);
    console.log("urls", urls);

    return(
        <>
        <div>
            {/* <progress value={progress} max="100" /> */}
            <br />
            <br />
            <input type="file" multiple onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            <br />
            <Typography>Uploading done {progress}%</Typography>
            <br/>
            {/* {urls.map((url, i) => (
                <div key={i}>
                <a href={url} target="_blank">
                    {url}
                </a>
                </div>
            ))} */}
            <br />
            {/* {urls.map((url, i) => (
                <img
                key={i}
                style={{ width: "500px" }}
                src={url || "http://via.placeholder.com/300"}
                alt="firebase-image"
                />
            ))} */}
        </div>
        </>
    );
}

export default SubmissionFile1;