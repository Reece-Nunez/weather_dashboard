const express = require('express');
const axios = require('axios');
require('dotenv').config({ path: './.env' });


const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

const API_KEY = process.env.WEATHER_API_KEY;
console.log("Weather API Key:", process.env.WEATHER_API_KEY);


app.post('/weather', async (req, res) => {
    const { city, latitude, longitude } = req.body;

    try {
        if (city) {
            // Fetch weather data by city name
            const geocodeResponse = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
            );

            if (geocodeResponse.data.length === 0) {
                return res.status(404).json({ message: 'City not found' });
            }

            const { lat, lon } = geocodeResponse.data[0];
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
            );

            return res.json(weatherResponse.data);
        } else if (latitude && longitude) {
            // Fetch weather data by coordinates
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
            );

            return res.json({ currentWeather: weatherResponse.data });
        }

        return res.status(400).json({ message: 'Invalid request parameters' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;
