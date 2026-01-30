const cityh1 = document.querySelector(".city");
const currentTemp = document.querySelector(".current-temp");
const cityInput = document.querySelector(".city-search");
const searchBtn = document.querySelector(".search-btn");
const feelsLike = document.querySelector(".feels-like-value");
const windValue = document.querySelector(".wind-value");
const visibilityValue = document.querySelector(".visibility-value");
const humidityValue = document.querySelector(".humidity-value");
const default_city = "Toronto";
const API_KEY = ""

searchBtn.addEventListener("click", () => {
  main();
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    main();
  }
});

function main() {
  if (cityInput.value == "") {
    cityInput.classList.add("shake");
    setTimeout(() => {
        cityInput.classList.remove("shake")
    }, 300);
    return;
  } else {
    getWeather(cityInput.value);
    // console.log(cityInput.value);
    cityInput.value = "";
  }
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );
    const data = await response.json();
    cityh1.textContent = data.name;
    currentTemp.textContent = `${Math.round(data.main.temp)}°`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;
    windValue.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    visibilityValue.textContent = `${Math.round(data.visibility / 1000)} km`;
    humidityValue.textContent = `${Math.round(data.main.humidity)}%`;
  } catch (error) {
    alert("Couldnt fetch the weather due to: ", error);
  }
}

// getWeather("Gandhinagar")
