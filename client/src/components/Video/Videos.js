import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import VideoFinder from '../../apis/VideoFinder';
import VideoLink from "./VideoLink";

const Videos = () => {

    const [videos, setVideos] = useState();
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
                <VideoLink videos={videos} />
            )}
            {viewTab() === 1 && (
                <VideoLink videos={videos} />
            )}
            {viewTab() === 2 && (
                <VideoLink videos={videos} />
            )}
            {viewTab() === 3 && (
                <VideoLink videos={videos} />
            )}
        </>
    );
}
 
export default Videos;
  