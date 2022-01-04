import React,{useState, createContext} from 'react';

export const VideoContext = createContext();

export const VideoContextProvider = (props) =>{
    const [videos, setVideo] =useState([]);

        const addVideo = (video) =>{
            setVideo([...videos, video])
        }
    return(
        <VideoContext.Provider value={{videos, setVideo, addVideo}}>
            {props.children}
        </VideoContext.Provider>
    );
};


