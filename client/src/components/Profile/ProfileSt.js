// import React, {useEffect, useContext, useState} from "react";
import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
// import { useParams } from "react-router";
import ProfileFinder from "../../apis/ProfileFinder";
// import { ProfileContext } from "../context/ProfileContext";
import BarChartScore from "./BarChartScore";
import BarChartPerform from "./BarChartPerform";

//Material UI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const ProfileSt = (props) =>{
    // const {id} = useParams;
    let history = useHistory()
    const [id, setId] = useState();
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [school, setSchool] = useState("");
    // const {profile, setProfile} =useContext(ProfileContext)
    // const {profile} = useContext(ProfileContext)

    useEffect(() => {
        // const fecthData = async () =>{
        //     try{
        //         const response = await ProfileFinder.get(`/1`)
        //         console.log(response);
        //         //ni utk read byk2
        //         // setProfile(response.data.data.profile);
        //         setUsername(response.data.data.profile[0].username)
        //         setFullname(response.data.data.profile[0].fullname)
        //         setEmail(response.data.data.profile[0].email)
        //         setPhonenumber(response.data.data.profile[0].phonenumber)
        //         setSchool(response.data.data.profile[0].school)
        //     }catch(err){
        //         console.log(err);
        //     }
        // };

        const getProfile = async () => {
            try {
              const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
              });
        
              const parseData = await res.json();
              console.log(parseData);
              setId(parseData.data.profile[0].userid);
              setUsername(parseData.data.profile[0].username);
              setFullname(parseData.data.profile[0].fullname);
              setEmail(parseData.data.profile[0].email);
              setPhonenumber(parseData.data.profile[0].phonenumber);
              setSchool(parseData.data.profile[0].school);
            } catch (err) {
              console.error(err.message);
            }
        };

        getProfile();
        // fecthData();
    },[]);

    const handleUpdate = async (e) =>{
        e.preventDefault()
        try{
          const updateProfile = await ProfileFinder.put(`/1`,{
            id,
            fullname,
            email,
            phonenumber,
            school,
          })
          
          history.push("/loginform")
        }catch (err){
          console.log(err)
        }
        
    };

    return(

        <Grid container spacing={3}>
              <Grid item xs={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // width: 600,
                    minHeight: 825
                  }}
                >
                  <Box
                    display="flex"
                    height={500} 
                    // sx={{minHeight:500}}
                  >
                    <Box m="auto">
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                      <Avatar src="/user.png" sx={{ width: 200, height: 200 }}/>
                      <Typography>{username}</Typography>
                      </Stack>
                    </Box>
                    
                  </Box>
                <div className="mb-3 row">
                  <label htmlFor="age" className="col-sm-2 col-form-label">Full Name</label>
                  <div className="col-sm-10">
                    <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" className="form-control" id="email"></input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="gender" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="phoneNum"></input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="school" className="col-sm-2 col-form-label">Phone Number</label>
                  <div className="col-sm-10">
                    <input value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} type="text" className="form-control" id="school"></input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="school" className="col-sm-2 col-form-label">School</label>
                  <div className="col-sm-10">
                    <input value={school} onChange={(e) => setSchool(e.target.value)} type="text" className="form-control" id="school"></input>
                  </div>
                </div>
                <button onClick={handleUpdate} type="submit" className="btn btn-primary mb-3">Update</button>                                                               
        
                </Paper>
              </Grid>
              <Grid item xs={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                    mb: 3
                  }}
                >
                  <BarChartPerform id={id}/>
                </Paper>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: 400
                  }}
                >
                  <BarChartScore id={id}/>
                </Paper>
              </Grid>
          </Grid>
    );
}

export default ProfileSt;