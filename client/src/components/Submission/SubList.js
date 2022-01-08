import React, {useState, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SubDecs from "./SubDecs";
import SubTable from './SubTable';
import SubmissionFinder from '../../apis/SubmissionFinder';
import Container from '@mui/material/Container';

const SubList = () => {

  const [subs, setSubs] = useState();
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
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
      </Box>
    )
  }

  useEffect(() => {

    const fetchData = async () => {
      if(value === 0){
        try {
          const response = await SubmissionFinder.get("/display/mathematics")
          setSubs(response.data.data.sub)
          console.log(response)
        } 
        catch (err) {
          console.log(err)
        }
      }else if(value === 1){
        try {
          const response = await SubmissionFinder.get("/display/physics")
          setSubs(response.data.data.sub)
          console.log(response)
        } 
        catch (err) {
          console.log(err)
        }
      }else if(value === 2){
        try {
          const response = await SubmissionFinder.get("/display/chemistry")
          setSubs(response.data.data.sub)
          console.log(response)
        } 
        catch (err) {
          console.log(err)
        }
      }else if(value === 3){
        try {
          const response = await SubmissionFinder.get("/display/biology")
          setSubs(response.data.data.sub)
          console.log(response)
        } 
        catch (err) {
          console.log(err)
        }
      }
    }

    fetchData()

  },[value]);

  return (
    <>
      {tabMenu()}
      {viewTab() === 0 && (
        <SubTable subs={subs} />
      )}
      {viewTab() === 1 && (
        <SubTable subs={subs} />
      )}
      {viewTab() === 2 && (
        <SubTable subs={subs} />
      )}
      {viewTab() === 3 && (
        <SubTable subs={subs} />
      )}
    </>
  );
}
 
export default SubList;