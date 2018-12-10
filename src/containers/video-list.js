import React from 'react'
import VideoListItem from '../components/video-list-item'

const VideoList = ({movieList, changedVideo}) => {
  return (
    <div>
      <ul>
        {
          movieList.map(movie => {
            return <VideoListItem key={movie.id} movie={movie} changed={() => changedVideo(movie)}/> 
          })
        }
      </ul>
    </div>
  );

  // function receiveCallBack(movie) {
  //   console.log('Parent:', movie);
  // }
}

export default VideoList;