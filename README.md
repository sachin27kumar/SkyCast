# SkyCast Weather Website

SkyCast is a responsive weather forecast website that provides users with current weather details and a 4-day forecast for any city. The website allows users to search for a city's weather or use their current location to get real-time weather data. 

## Features
- **Current Weather**: Displays current temperature, weather condition, humidity, wind speed, pressure, visibility, and feels-like temperature for the searched city.
- **4-Day Forecast**: Provides a weather forecast for the next four days, including icons for weather conditions, temperature, humidity, and wind speed.
- **Search History**: Stores previously searched cities and allows users to revisit them.
- **Geolocation**: Allows users to get the weather forecast based on their current location using the browser's geolocation API.
- **Responsive Design**: Built using Tailwind CSS for a responsive and modern user interface.

## Live Demo
You can try the live version of SkyCast at: https://github.com/sachin27kumar/SkyCast

## Usage

1. **Search City Weather**: Enter the name of a city in the search box and click on "Search" to get the current weather and a 4-day forecast.
2. **Current Location Weather**: Click on "Current Location" to get weather information for your current location.
3. **View Search History**: When you focus on the search input box, your previously searched cities will be displayed for quick access.

## Technologies Used

- **HTML5**: Markup for structuring the web content.
- **CSS (Tailwind CSS)**: Used for responsive styling.
- **JavaScript (ES6)**: Handles the logic for weather data fetching, history management, and UI updates.
- **OpenWeatherMap API**: Provides weather data for current conditions and forecasts.
- **Browser Geolocation API**: Retrieves the user’s current location to fetch weather information.

## API Integration

The website uses the [OpenWeatherMap API](https://openweathermap.org/api) to retrieve weather data. You'll need an API key to make requests. 

To use your own API key:

1. Sign up for an API key at OpenWeatherMap.
2. Replace the value of `myAPI` in `index.html` with your key:
    ```javascript
    const myAPI = 'your-api-key-here';
    ```

## File Structure

skycast-weather/
│
├── images/                  # Contains background images and error image
├── style.css                # Custom styles for the website
├── index.html               # Main HTML structure of the website
└── README.md                # Project documentation
