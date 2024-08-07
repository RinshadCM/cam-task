import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecordedList = ({ activeCamera }) => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (activeCamera && activeCamera.has_recording) {
      axios.get(`/api/cameras/${activeCamera.id}/recordings`)
        .then(response => setRecordings(response.data.results))
        .catch(error => console.error(error));
    }
  }, [activeCamera]);

  if (!activeCamera || !activeCamera.has_recording) {
    return null;
  }

  return (
    <div className="recorded-list">
      <h2>Recorded Segments</h2>
      <ul>
        {recordings.map(recording => (
          <li key={recording.id}>
            {new Date(recording.start_time).toLocaleString()} - {new Date(recording.end_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordedList;