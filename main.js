import KEY from "./key.json" assert { type: "json" };

const API_KEY = KEY["KEY"];
const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`;

const weatherDisplay = document.querySelector(".results");
const searchForm = document.querySelector(".search-bar");
const searchBar = document.querySelector(".search");

async function fetchWeatherData(cityName) {
  const weather = await fetch(API_URL + `&q=${cityName}`).then((data) =>
    data.json()
  );
  if (weather.error) {
    console.log(weather.error.message);
  }
  return weather;
}

function renderWeatherData(weather) {
  const location = weather.location;
  const weatherData = weather.current;
  weatherDisplay.innerHTML = `<div class="result ${
    weatherData.is_day ? "day" : "night"
  }">
        <h1 class="city-name">${location.name} - ${location.country}</h1>
        <img class="icon" src="${weatherData.condition.icon}"></img>
        <div class="info">
            <div class="temp">
                <i class="fa-solid fa-temperature-half"></i>
                <p>${weatherData.temp_c}°C</p>
            </div>
            <div class="wind">
                <i class="fa-solid fa-wind"></i>
                <p>${Math.round(weatherData.wind_kph / 3.6)}m/s</p>
            </div>
        </div>
    </div>
  `;
}

async function handleSearch(e) {
  e.preventDefault();
  const search = searchBar.value;
  const data = await fetchWeatherData(search);
  renderWeatherData(data);
}

searchForm.addEventListener("submit", handleSearch);
