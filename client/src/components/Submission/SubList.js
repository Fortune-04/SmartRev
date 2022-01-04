import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SubDecs from "./SubDecs";
import SubmissionFinder from '../../apis/SubmissionFinder';
import Container from '@mui/material/Container';

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
  const [value, setValue] = React.useState(0);
  const [subs, setSubs] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {

    return async () => {
      if(value == 0){
        try {
          const response = await SubmissionFinder.get("/display/mathematics")
          setSubs(response.data.data.sub)
          console.log(response)
        } 
        catch (err) {
          console.log(err)
        }
      }else if(value == 1){
        try {
          const response = await SubmissionFinder.get("/display/physics")
          setSubs(response.data.data.sub)
          console.log(response)
        } 
        catch (err) {
          console.log(err)
        }
      }else if(value == 2){
        try {
          const response = await SubmissionFinder.get("/display/chemistry")
          setSubs(response.data.data.sub)
          console.log(response)
        } 
        catch (err) {
          console.log(err)
        }
      }else if(value == 3){
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
  }, [value])

  console.log(value);

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Mathematics" {...a11yProps(0)} />
          <Tab label="Physics" {...a11yProps(1)} />
          <Tab label="Chemistry" {...a11yProps(2)} />
          <Tab label="Biology" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SubDecs/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubDecs/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SubDecs/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SubDecs/>
      </TabPanel>
      
    </Box>
    <Container>
      {subs && subs.map((sub, i) =>(
          <div key={i}>
          {sub.title}
          {sub.date}
          </div>
      ))}
    </Container>
    </>
  );
}
 
export default SubList;