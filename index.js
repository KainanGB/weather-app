import config from "./config.json" assert { type: "json" };
import { clouds, snow, thunder, rain, fog, clean } from "./images/images.js";
const { KEY } = config;

const card = document.querySelector(".card");
const api = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&lang=pt_br&units=metric`;
};

const fetchWeather = async (value) => {
  const response = await fetch(api(value)).then((res) => res.json());

  const { main, name, weather, wind } = response;

  let tempo = weather[0].main;
  let currentWeatherImage;

  if (tempo === "Clouds") {
    tempo = "Nublado";
    currentWeatherImage = clouds;
  }
  if (tempo === "Clear") {
    tempo = "Limpo";
    currentWeatherImage = clean;
  }

  let card = document.querySelector(".card");
  card.classList.add("active");
  card.innerHTML = `
    <div class="card__header">
    <img src="${currentWeatherImage}" alt="">
    </div>
    <div class="card__body">
    <p class="">${name}</p>
      <p>Tempo: ${main.temp}ºC</p>
      <p>${tempo}</p>
      <p></p>
      <p>Sensação térmica: ${main.feels_like}ºC </p>
      <p>Umidade: ${main.humidity}%</p>

      <div class="buttons">
      <input type="text" class="search-input" id="search" placeholder="City Name"/>
      <button class="search-btn fa-solid fa-magnifying-glass"></button>
    </div>
    </div>
  
  `;
};

card.addEventListener("click", (event) => {
  if (event.target.className === "search-btn fa-solid fa-magnifying-glass") {
    let value = document.querySelector(".search-input").value;
    fetchWeather(value);
  }
});
