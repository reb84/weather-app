//// DATE + TIME ////

function formatDate(date) {
  let currentDay = date.getDay();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let formattedDay = days[currentDay];
  return `${formattedDay} ${currentHour}:${currentMinute}`;
}

let currentLocalDate = document.querySelector("#current-date");
let localDate = new Date();
currentLocalDate.innerHTML = formatDate(localDate);

////  ////

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function searchCity(city) {
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let cityResult = document.querySelector("#current-location");
  cityResult.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".current-temp");
  currentTemperature.innerHTML = `${temperature}°C`;
}
