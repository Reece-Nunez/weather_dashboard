# Weather Dashboard Application

This project is a **Weather Dashboard** application built using **React**. It allows users to view the current weather and a seven-day forecast for their location, as well as search for weather conditions in other cities. The app also includes a dark mode toggle, autocomplete city search, error handling, and responsive design for a smooth user experience.

---

## Features

### 1. Current Location Weather
- Uses the **Geolocation API** to obtain the user's latitude and longitude.
- Fetches current weather and a seven-day forecast from the **OpenWeather API**.
- Displays key weather conditions such as temperature, humidity, and weather icons.

### 2. City Search with Autocomplete
- Integrated **Google Places Autocomplete** for real-time city suggestions.
- Handles user input and keyboard navigation (e.g., up/down arrow keys).
- Allows users to select cities from suggestions or manually enter a city name.
- Displays weather and forecast for the selected or entered city.
- Includes error handling when no input is provided or when a city is not found.

### 3. Dark Mode Toggle
- Enables users to switch between light and dark themes.
- The toggle is easily accessible from the app header.
- Dark mode applies a distinct gradient background and color palette.

### 4. Error Handling with Modals
- Displays informative modals when errors occur (e.g., empty search input or API errors).
- Includes a close button for dismissing the modal.

### 5. Responsive Design
- Mobile-friendly layout with dynamic adjustments for different screen sizes.
- Responsive weather cards and search bar for improved usability on small screens.

### 6. Animations and Enhancements
- Smooth animations for card hover effects, button transitions, and content fade-ins.
- Animated weather icons and interactive UI elements.
- Loader animation to indicate data fetching during searches.

---

## Components

### `App.js`
- The main component that manages global state and API interactions.
- Handles data fetching, error handling, and passes data to child components.

### `SearchBar.js`
- Provides a search input with Google Places Autocomplete integration.
- Supports keyboard navigation and dropdown suggestions.
- Handles search input validation and triggers API requests through callbacks.

### `WeatherCard.js`
- Displays current weather details for a given location.
- Includes temperature, conditions, weather icons, and location name.

### `SevenDayForecast.js`
- Renders a detailed seven-day weather forecast.
- Displays data such as date, high/low temperatures, and condition icons for each day.

### `Modal.js`
- Reusable modal component for displaying error messages.
- Automatically shown when input validation or API errors occur.

---

## Technologies Used

- **React**: For building the user interface.
- **Axios**: For making API requests.
- **OpenWeather API**: For retrieving real-time weather data.
- **Google Places Autocomplete**: For enhanced city search functionality.
- **CSS**: For styling and responsive design.
- **Geolocation API**: For retrieving the user's current location.

---

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>

2. Navigate to the project directory:
   ```sh
   cd weather-dashboard

3. install dependencies:
   ```sh
   npm install

4. Start the application:
   ```sh
   npm start

5. Open the app in your browser at http://localhost:3000