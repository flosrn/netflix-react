import React from 'react'

const VideoDetail = (props) => {
  return (
    <div>
      <h1>{props.currentMovie.title}</h1>
      <p>{props.currentMovie.overview}</p>
    </div>
  )
}

export default VideoDetail;