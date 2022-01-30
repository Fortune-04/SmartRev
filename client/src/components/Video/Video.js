import React, {useState, useEffect} from 'react';
import Videos from './Videos';
import VideoAdd from "./VideoAdd";

const Video = () => {

    const [role,setRole] = useState();
    // const [id, setId] = useState();

    const SelectRole = () => {
        if(role === "student"){
            return 1;
        }else if(role === "teacher"){
            return 2;
        }else{
            return <div>Loading...</div>
        }
    };

    useEffect(() =>{
        const getProfile = async () => {
            try {
              const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
              });
        
              const parseData = await res.json();
              setRole(parseData.data.profile[0].usertype);
            //   setId(parseData.data.profile[0].userid);

            } catch (err) {
              console.error(err.message);
            }
        };

        getProfile();
    }, []);

    return (

        <>
        {SelectRole() === 1 && (
            <Videos/>
        )}
        {SelectRole() === 2 && (
            <VideoAdd/>
        )}
        </>
    )
}

export default Video