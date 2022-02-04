import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import SubmissionFinder from "../../apis/SubmissionFinder";

//Material UI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SubButton from "./SubButton";

const SubDecs = () => {

    const {sid} = useParams();

    //Data
    const [fullname, setFullname] = useState();
    const [userid, setUserid] = useState();

    //Output
    const [details, setDetails] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() =>{

        const getProfile = async () => {
            try {
              const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
              });
        
              const parseData = await res.json();
              setFullname(parseData.data.profile[0].fullname);
              setUserid(parseData.data.profile[0].userid);

            } catch (err) {
              console.error(err.message);
            }
        };

        getProfile();

    }, []);

    useEffect(() => {

        const fetchDetail = async () => {
            try {
                const response = await SubmissionFinder.get(`/dis/${sid}`)
                setDetails(response.data.data.sub)
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }

        fetchDetail();

    }, []);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await SubmissionFinder.get(`/submissionlist/${sid}/${userid}`)
                if(response.data.data.sub.length !== 0){
                    setStatus(true);
                }
            } catch (error) {
                console.log(error)
            }
        }

        if(userid){
            checkStatus();
        }

    }, [userid]);
    

    console.log(sid);
    console.log(details)

    return(
        <Container size="sm">
            <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Submission
            </Typography>
            {details && details.map((detail) => (
                <div key={detail.subid} style={{ width: '100%' }}>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 2,
                    bgcolor: '#b3e5fc',
                    }}
                >
                    <Typography>Title &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: {detail.title}</Typography>
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
                    <Typography>Due Date &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: {detail.date}</Typography>
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
                    <Typography>Time &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;: {detail.time}</Typography>
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
                    {status? <Typography>Submission Status : Done </Typography> : <Typography>Submission Status : Not Available </Typography>}
                    {/* <Typography sx={{flexGrow: 1}}>2 December 2021</Typography> */}
                </Box>
                </div>
            ))}
            
            <SubButton sid={sid} fullname={fullname} id={userid}/>

        </Container>
    )
}

export default SubDecs;