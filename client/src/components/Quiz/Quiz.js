import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import MainStudent from "./MainStudent";
import MainTeacher from "./MainTeacher";

const Quiz = () => {

    let history = useHistory();
    const [role,setRole] = useState();
    const [id, setId] = useState();
    const [mathCode, setMathCode] = useState();
    const [phyCode, setPhyCode] = useState();
    const [chemCode, setChemCode] = useState();
    const [bioCode, setBioCode] = useState();

    const handleClick = (code, sub) => {
        history.push(`/quiz/quizlist/${code}/${sub}`)
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
              setMathCode(parseData.data.profile[0].math)
              setPhyCode(parseData.data.profile[0].physics)
              setChemCode(parseData.data.profile[0].chemistry)
              setBioCode(parseData.data.profile[0].biology)

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
            <MainStudent handleClick={handleClick} mathCode={mathCode} math="mathematics" phyCode={phyCode} phy="physics" chemCode={chemCode} chem="chemistry" bioCode={bioCode} bio="biology"/>
        )}
        {SelectRole() === 2 && (
            <MainTeacher id={id}/>
        )}
        </>
    );
}
 
export default Quiz;