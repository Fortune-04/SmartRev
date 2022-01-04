import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Submission from "./SubmissionFile1";

const SubDecs = () => {
    return(
        <Container size="sm">
            <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Topic
            </Typography>
            <div style={{ width: '100%' }}>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 2,
                    bgcolor: '#b3e5fc',
                    }}
                >
                    <Typography>Title &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: Introduction to Physics Exercise 1</Typography>
                    {/* <Typography sx={{flexGrow: 1}}>Introduction to Physics</Typography> */}
                </Box>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 2,
                    bgcolor: '#e1f5fe',
                    }}
                >
                    <Typography>Due Date &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: 2 January 2030</Typography>
                    {/* <Typography sx={{flexGrow: 1}}>2 December 2021</Typography> */}
                </Box>
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    p: 2,
                    bgcolor: '#b3e5fc',
                    }}
                >
                    <Typography>Time Remaining &nbsp; &nbsp;&nbsp;: 7 days</Typography>
                    {/* <Typography sx={{flexGrow: 1}}>2 December 2021</Typography> */}
                </Box>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    p: 2,
                    bgcolor: '#e1f5fe',
                    }}
                >
                    <Typography>Submission Status : - </Typography>
                    {/* <Typography sx={{flexGrow: 1}}>2 December 2021</Typography> */}
                </Box>
            </div>
            <Submission/>

        </Container>
    )
}

export default SubDecs;