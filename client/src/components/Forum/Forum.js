import React from 'react';
import { Link } from "react-router-dom";

const Forum = () => {
    return (
        <div className="container">
            
            <Link to='/forum/create'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Create Forum</h5>
                    </div>
                </div>
            </Link>

            <Link to='/forum'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">View Forum</h5>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default Forum;