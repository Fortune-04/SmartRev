import { Link } from "react-router-dom";

const Quiz = () =>{
    
    return (
        <div className="container">
            
            <Link to='/quiz/answer'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Answer Quiz</h5>
                    </div>
                </div>
            </Link>

            <Link to='/quiz/create'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Create Quiz</h5>
                    </div>
                </div>
            </Link>

        </div>
    )

}

export default Quiz;