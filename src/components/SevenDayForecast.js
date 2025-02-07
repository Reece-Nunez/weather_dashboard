import React from "react";

const SevenDayForecast = ({ forecast, title }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="card seven-day-forecast">
      <h2>{title}</h2>
      <div className="forecast-container">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000); // Convert Unix timestamp
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const maxTemp = `${day.temp.max.toFixed(0)}°F`;
          const minTemp = `${day.temp.min.toFixed(0)}°F`;
          const condition = day.weather[0].description;

          return (
            <div key={index} className="forecast-day">
              <p className="day-name">{dayName}</p>
              <p className="temp">
                {maxTemp} / {minTemp}
              </p>
              <p className="condition">{condition}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SevenDayForecast;
