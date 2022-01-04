import React from 'react'
// import Navbar from "../components/Navbar";
import MainMenu from '../components/Other/MainMenu';

const Main = ({setAuth}) =>{

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }

    return (
        <div>
            {/* <Navbar/> */}
            <MainMenu/>
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
        </div>
    )

}

export default Main