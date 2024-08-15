function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");

  let windSpeedElement = document.querySelector("#wind-speed");

  let timeElement = document.querySelector("#time");

  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#app-icon");

  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class ="app-icon"
    />
  `;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes},`;
  console.log(date);
}

function searchCity(city) {
  let apiKey = "7eot7c9e36304bbfae357f4a433400e3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Colorado");
