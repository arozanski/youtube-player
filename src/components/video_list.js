import React, { Component } from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem
        video={ video }
        key={ video.etag }
        onVideoSelect={ props.onVideoSelect }
      />
    );
  });

  return (
    <ul className="list-group">
      {videoItems}
    </ul>
  );
}

export default VideoList;
