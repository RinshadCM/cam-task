import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CameraView from './Components/CameraView';
import './App.css';
import RecordedList from './Components/RecordedSegments';

const App = () => {
  const [cameras, setCameras] = useState([]);
  const [username, setUsername] = useState("User");
  const [selectedRoom, setSelectedRoom] = useState('Living Room');
  const [activeCamera, setActiveCamera] = useState(null);

  useEffect(() => {
    axios.get('/api/cameras')
      .then(response => {
        setCameras(response.data.results);
        if (response.data.results.length > 0) {
          setActiveCamera(response.data.results[0]);
        }
      })
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    axios.get('/api/user-details')
      .then(response => {
        console.log(response?.data);
        setUsername(response?.data?.first_name);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Hello, {username || 'User'}</h1>
        <p>Monitor your cameras now.</p>
      </header>
      <div className="camera-container">
        <div className="active-cameras">
          <span>{cameras.length} Camera Active</span>
        </div>
        <CameraView cameras={cameras} activeCamera={activeCamera} />
      </div>
      <RecordedList activeCamera={activeCamera} />
    </div>
  );
};

export default App;