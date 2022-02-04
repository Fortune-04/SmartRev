import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import AnswerQuiz from './AnswerQuiz';
import Quizes from './Quizes5.js';
import Quizes2 from './Quizes2';
import QuizSubList from "./QuizSubList";
import QuizGeneral from "./QuizGeneral"

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

const QuizList = () => {
    const [value, setValue] = useState(0);

    //Subject
    const {code, sub} = useParams();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        return async () => {
            if(value == 0){
                try {
                    // const response = await SubmissionFinder.get("/display/mathematics")
                    // setSubs(response.data.data.sub)
                    // console.log(response)
                } 
                catch (err) {
                    console.log(err)
                }
            }else if(value == 1){
                try {
                    // const response = await SubmissionFinder.get("/display/physics")
                    // setSubs(response.data.data.sub)
                    // console.log(response)
                } 
                catch (err) {
                    console.log(err)
                }
            }
        }
    }, [value])
    
    console.log(sub)

    return ( 
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Class" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* <AnswerQuiz/> */}
        {/* <Quizes/> */}
        <QuizGeneral sub={sub}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <AnswerQuiz/> */}
        <QuizSubList/>
      </TabPanel>      
    </Box>
    );
}
 
export default QuizList;