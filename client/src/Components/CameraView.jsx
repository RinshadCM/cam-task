import React from 'react';

const CameraView = ({ cameras, activeCamera }) => {
  if (!activeCamera) {
    return <div>No cameras available</div>;
  }

  const renderCamera = (camera, index) => {
    const streamUrl = camera.streams.find(stream => stream.format === 'mjpeg').url;
    return (
      <div key={camera.id} className={`camera-view ${index === 0 ? 'main-view' : 'sub-view'}`}>
        <h3>Cam {index + 1}</h3>
        <img src={streamUrl} alt={`${camera.name} live stream`} />
        <div className="camera-info">
          <span className="live-indicator">Live</span>
          <span className="timestamp">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="camera-grid">
      {renderCamera(activeCamera, 0)}
      {cameras.slice(1, 3).map((camera, index) => renderCamera(camera, index + 1))}
    </div>
  );
};

export default CameraView;