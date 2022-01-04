import React,{useState, createContext} from "react";

export const ProfileContext = createContext();

export const ProfileContextProvider = (props) =>{
    const [profile, setProfile]= useState([]);

    return(
        <ProfileContext.Provider value={{profile, setProfile}}>
            {props.children}
        </ProfileContext.Provider>
    );
};