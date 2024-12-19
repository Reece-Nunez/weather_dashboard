import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const originalWebSocket = window.WebSocket;
  window.WebSocket = function (...args) {
    if (args[0].includes("devtools")) {
      console.warn("Suppressed WebSocket attempt:", args);
      return;
    }
    console.log("WebSocket attempted with:", args);
    return new originalWebSocket(...args);
  };


  // Function to fetch weather data
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://silver-goggles-v4vgvvxj9p7cqgg-8000.app.github.dev/api/weather/${city}/`
      );
      setWeather(response.data);
      setError(""); // Clear any previous errors
    } catch (err) {
      setWeather(null);
      setError("City not found. Please try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {weather && (
          <div>
            <h2>Weather in {weather.city}</h2>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Description: {weather.description}</p>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
