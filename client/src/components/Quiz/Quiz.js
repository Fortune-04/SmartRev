import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import MainStudent from "./MainStudent";
import MainTeacher from "./MainTeacher";
import Temp3 from "../../Temp3";

const Quiz = () => {

    let history = useHistory();
    const [role,setRole] = useState();
    const [id, setId] = useState();

    const handleClick = () => {
        history.push(`/quiz/quizlist`)
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
            <MainStudent handleClick={handleClick}/>
        )}
        {SelectRole() === 2 && (
            // <MainTeacher/>
            <Temp3 id={id}/>
        )}
        </>
    );
}
 
export default Quiz;