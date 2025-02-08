import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import SevenDayForecast from "./components/SevenDayForecast";
import Modal from "./components/Modal";
import './App.css';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [searchedForecast, setSearchedForecast] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  // Fetch current location weather and forecast
  const fetchCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await axios.post('https://nhmlqcm34h.execute-api.us-east-1.amazonaws.com/dev/weather', {
                    latitude,
                    longitude,
                });
                setCurrentWeather(response.data.currentWeather);
                setCurrentForecast(response.data.forecast);
            } catch (error) {
                console.error("Error fetching current location weather:", error);
            }
        },
        (error) => {
            console.error("Geolocation error:", error);
        }
    );
};


  // Fetch weather and forecast for a searched city
  const fetchSearchedCityWeather = async (city) => {
    try {
        const response = await axios.post('https://nhmlqcm34h.execute-api.us-east-1.amazonaws.com/dev/weather', { city });
        setSearchedWeather(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};


  useEffect(() => {
    fetchCurrentLocationWeather();
  }, []);

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Modal show={showModal} onClose={() => setShowModal(false)} message={errorMessage} />
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
        <div className="title">
          <h1>Weather Dashboard</h1>
        </div>
      </header>
      
      <SearchBar
      onSearch={fetchSearchedCityWeather}
      onError={(message) => {
        setErrorMessage(message);
        setShowModal(true);
      }} 
      />

      <div className="weather-comparison">
        <div className="weather-column">
          <WeatherCard weather={currentWeather} title="Your Location" />
          <SevenDayForecast forecast={currentForecast} title="Your Location Forecast" />
        </div>
        <div className="weather-column">
          <WeatherCard weather={searchedWeather} title="Searched Location" />
          <SevenDayForecast forecast={searchedForecast} title="Searched Location Forecast" />
        </div>
      </div>
    </div>
  );
};

export default App;
