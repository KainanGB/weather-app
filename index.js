import config from "./config.json" assert { type: "json" };
const { KEY } = config;

import { clouds, snow, thunder, rain, fog } from "./images/images.js";

const searchBtn = document.querySelector(".send");

const api = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&lang=pt`;
};

const fetchWeather = async () => {
  const response = await fetch(api("curitiba")).then((res) => res.json());

  const { main, name, weather, wind } = response;

  console.log(main);
  //console.log(name);
  //console.log(wind);
  let currentWeatherImage;
  if (weather[0].main === "Clouds") {
    weather[0].main = "Nublado";
    currentWeatherImage = clouds;
  }

  let card = document.querySelector(".card");
  if (weather.main === "Clouds") weather.main = "Nublado";
  card.innerHTML = `
    <div class="card__header">
      <p class="">Cidade: ${name}</p>
      <img src="${currentWeatherImage}" alt="">

    </div>
    <div class="card__body">
      <p>Tempo:${weather[0].main} | ${weather[0].description}</p>
      <p>Umidade: ${main.humidity}%</p>
    </div>
  
  `;
};

searchBtn.addEventListener("click", fetchWeather);
