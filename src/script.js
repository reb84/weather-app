function showWeather(response) {
  let cityResult = document.querySelector("#current-city");
  let temperature = response.data.temperature.current;
  let currentTemperature = document.querySelector("#current-temp");
  let conditionsElement = document.querySelector("#description");
  let windHumidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let currentLocalDate = document.querySelector("#current-date");
  let localDate = new Date();
  let iconElement = document.querySelector("#current-weather-icon");

  cityResult.innerHTML = response.data.city;
  currentTemperature.innerHTML = Math.round(temperature);
  conditionsElement.innerHTML = response.data.condition.description;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  windHumidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  currentLocalDate.innerHTML = formatDate(localDate);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "22de0057ea42aa649cbcof0e3b1te784";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function formatDate(date) {
  let currentDay = date.getDay();
  let currentDate = date.getDate();
  let currentMonth = date.getMonth();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let formattedDay = days[currentDay];
  let formattedMonth = months[currentMonth];

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  return `${formattedDay}  -   ${currentDate} ${formattedMonth}  -  ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "22de0057ea42aa649cbcof0e3b1te784";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
<div class="forecast-icon"><img src="${day.condition.icon_url}"/></div>
          <div class="forecast-temps">
            <div class="weather-forecast-temperature">
              <span class="weather-temp-max">${Math.round(day.temperature.maximum)}º</span>
              /
              <span class="weather-temp-min">${Math.round(day.temperature.minimum)}º</span>
            </div>
          </div>
        </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function citySearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", citySearchSubmit);

searchCity("London");
