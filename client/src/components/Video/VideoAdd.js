import React, {useState, useEffect, useContext} from 'react'
// import Navbar from '../Navbar'
import VideoFinder from "../../apis/VideoFinder"
import { VideoContext } from '../../context/VideoContext'


const VideoAdd = (props) => {

    const {addVideo} = useContext(VideoContext)
    const {videos, setVideo} = useContext(VideoContext);
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await VideoFinder.post("/", {
                title,
                link,
            });
            // console.log(response.data.data);
            console.log(response)
            addVideo(response.data.data.video);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await VideoFinder.get("/")
                setVideo(response.data.data.video)
                console.log(response)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[])

    const handleDelete = async (id) =>{
        try{
            const response = await VideoFinder.delete(`/${id}`)
            setVideo(videos.filter(video => {
                return video.videoid !== id
            }))
            console.log(response);
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            {/* <Navbar /> */}
            <div className="container">
                <div className="card">
                    <h5 className="card-header">Add Video Link</h5>
                    <div className="card-body">
                        <div className="mb-3 row">
                            <label htmlFor="fullname" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-5">
                                <input value={title} onChange={e =>setTitle(e.target.value)} type="text" className="form-control" id="fullname"></input>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="age" className="col-sm-2 col-form-label">Link</label>
                            <div className="col-sm-5">
                                <input value={link} onChange={e =>setLink(e.target.value)} type="text" className="form-control" id="email"></input>
                            </div>
                        </div>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary mb-3">Upload</button>
                    </div>
                </div>

                <div className="list-group">
                    <table className="table table-hover table-dark">
                        <thead>
                            <tr className="bg-primary">
                                <th scope="col">Title</th>
                                <th scope="col">Link</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos && videos.map((video) => {
                                return (
                                    <tr key={video.videoid}>

                                    <td>{video.title}</td>
                                    <td>{video.link}</td>
                                    <td>
                                        <button  className="btn btn-info">Update</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(video.videoid)} className="btn btn-danger">Delete</button>
                                    </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default VideoAdd