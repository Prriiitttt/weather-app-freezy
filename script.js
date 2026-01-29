const cityh1 = document.querySelector(".city");
const currentTemp = document.querySelector(".current-temp");
const cityInput = document.querySelector(".city-search");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  if (cityInput.value == "") {
    alert("Please enter city name");
  } else {
    console.log(cityInput.value);
    cityInput.value = '';
  }
});
