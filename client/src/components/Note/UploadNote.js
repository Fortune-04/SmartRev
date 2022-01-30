import React, { useState, useEffect} from 'react';
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import Typography from '@mui/material/Typography';
import NoteFinder from "../../apis/NoteFinder";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const SubmissionFile1 = () =>{

  const [id, setId] = useState();

  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [toUpdate, setToUpdate] = useState(false);
  const [notes, setNotes] = useState();
  const pdf = "https://firebasestorage.googleapis.com/v0/b/smartrev-storage.appspot.com/o/files%2FL-3008-08-%20Real-Time%20System%20Analysis.pdf?alt=media&token=008efe95-5e7b-4510-b3f2-8654ddbb6c5b"
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
    
    setToUpdate(true)
  };

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
  },[]);

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
      try {
        const response = await NoteFinder.get("/display")
        setNotes(response.data.data.note)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }

    fetchFile();

  },[urls, toUpdate]);

  console.log("files: ", files);
  console.log("urls", urls);
  console.log(id);

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
          {notes && notes.map((note, i) => (
              <div key={i}>
              <a href={note.note} target="_blank">
                  <InsertDriveFileIcon/>
              </a>
              </div>
          ))}
          <br />
          {/* {urls.map((url, i) => (
              <img
              key={i}
              style={{ width: "500px" }}
              src={url || "http://via.placeholder.com/300"}
              alt="firebase-image"
              />
          ))} */}
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Viewer fileUrl={pdf}
                  plugins={[defaultLayoutPluginInstance]} />
          </Worker>
      </div>
      </>
  );
}

export default SubmissionFile1;