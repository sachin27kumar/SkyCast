let searchBtn = document.getElementById("searchBtn");
let inputBox = document.getElementById("inputBox");
let myLoctionBtn = document.getElementById("myLocationBtn");
let cityName = document.getElementById("cityName");
let todayWeatherIcon = document.getElementById("todayWeatherIcon");
let todayTemp =document.getElementById("todayTemp");
let todayWeather = document.getElementById("todayWeather");
let todayDate = document.getElementById("todayDate");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let visibility = document.getElementById("visibility");
let feelsTemp = document.getElementById("feelsTemp");
let wind = document.getElementById("wind");

let fIcon1 = document.getElementById("fIcon1");

const myAPI = "36ab0f335c5198fdd70cf7559d8b7413";

 async function checkWeather(city){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPI}`;
    let weatherData = await fetch(url).then(response => response.json());
    // console.log(weatherData);
    cityName.innerHTML = `${weatherData.name}`;
    todayTemp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} °C`;
    todayWeather.innerHTML = `${weatherData.weather[0].main}`;
    
    switch(weatherData.weather[0].main){
        case "Clear" :
            todayWeatherIcon.innerHTML = "☀️";
            break;
        case "Clouds" :
            todayWeatherIcon.innerHTML = "🌥️";
            break;
        case "Rain" :
            todayWeatherIcon.innerHTML = "🌧️";
            break;
        case "Snow" :
            todayWeatherIcon.innerHTML = "🌨️";
            break;
        case "Mist" :
            todayWeatherIcon.innerHTML = "💨";
            break;
    }
    
    let today = new Date();
    todayDate.innerHTML = `${today.toDateString()}`;

    humidity.innerHTML = `${weatherData.main.humidity}%`;
    pressure.innerHTML = `${weatherData.main.pressure}hPa`;
    visibility.innerHTML = `${(weatherData.visibility)/1000}Km`;
    feelsTemp.innerHTML = `${Math.round(weatherData.main.feels_like - 273.15)}°C`;
    wind.innerHTML = `${weatherData.wind.speed}km/h`;

}

async function forecastWeather(city){
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myAPI}`;
      let forecastData = await fetch(url).then(response => response.json());
      console.log(forecastData);

}

// Adding event listener to the search button
searchBtn.addEventListener("click", () => {
    let city = inputBox.value;
    if (city) {
        checkWeather(city);
        forecastWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});
