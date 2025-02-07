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

  const API_KEY = "80131d16a99466e131fb3bfdb89dc4fc";

  // Fetch current location weather and forecast
  const fetchCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
          const forecastURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly,alerts&appid=${API_KEY}`;

          const weatherResponse = await axios.get(weatherURL);
          const forecastResponse = await axios.get(forecastURL);

          setCurrentWeather(weatherResponse.data);
          setCurrentForecast(forecastResponse.data.daily);
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

    if (!city.trim()) {
      setErrorMessage("Please enter a city name.");
      setShowModal(true);
      return;
    }

    try {
      const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
      const geocodeResponse = await axios.get(geocodeURL);

      if (geocodeResponse.data.length === 0) {
        setErrorMessage("City not found.");
        setShowModal(true);
        return;
      }

      const { lat, lon } = geocodeResponse.data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
      const forecastURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${API_KEY}`;

      const weatherResponse = await axios.get(weatherURL);
      const forecastResponse = await axios.get(forecastURL);

      setSearchedWeather(weatherResponse.data);
      setSearchedForecast(forecastResponse.data.daily);
    } catch (error) {
      setErrorMessage("An error occurred while fetching weather data.");
      setShowModal(true);
      console.error("Error fetching searched city weather:", error);
    }
  };

  useEffect(() => {
    fetchCurrentLocationWeather(); // Fetch current location weather on load
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
