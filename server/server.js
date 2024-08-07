const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const ANGELCAM_API_URL = 'https://api.angelcam.com/v1';

// Load environment variables from .env file
require('dotenv').config();

const ACCESS_TOKEN = process.env.ANGELCAM_ACCESS_TOKEN;

// Middleware to handle JSON responses
app.use(express.json());


// Enable CORS
const cors = require('cors');
app.use(cors());

// Route to get cameras
app.get('/cameras', async (req, res) => {
  try {
    const response = await axios.get(`${ANGELCAM_API_URL}/shared-cameras`, {
      headers: {
        Authorization: `PersonalAccessToken ${ACCESS_TOKEN}`
      }
    });
    // console.log(response); // Log the response data
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching cameras');
  }
});
app.get('/user-details', async (req, res) => {
  try {
    const response = await axios.get(`${ANGELCAM_API_URL}/me`, {
      headers: {
        Authorization: `PersonalAccessToken ${ACCESS_TOKEN}`
      }
    });
    // console.log(response); // Log the response data
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user details');
  }
});

// Route to get live video from a camera
app.get('/cameras/:id/live', async (req, res) => {
  const cameraId = req.params.id;
  try {
    const response = await axios.get(`${ANGELCAM_API_URL}/cameras/${cameraId}/live`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    console.log(response.data); // Log the response data
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching live video');
  }
});

// Route to get recorded video segments from a camera
app.get('/cameras/:id/recordings', async (req, res) => {
  const cameraId = req.params.id;
  try {
    const response = await axios.get(`${ANGELCAM_API_URL}/cameras/${cameraId}/recordings`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    console.log(response.data); // Log the response data
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching recorded videos');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
