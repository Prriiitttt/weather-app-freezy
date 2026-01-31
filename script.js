const cityh1 = document.querySelector(".city");
const currentTemp = document.querySelector(".current-temp");
const cityInput = document.querySelector(".city-search");
const searchBtn = document.querySelector(".search-btn");
const feelsLike = document.querySelector(".feels-like-value");
const windValue = document.querySelector(".wind-value");
const visibilityValue = document.querySelector(".visibility-value");
const humidityValue = document.querySelector(".humidity-value");
const weatherIcon = document.querySelector(".weather-icon");
const themeToggle = document.querySelector("#theme-toggle")
const savedTheme = localStorage.getItem('theme')
const default_city = "Toronto";
const API_KEY = "76bfd5d71d5a1421d88942aaf407dfe3";

searchBtn.addEventListener("click", () => {
  main();
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    main();
  }
});

async function getWeather(city) {
  try {
    cityh1.textContent = "Loading...";
    currentTemp.textContent = "";
    weatherIcon.textContent = "";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    const data = await response.json();

    if (data.cod === "404") {
      alert(`${city} not found! Please try again.`);
      getWeather("Toronto");
      return; // Stop the function here
    }

    const weatherCondition = data.weather[0].main;
    cityh1.textContent = data.name;
    currentTemp.textContent = `${Math.round(data.main.temp)}°`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;
    windValue.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    visibilityValue.textContent = `${Math.round(data.visibility / 1000)} km`;
    humidityValue.textContent = `${Math.round(data.main.humidity)}%`;
    getWeatherIcon(weatherCondition);
  } catch (error) {
    alert("Something went wrong! Please check your connection.");
    getWeather("Toronto");
    console.log(`Couldnt fetch the weather due to: ${error}`);
  }
}

function main() {
  if (cityInput.value == "") {
    cityInput.classList.add("shake");
    setTimeout(() => {
      cityInput.classList.remove("shake");
    }, 300);
    return;
  } else {
    getWeather(cityInput.value);
    // console.log(cityInput.value);
    cityInput.value = "";
  }
}

function getWeatherIcon(weatherCondition) {
  if (weatherCondition === "Clear") {
    weatherIcon.textContent = "☀️";
  } else if (weatherCondition === "Clouds") {
    weatherIcon.textContent = "☁️";
  } else if (weatherCondition === "Rain") {
    weatherIcon.textContent = "🌧️";
  } else if (weatherCondition === "Snow") {
    weatherIcon.textContent = "❄️";
  } else if (weatherCondition === "Thunderstorm") {
    weatherIcon.textContent = "⛈️";
  } else if (weatherCondition === "Drizzle") {
    weatherIcon.textContent = "🌦️";
  } else if (
    weatherCondition === "Mist" ||
    weatherCondition === "Fog" ||
    weatherCondition === "Smoke" ||
    weatherCondition === "Haze"
  ) {
    weatherIcon.textContent = "😶‍🌫️";
  }
}

getWeather("Toronto");

function applyTheme(theme) {
    const root = document.documentElement;

    if(theme === "light") {
        root.style.setProperty("--primary-bg", "#e8e8e8");
        root.style.setProperty("--primary-text", "#333333");
        root.style.setProperty("--search-text", "rgb(101, 91, 91)");
        root.style.setProperty("--container-bg", "#d0d0d0");
        root.style.setProperty("--hover-bg", "#777575");
        root.style.setProperty("--active-bg", "#d0d0d0");
    } else {
        root.style.setProperty("--primary-bg", "rgb(42, 43, 50)");
        root.style.setProperty("--primary-text", "white");
        root.style.setProperty("--search-text", "rgb(196, 184, 184)");
        root.style.setProperty("--container-bg", "#415163");
        root.style.setProperty("--hover-bg", "#6b829d");
        root.style.setProperty("--active-bg", "#415163");
    }
}

themeToggle.addEventListener('change', () =>{
    const theme = themeToggle.checked ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
})

if(savedTheme === 'light') {
        themeToggle.checked = true;
        applyTheme('light');
    }