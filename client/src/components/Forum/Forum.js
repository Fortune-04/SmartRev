import React, {useState, useEffect} from 'react';
import CreateForumSt from './CreateForumSt';
import CreateForumTc from './CreateForumTc';

const Forum = () => {

    const [role,setRole] = useState();
    // const [id, setId] = useState();

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
            <CreateForumSt/>
        )}
        {SelectRole() === 2 && (
            <CreateForumTc/>
        )}
        </>
    );
}
 
export default Forum;