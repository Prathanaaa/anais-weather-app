// Log current date and time //
let date = new Date();
console.log(date);

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
console.log(day);

let hours = date.getHours();
let minutes = date.getMinutes();
let currentDay = document.querySelector("#current-day");
let currentTime = document.querySelector("#current-time");
currentDay.innerHTML = day;
currentTime.innerHTML = `${hours}:${minutes}`;

// Display City after user's input //

function getCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-text");
  let inputValue = input.value;
  console.log(inputValue);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeCity);
  axios.get(apiUrl).then(displayCelcius);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);

// Temperature conversion //
function displayFarenheit() {
  let h2 = document.querySelector("h2");
  h2.innerHTML = "69";
  let removeFarenheit = document.querySelector("#farenheit");
  removeFarenheit.classList.toggle("temp-farenheit");
}
function changeFarenheitTheme() {
  let removeFarenheit = document.querySelector("#farenheit");
  removeFarenheit.classList.remove("temp-farenheit");
  let removeCelcius = document.querySelector("#celcius");
  removeCelcius.classList.add("temp-celcius");
}
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", displayFarenheit);
farenheit.addEventListener("click", changeFarenheitTheme);

function displayCelcius(response) {
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  h2.innerHTML = temperature;
}

function changeCelciusTheme() {
  let removeCelcius = document.querySelector("#celcius");
  removeCelcius.classList.remove("temp-celcius");
  let removeFarenheit = document.querySelector("#farenheit");
  removeFarenheit.classList.add("temp-farenheit");
}
let celcius = document.querySelector(".temp-celcius");
celcius.addEventListener("click", displayCelcius);
celcius.addEventListener("click", changeCelciusTheme);

// Geolocation API

function changeCity(response) {
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = `${response.data.name}`;
}

function getPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeCity);
  axios.get(apiUrl).then(displayCelcius);
}

let getLocationButton = document.querySelector("#location-button");

getLocationButton.addEventListener("click", function showLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
});
