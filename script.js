const cityh1 = document.querySelector(".city");
const currentTemp = document.querySelector(".current-temp");
const cityInput = document.querySelector(".city-search");
const searchBtn = document.querySelector(".search-btn");
const feelsLike = document.querySelector(".feels-like-value");
const windValue = document.querySelector(".wind-value");
const visibilityValue = document.querySelector(".visibility-value");
const humidityValue = document.querySelector(".humidity-value");
const weatherIcon = document.querySelector(".weather-icon");
const timeSlotContainer = document.querySelector('.time-slot-container')
const themeToggle = document.querySelector("#theme-toggle");
const savedTheme = localStorage.getItem("theme");
const default_city = "Toronto";
const API_KEY = "76bfd5d71d5a1421d88942aaf407dfe3";
const WEATHER_API = "af47d27da00040d9bb7184233263101";

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
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API}&q=${city}&days=1&aqi=no&alerts=no`,
    );

    const data = await response.json();

    if (data.error) {
      alert(`${city} not found! Please try again.`);
      getWeather("Toronto");
      return; 
    }

    // console.log(data);

    const location = data.location;
    const current = data.current;
    const condition = current.condition;

    cityh1.textContent = location.name;
    currentTemp.textContent = `${Math.round(current.temp_c)}°`;
    feelsLike.textContent = `${Math.round(current.feelslike_c)}°`;
    windValue.textContent = `${Math.round(current.wind_kph)} km/h`;
    visibilityValue.textContent = `${current.vis_km} km`;
    humidityValue.textContent = `${current.humidity}%`;

    const weatherConditionText = condition.text;
    weatherIcon.textContent = getWeatherIcon(weatherConditionText);

    timeSlotContainer.innerHTML = "";

    const hourly = data.forecast.forecastday[0].hour;
    console.log(hourly)

    for (let i = 0; i < 6; i++) {
      const hourIndex = i * 4;
      const hourData = hourly[hourIndex];

      const slot = document.createElement('div')
      slot.classList.add('time-slot');

      const dateObject = new Date(hourData.time);
      const formatedTime = dateObject.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      const emoji = getWeatherIcon(hourData.condition.text)

      slot.innerHTML = `
      <p>${formatedTime}</p>
      <span>${emoji}</span>
      <p>${Math.round(hourData.temp_c)}°</p>
      `

      timeSlotContainer.appendChild(slot);
    }


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

function getWeatherIcon(conditionText) {

  const text = conditionText.toLowerCase();

  if (text.includes("sunny") || text.includes("clear")) {
    return "☀️";
  } else if (text.includes("cloud") || text.includes("overcast") || text.includes("partly")) {
    return "☁️";
  } else if (text.includes("rain") || text.includes("shower") || text.includes("drizzle")) {
    return "🌧️";
  } else if (text.includes("snow")) {
    return "❄️";
  } else if (text.includes("thunder") || text.includes("storm")) {
    return "⛈️";
  } else if (text.includes("fog") || text.includes("mist") || text.includes("haze")) {
    return "😶‍🌫️";
  } else {
    return "🌤️"; 
  }
}


getWeather("Toronto");

function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === "light") {
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

themeToggle.addEventListener("change", () => {
  const theme = themeToggle.checked ? "light" : "dark";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

if (savedTheme === "light") {
  themeToggle.checked = true;
  applyTheme("light");
}
