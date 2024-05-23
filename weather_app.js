const baseUrl = "https://api.weatherapi.com/v1/forecast.json?";
const apiKey = "9db5a88892eb47bfa73120458241805";

const weather_app = async (cityName) => {
  // let cityName = prompt("Enter city nam: ");
  const apiUrl = `${baseUrl}key=${apiKey}&q=${cityName}&days=1&aqi=yes&alerts=yes`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const countryDiv = document.querySelector(".country");
    const cityDiv = document.querySelector(".city");

    const tempDiv = document.querySelector(".temp");
    const humidityDiv = document.querySelector(".humidity");
    const windDiv = document.querySelector(".wind");
    const alertDiv = document.querySelector(".alert");
    const imageDiv = document.querySelector(".weather-icon");

    imageDiv.src = data.current.condition.icon;
    countryDiv.textContent = data.location.country;
    cityDiv.textContent = data.location.name;
    tempDiv.textContent = data.current.temp_c + " °C";
    humidityDiv.textContent = data.current.humidity + " g/kg.";
    windDiv.textContent = data.current.wind_kph + " Km/h";

    // checking alerts availavle or not
    const alertsText =
      data.alerts && data.alerts.length > 0
        ? data.alerts.map((alert) => alert.headline).join(", ")
        : "No alerts";
    alertDiv.textContent = alertsText;
  } catch (error) {
    console.log("Error fetching weather data...", error);
  }
};

const searchBox = document.querySelector(".search-box");
document.querySelector(".search-btn").addEventListener("click", () => {
  weather_app(searchBox.value);
});
