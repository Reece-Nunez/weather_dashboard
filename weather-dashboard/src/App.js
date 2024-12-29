import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import './App.css'; // Import custom CSS

const App = () => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    const API_KEY = "80131d16a99466e131fb3bfdb89dc4fc";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;

    try {
      const response = await axios.get(URL);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className="center-screen">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      <WeatherCard weather={weather} />
    </div>
  );
};

export default App;
