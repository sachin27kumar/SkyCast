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
let forecastHeading = document.getElementById("forecastHeading");

let forecastDiv = document.getElementById("forecastDiv");
let forecastIcon = document.getElementById("forecastIcon");
let forecastTemp = document.getElementById("forecastTemp");
let forecastDate = document.getElementById("forecastDate");

const historyDiv = document.getElementById('historyDiv');
const historyList = document.getElementById('historyList');

const errorDiv = document.getElementById("errorDiv");
const dataSection = document.getElementById("dataSection");

const myAPI = "36ab0f335c5198fdd70cf7559d8b7413";

//function to check weather based on city name
 async function checkWeather(city){
    try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPI}`;
        let weatherData = await fetch(url).then(response => response.json());

        // checking for 404 error
        if(weatherData.cod === `404`){
              errorDiv.classList.remove("hidden");
              dataSection.classList.add("hidden");
        }
        // console.log(weatherData);
        cityName.innerHTML = `${weatherData.name}`;
        todayTemp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} °C`;
        todayWeather.innerHTML = `${weatherData.weather[0].main}`;
        
        //icon update as weather condition changes
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
        
        let today = new Date();//getting today date
        todayDate.innerHTML = `${today.toDateString()}`;
    
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        pressure.innerHTML = `${weatherData.main.pressure}hPa`;
        visibility.innerHTML = `${(weatherData.visibility)/1000}Km`;
        feelsTemp.innerHTML = `${Math.round(weatherData.main.feels_like - 273.15)}°C`;
        wind.innerHTML = `${weatherData.wind.speed}km/h`;
    
        // Show data section if city is found
        errorDiv.classList.add("hidden");
        dataSection.classList.remove("hidden");
    }
    catch(error){
         console.log(error)
    }
}

//getting next 4 days forecast weather data using forecast api
async function forecastWeather(city){
    try{
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myAPI}`;
        let forecastData = await fetch(url).then(response => response.json());

         // Checking for 404 error
         if (forecastData.cod === "404") {
            errorDiv.classList.remove("hidden");
            dataSection.classList.add("hidden");
            console.log("City not found in forecast data");
            return;  // Exit the function if city not found
        }

         // Processing if city is found
        let dailyForecast = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
        let fiveDayForecast = dailyForecast;
        console.log(fiveDayForecast)
        forecastDiv.innerHTML = "";
        for(let i = 1; i<5; i++){
           let day = fiveDayForecast[i];
           let temp = `${Math.round(day.main.temp - 273.15)}°C`;
           let date = new Date(day.dt_txt);
           const options = {day: 'numeric', month: 'short'};
           const displayDate = date.toLocaleDateString('en-US', options);
           let humidity = `${day.main.humidity}%`;
           let windSpeed = `${Math.round(day.wind.speed)}km/h`;
           
           //changing icon for every next four days according to weather
           let icon;
           switch(day.weather[0].main){
              case "Clear" :
                  icon = "☀️";
                  break;
              case "Clouds" :
                  icon = "🌥️";
                  break;
              case "Rain" :
                  icon = "🌧️";
                  break;
              case "Snow" :
                  icon = "🌨️";
                  break;
              case "Mist" :
                  icon = "💨";
                  break;
          }
  
          //changing innerhtml of the forecast div
           forecastDiv.innerHTML += `<div class="grid grid-cols-5 items-center text-teal-950 font-semibold text-xs md:text-lg">
                                      <p id="forecastDate">${displayDate}</p>
                                      <p class="text-xl md:text-3xl">${icon}</p>
                                      <p id="forecastTemp">${temp}</p>
                                      <p>💧 ${humidity}</p>
                                      <p>💨 ${windSpeed}</p>
                                    </div>`
        }
    }
    catch(error){
         console.log(error);
    }   
}

// Adding event listener to the search button
searchBtn.addEventListener("click", () => {
    let city = inputBox.value;
    savedHistory(city);
    if (city) {
        checkWeather(city);
        forecastWeather(city);
        forecastHeading.classList.add("hidden");
        errorDiv.classList.add("hidden");
    } else {
        alert("Please enter a city name!");
    }
});


// Getting lat and lon when user clicks the current location button
myLoctionBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log(lat, lon);
            weatherByLocation(lat, lon); // Calls the function to get city name and weather
        }, () => {
            alert("Unable to get your location");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Function to get city name by latitude and longitude
async function weatherByLocation(lat, lon) {
    try{
        let url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${myAPI}`;
        let locationData = await fetch(url).then(response => response.json());
        let city = locationData[0].name; // Getting the city name
            // console.log(city);
            savedHistory(city);
    
         // Calling the functions to display weather and forecast
         checkWeather(city);
         forecastWeather(city);
    }
    catch(error){
        console.log(error);
    }
}

//saving searched city names to the local storage
function savedHistory(city) {
    // Getting previous history from localStorage
    let previousHistory = localStorage.getItem("record");
    
    // Parsing the previous history if it exists, or initialize an empty array
    let record = previousHistory ? JSON.parse(previousHistory) : [];
    
    // Checking if the city already exists in the array
    const cityIndex = record.indexOf(city);

    if (cityIndex !== -1) {
        // If the city exists, remove it from the array and again add it to the begining of the array
        record.splice(cityIndex, 1);
        record.unshift(city);
    } else {
        // If the city does not exist, add it to the array
        record.unshift(city);
    }

    // Saving the updated array back to localStorage
    localStorage.setItem("record", JSON.stringify(record));
    updateHistoryDiv();
}

// Function to update the history list
function updateHistoryDiv() {
    
    // Getting previous history from localStorage
    let previousHistory = localStorage.getItem("record");
    
    if (previousHistory) {
        // Parse the history array
        let record = JSON.parse(previousHistory);
        
        // Clear the previous list
        historyList.innerHTML = "";
        
        // Check if there is any data in the record
        if (record.length > 0) {
            // Show the historyDiv if there is data
            inputBox.addEventListener("focus", ()=>{
                historyDiv.classList.remove('hidden');
                updateHistoryDiv();

                dataSection.classList.remove("hidden");
            })
            searchBtn.addEventListener("click", ()=>{
                historyDiv.classList.add('hidden');
            })
            myLoctionBtn.addEventListener("click", ()=>{
                historyDiv.classList.add('hidden');
            })

            // Loop through each city and create a new list item
            record.forEach(city => {
                let listItem = document.createElement('li');
                listItem.textContent = city;
                listItem.className = "px-2 mt-1 py-1 text-cyan-900 font-semibold hover:bg-cyan-100 cursor-pointer";
                listItem.addEventListener("click", ()=>{
                    inputBox.value = city;
                    historyDiv.classList.add("hidden");
                });
                
                historyList.appendChild(listItem);
            });
        } else {
            // Hide the historyDiv if the array is empty
            historyDiv.classList.add('hidden');
        }
    } else {
        // Hide the historyDiv if there is no history in localStorage
        historyDiv.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', updateHistoryDiv());


