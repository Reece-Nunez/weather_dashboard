import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import './App.css';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const API_KEY = "80131d16a99466e131fb3bfdb89dc4fc";

  // Fetch current location weather using Geolocation API
  const fetchCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
          const response = await axios.get(weatherURL);
          setCurrentWeather(response.data);
        } catch (error) {
          console.error("Error fetching current location weather:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  // Fetch weather for a searched city
  const fetchSearchedCityWeather = async (city) => {
    try {
      const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
      const geocodeResponse = await axios.get(geocodeURL);

      if (geocodeResponse.data.length === 0) {
        console.error("City not found.");
        return;
      }

      const { lat, lon } = geocodeResponse.data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
      const response = await axios.get(weatherURL);
      setSearchedWeather(response.data);
    } catch (error) {
      console.error("Error fetching searched city weather:", error);
    }
  };

  useEffect(() => {
    fetchCurrentLocationWeather(); // Fetch current location weather on load
  }, []);

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
      <SearchBar onSearch={fetchSearchedCityWeather} />
      <div className="weather-comparison">
        <WeatherCard weather={currentWeather} title="Your Location" />
        <WeatherCard weather={searchedWeather} title="Searched Location" />
      </div>
    </div>
  );
};

export default App;
