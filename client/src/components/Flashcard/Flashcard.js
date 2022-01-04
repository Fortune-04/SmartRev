import { Link } from "react-router-dom";

const Flashcard = () =>{
    
    return (
        <div className="container">
            
            <Link to='/flashcard/create'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Mathematics</h5>
                    </div>
                </div>
            </Link>

            <Link to='/flashcard/create'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Physics</h5>
                    </div>
                </div>
            </Link>

            <Link to='/flashcard/create'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Chemistry</h5>
                    </div>
                </div>
            </Link>

            <Link to='/flashcard/create'>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Biolody</h5>
                    </div>
                </div>
            </Link>
        </div>
    )

}

export default Flashcard;