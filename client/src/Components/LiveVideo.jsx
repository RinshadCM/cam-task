import React from 'react';

const LiveVideo = ({ camera }) => {
  if (!camera) {
    return <div>Select a camera to view live video</div>;
  }

  const liveStreamUrl = camera.streams.find(stream => stream.format === 'mjpeg').url;

  return (
    <div>
      <h2>Live Video: {camera.name}</h2>
      <img src={liveStreamUrl} alt={`${camera.name} live stream`} width="640" height="480" />
    </div>
  );
};

export default LiveVideo;
