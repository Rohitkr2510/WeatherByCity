// app.js
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Use cors middleware to enable CORS

app.post('/getWeather', async (req, res) => {
    console.log(req.body);
  try {
    const { cities } = req.body;

    if (!cities || !Array.isArray(cities)) {
      return res.status(400).json({ error: 'Invalid input. Please provide an array of cities.' });
    }

    const weatherPromises = cities.map(async (city) => {
      const weather = await getWeather(city);
      return { [city]: weather };
    });

    const results = await Promise.all(weatherPromises);
    const weatherData = Object.assign({}, ...results);

    res.json({ weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getWeather(city) {
  // You can replace this with the actual weather API call
  // For example, using OpenWeatherMap API
  const apiKey = '04beeb3dda1d5dc44aa5d009b9dfbe53';
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const temperature = response.data.main.temp;
    return `${temperature}°C`;
  } catch (error) {
    console.error(`Error fetching weather for ${city}: ${error.message}`);
    return 'N/A';
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
