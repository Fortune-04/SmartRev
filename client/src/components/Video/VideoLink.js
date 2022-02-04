import React, {useEffect, useState, useContext } from 'react'
// import YouTube from 'react-youtube';
// import "./VideoLink.css"
import ReactPlayer from 'react-player'
import VideoFinder from "../../apis/VideoFinder"
import { VideoContext } from '../../context/VideoContext'

// class VideoLink extends Component {

//     videoOnReady(event) {
//         // access to player in all event handlers via event.target
//         event.target.pauseVideo();
//         console.log(event.target)
//     }

//     render() {
//       const opts = {
//         height: '390',
//         width: '640',
//         playerVars: {
//           // https://developers.google.com/youtube/player_parameters
//           autoplay: 1,
//         },
//       };

//     // const {videoId} = this.props

//       return (
//         <div>
//           {/* <div className="topic">
//             <h4>What is Science</h4>
//           </div> */}
//           <div className="video-container">
//           <YouTube videoId="yiTVkCy7DwA" opts={opts} onReady={this._videoOnReady} />
//           </div>
//           {/* <div className="topic2">
//             <h4>Introduction to Physics</h4>
//           </div> */}
//           <div className="video-container2">
//           <YouTube videoId="2vYI2NcVsXY" opts={opts} onReady={this._videoOnReady} />
//           </div>
//         </div>
//       );
//     }

// }

const VideoLink = ({code, id}) => {

  // const { videos, setVideo } = useContext(VideoContext);
  const [ videos, setVideos ] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await VideoFinder.get(`/${code}`);
        setVideos(response.data.data.video)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
    if(code){
      fetchData();
    }
  },[code]);
  
  console.log(code)

  return (
    <div>
      <div className="container-sm">
      {videos && videos.map((video) => {
        return (
            <div className="card w-50" key={video.videoid}>
              <h5 className="card-header text-white" style={{background: '#0782cb'}}>{video.title}</h5>
              <div className="card-body">
                <div className="mb-3 row">
                  <ReactPlayer url={video.link} controls={true} />
                </div>
              </div>
            </div>
        );
      })}
      {/* <div className="container">
        <div className="card">
          <h5 className="card-header">Profile</h5>
          <div className="card-body">
            <div className="mb-3 row">
              <ReactPlayer url="https://www.youtube.com/watch?v=tNinLc45aIU" controls={true} />
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className='App'>
        <header className="App-header">
          <ReactPlayer url="https://www.youtube.com/watch?v=tNinLc45aIU" controls={true} />
        </header>
      </div> */}
      </div>
    </div>
  )
}

export default VideoLink