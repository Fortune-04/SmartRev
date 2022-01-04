import React from "react";
import { Link } from "react-router-dom";

const Submission = () => {
    return(
        <div className="container">
            
            <Link to='/submission/subcreate'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Create Submission </h5>
                    </div>
                </div>
            </Link>
            <Link to='/submission/subdecs'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Submit File</h5>
                    </div>
                </div>
            </Link>
            <Link to='/submission/sublist'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Submit List</h5>
                    </div>
                </div>
            </Link>

        </div>
    )

}

export default Submission;