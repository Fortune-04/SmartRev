import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import VideoFinder from '../../apis/VideoFinder';
import VideoLink from "./VideoLink";

const Videos = () => {

  //Data
  const [id, setId] = useState();
  const [mathCode, setMathCode] = useState();
  const [phyCode, setPhyCode] = useState();
  const [chemCode, setChemCode] = useState();
  const [bioCode, setBioCode] = useState();

  //Output
  const [videos, setVideos] = useState();

  //Tab
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const viewTab = () => {
      if (value === 0){
          return 0;
      } else if (value === 1) {
          return 1;
      } else if (value === 2) {
          return 2;
      } else if (value === 3) {
          return 3;
      }
  };

  const tabMenu = () => {
      return (
          <Box sx={{ width: '100%', typography: 'body1' }}>
          <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
          >
              <Tab label="Mathematics" value={0}/>
              <Tab label="Physics" value={1}/>
              <Tab label="Chemistry" value={2}/>
              <Tab label="Biology" value={3}/>
          </Tabs>
          </Box>
      )
  }
  useEffect(() =>{

    const getProfile = async () => {
        try {
          const res = await fetch("http://localhost:4400/profile", {
            method: "GET",
            headers: { token: localStorage.token }
          });
    
          const parseData = await res.json();
          setId(parseData.data.profile[0].userid);
          setMathCode(parseData.data.profile[0].math);
          setPhyCode(parseData.data.profile[0].physics);
          setChemCode(parseData.data.profile[0].chemistry);
          setBioCode(parseData.data.profile[0].biology);

        } catch (err) {
          console.error(err.message);
        }
    };

    getProfile();

  }, []);

  useEffect(() => {
      viewTab();
      const fetchData = async () =>{
          if(value === 0){
              try {
                const response = await VideoFinder.get("/display/mathematics")
                setVideos(response.data.data.video)
                console.log(response)
              } 
              catch (err) {
                console.log(err)
              }
            }else if(value === 1){
              try {
                const response = await VideoFinder.get("/display/physics")
                setVideos(response.data.data.video)
                console.log(response)
              } 
              catch (err) {
                console.log(err)
              }
            }else if(value === 2){
              try {
                const response = await VideoFinder.get("/display/chemistry")
                setVideos(response.data.data.video)
                console.log(response)
              } 
              catch (err) {
                console.log(err)
              }
            }else if(value === 3){
              try {
                const response = await VideoFinder.get("/display/biology")
                setVideos(response.data.data.video)
                console.log(response)
              } 
              catch (err) {
                console.log(err)
              }
          }
      }
      fetchData()
  }, [value]);

  return (
      <>
          {tabMenu()}
          {viewTab() === 0 && (
              <VideoLink videos={videos} code={mathCode} id={id}/>
          )}
          {viewTab() === 1 && (
              <VideoLink videos={videos} code={phyCode} id={id}/>
          )}
          {viewTab() === 2 && (
              <VideoLink videos={videos} code={chemCode} id={id}/>
          )}
          {viewTab() === 3 && (
              <VideoLink videos={videos} code={bioCode} id={id}/>
          )}
      </>
  );
}
 
export default Videos;
  