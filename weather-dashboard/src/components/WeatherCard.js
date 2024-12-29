import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import location icon from react-icons

const WeatherCard = ({ weather }) => {
  // State for toggling between Fahrenheit and Celsius
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  if (!weather) return null;

  const { name, main, weather: weatherData, sys, dt } = weather; // Include `sys` for country
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData[0].icon}@2x.png`;

  // Function to convert Fahrenheit to Celsius
  const convertToCelsius = (tempF) => ((tempF - 32) * 5) / 9;

  // Determine the displayed temperature
  const displayedTemp = isFahrenheit
    ? `${main.temp.toFixed(0)}°F`
    : `${convertToCelsius(main.temp).toFixed(0)}°C`;

  const displayedHighTemp = isFahrenheit
    ? `${main.temp_max.toFixed(0)}°F`
    : `${convertToCelsius(main.temp_max).toFixed(0)}°C`;

  const displayedLowTemp = isFahrenheit
    ? `${main.temp_min.toFixed(0)}°F`
    : `${convertToCelsius(main.temp_min).toFixed(0)}°C`;

  // Toggle handler
  const toggleTemperatureUnit = () => {
    setIsFahrenheit((prev) => !prev);
  };

  // Get day and formatted date
  const date = new Date(dt * 1000); // Convert Unix timestamp to JS Date
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card weather-card">
      <div className="card-header">
        <div className="location">
          <FaMapMarkerAlt /> {name}, {sys.country} {/* Add country */}
        </div>
        <div className="toggle-container">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isFahrenheit}
              onChange={toggleTemperatureUnit}
            />
            <span className="slider"></span>
          </label>
          <p>{isFahrenheit ? "F" : "C"}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="left-section">
          <h1 className="day">{day}</h1>
          <p className="date">{formattedDate}</p>
          <p className="temp">{displayedTemp}</p>
          <p className="high-low">
            High: {displayedHighTemp} / Low: {displayedLowTemp}
          </p>
        </div>
        <div className="right-section">
          <img src={iconUrl} alt={weatherData[0].description} />
          <p className="condition">{weatherData[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
