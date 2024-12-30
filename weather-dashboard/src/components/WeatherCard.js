import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import location icon
import ReactAnimatedWeather from "react-animated-weather"; // Import animated weather icons

const WeatherCard = ({ weather }) => {
  // State for toggling between Fahrenheit and Celsius
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  // Safeguard: Return null if `weather` is not properly passed
  if (!weather || !weather.weather || !weather.weather[0]) {
    return null;
  }

  const { name, main, weather: weatherData, sys, dt } = weather;
  console.log(weather);
  const weatherCondition = weatherData[0]?.main || "Unknown"; // Safeguard against undefined

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

  // Map OpenWeatherMap conditions to `react-animated-weather` icons
  const iconMapping = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Rain: "RAIN",
    Snow: "SNOW",
    Drizzle: "SLEET",
    Thunderstorm: "WIND",
    Mist: "FOG",
    Fog: "FOG",
    Smoke: "FOG",
    Haze: "FOG",
    Dust: "FOG",
    Sand: "FOG",
    Ash: "FOG",
    Squall: "WIND",
    Tornado: "WIND",
  };

  // Map weather conditions to colors
  const colorMapping = {
    Clear: "#f39c12", // Orange for sunny
    Clouds: "#d3d3d3", // Light gray for cloudy
    Rain: "#3498db", // Blue for raining
    Drizzle: "#3498db", // Blue for drizzle
    Thunderstorm: "#3498db", // Blue for thunderstorm
    Fog: "#95a5a6", // Gray for foggy
    Mist: "#95a5a6", // Gray for mist
    Snow: "#ffffff", // White for snow
    Default: "#999999", // Default color
  };

  const iconColor = colorMapping[weatherCondition] || colorMapping.Default;

  return (
    <div className="card weather-card">
      <h2>Today's Weather</h2>
      <div className="card-header">
        <div className="location">
          <FaMapMarkerAlt /> {name}, {sys.country}
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
          <ReactAnimatedWeather
            icon={iconMapping[weatherCondition] || "PARTLY_CLOUDY_DAY"}
            color={iconColor} // Apply the dynamically mapped color
            size={80} // Size of the icon
            animate={true} // Enable animation
          />
          <p className="condition">{weatherData[0]?.description || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
