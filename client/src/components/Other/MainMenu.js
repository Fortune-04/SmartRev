import React from 'react'
import { useHistory } from 'react-router';
import './MainMenu.css';

const MainMenu = () =>{

    let history = useHistory()

    const handleUpdate = () => {
        history.push(`/profile/1`)
    };

    const handleUpdate2 = () => {
        history.push(`/videonav`)
    };

    const handleUpdate3 = () => {
        history.push(`/note`)
    };

    const handleUpdate4 = () => {
        history.push(`/flashcard`)
    };

    const handleUpdate5 = () => {
        history.push(`/quiz`)
    };


    return(
        <div className="container">
            
            <div className="card" onClick={()=> handleUpdate()} style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Profile</h5>
                </div>
            </div>

            <div className="card" onClick={()=> handleUpdate2()} style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Teaching Video</h5>
                </div>
            </div>

            <div className="card" onClick={()=> handleUpdate3()} style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Notes</h5>
                </div>
            </div>

            <div className="card" onClick={()=> handleUpdate4()} style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Flashcards</h5>
                </div>
            </div>

            <div className="card" onClick={()=> handleUpdate5()} style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Quiz</h5>
                </div>
            </div>

        </div>
    )
}

export default MainMenu