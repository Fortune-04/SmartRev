import React, {useState, useEffect} from 'react';
import ProfileSt from "./ProfileSt";
import ProfileTc from "./ProfileTc";

const Profile = () => {

    const [role,setRole] = useState();
    const [id, setId] = useState();

    useEffect(() =>{
        const getProfile = async () => {
            try {
              const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
              });
        
              const parseData = await res.json();
              setRole(parseData.data.profile[0].usertype);
              setId(parseData.data.profile[0].userid);

            } catch (err) {
              console.error(err.message);
            }
        };

        getProfile();
    }, []);

    const SelectRole = () => {
        if(role === "student"){
            return 1;
        }else if(role === "teacher"){
            return 2;
        }
    };

    return (
        <>
        {SelectRole() === 1 && (
            <ProfileSt/>
        )}
        {SelectRole() === 2 && (
            <ProfileTc/>
        )}
        </>
    );
}
 
export default Profile;