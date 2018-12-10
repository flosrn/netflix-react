import React from 'react';

const VIDEO_BASE_URL = "https://www.youtube.com/embed/";

const Video = ({videoId}) => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="embed-responsive-item" src={`${VIDEO_BASE_URL}${videoId}`} frameBorder="0"></iframe>
    </div>
  )
}

export default Video;