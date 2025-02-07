import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReactAnimatedWeather from "react-animated-weather";

const WeatherCard = ({ weather, title }) => {
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  if (!weather) return null;

  const { name, main, weather: weatherData, sys, dt } = weather;
  const weatherCondition = weatherData[0]?.main || "Unknown";

  const convertToCelsius = (tempF) => ((tempF - 32) * 5) / 9;

  const displayedTemp = isFahrenheit
    ? `${main.temp.toFixed(0)}°F`
    : `${convertToCelsius(main.temp).toFixed(0)}°C`;

  const displayedHighTemp = isFahrenheit
    ? `${main.temp_max.toFixed(0)}°F`
    : `${convertToCelsius(main.temp_max).toFixed(0)}°C`;

  const displayedLowTemp = isFahrenheit
    ? `${main.temp_min.toFixed(0)}°F`
    : `${convertToCelsius(main.temp_min).toFixed(0)}°C`;

  const date = new Date(dt * 1000);
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const iconMapping = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Rain: "RAIN",
    Snow: "SNOW",
    Drizzle: "SLEET",
    Thunderstorm: "WIND",
    Mist: "FOG",
    Fog: "FOG",
    Default: "PARTLY_CLOUDY_DAY",
  };

  const colorMapping = {
    Clear: "#f39c12",
    Clouds: "#d3d3d3",
    Rain: "#3498db",
    Drizzle: "#3498db",
    Thunderstorm: "#3498db",
    Fog: "#95a5a6",
    Snow: "#ffffff",
    Default: "#999999",
  };

  const iconColor = colorMapping[weatherCondition] || colorMapping.Default;

  return (
    <div className="card weather-card">
      <h2>{title}</h2>
      <div className="card-header">
        <div className="location">
          <FaMapMarkerAlt /> {name}, {sys.country}
        </div>
        <div className="toggle-container">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isFahrenheit}
              onChange={() => setIsFahrenheit(!isFahrenheit)}
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
          <ReactAnimatedWeather
            icon={iconMapping[weatherCondition]}
            color={iconColor}
            size={80}
            animate={true}
          />
          <p className="condition">{weatherData[0]?.description || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
