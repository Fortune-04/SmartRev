import React from 'react'
// import Navbar from '../Navbar'
import { useHistory } from 'react-router';

const VideoNav = () =>{

    let history = useHistory()

    const handleUpdate = () => {
        history.push(`/video`)
    };
    
    const handleUpdate2 = () => {
        history.push(`/videoadd`)
    };

    return(
        <div>
            {/* <Navbar/> */}
            <div className="container">
                
                <div className="card" onClick={()=> handleUpdate()} style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Watch Video</h5>
                    </div>
                </div>

                <div className="card" onClick={()=> handleUpdate2()} style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Add Video</h5>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default VideoNav