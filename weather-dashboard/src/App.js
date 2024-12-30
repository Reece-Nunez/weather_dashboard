import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import SevenDayForecast from "./components/SevenDayForecast";
import './App.css'; // Import custom CSS

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State for light/dark mode toggle

  const fetchWeather = async (city) => {
    const API_KEY = "80131d16a99466e131fb3bfdb89dc4fc";

    try {
      const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
      const geocodeResponse = await axios.get(geocodeURL);

      if (geocodeResponse.data.length === 0) {
        console.error("City not found.");
        return;
      }

      const { lat, lon } = geocodeResponse.data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
      const weatherResponse = await axios.get(weatherURL);

      const forecastURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${API_KEY}`;
      const forecastResponse = await axios.get(forecastURL);

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data.daily);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <header className="app-header">
        <div className="theme-toggle-container">
          <label className="theme-toggle-switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
          <p>{darkMode ? "Dark Mode" : "Light Mode"}</p>
        </div>
        <h1>Weather Dashboard</h1>
      </header>
      <SearchBar onSearch={fetchWeather} />
      <div className="weather-container">
        <WeatherCard weather={weather} />
        <SevenDayForecast forecast={forecast} />
      </div>
    </div>
  );
};

export default App;
