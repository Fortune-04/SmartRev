// import React, {useEffect, useContext, useState} from "react";
import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
// import { useParams } from "react-router";
import ProfileFinder from "../../apis/ProfileFinder";
// import { ProfileContext } from "../context/ProfileContext";

const ProfileForm = (props) =>{
    // const {id} = useParams;
    let history = useHistory()
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
        const updateProfile = await ProfileFinder.put(`/16`,{
            username,
            fullname,
            email,
            phonenumber,
            school,
        })

        // try {
        //     const body = {username, fullname, email, phonenumber, school};
        //     const res = await fetch("http://localhost:4400/profile", {
        //       method: "PUT",
        //       headers: { token: localStorage.token },
        //       body: JSON.stringify(body)
        //     });

        //     console.log(res);
    
        // } catch (err) {
        //     console.error(err.message);
        // }
        history.push("/loginform")
    };

    return(

        <div className="container">
            <div className="card w-75">
                    <h5 className="card-header">Profile</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="fullname" className="col-sm-2 col-form-label">User Name</label>
                                <div className="col-sm-10">
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="fullname"></input>
                                </div>
                            </div>
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
                        </div>
            </div>
        </div>
    );
}

export default ProfileForm