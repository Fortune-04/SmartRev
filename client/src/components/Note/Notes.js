import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import UploadNote from "./UploadNote";
import ClassNote from "./ClassNote";
import Temp from "../../Temp";
import Temp2 from "../../Temp2";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SubList = () => {

  //Data
  const [id, setId] = useState();
  const [role,setRole] = useState();

  //Tab
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          setRole(parseData.data.profile[0].usertype);

        } catch (err) {
          console.error(err.message);
        }
    };
    getProfile();
  },[]);

  return (
    
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Personal" {...a11yProps(0)} />
          <Tab label="Class" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Temp id={id}/>
        {/* <UploadNote/> */}
        
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <UploadNote/> */}
        {/* <ClassNote id={id} role={role}/> */}
        <Temp2 id={id}/>
      </TabPanel>
    </Box>
    
  );
}
 
export default SubList;