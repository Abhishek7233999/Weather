const apiKey = "89412e82572b4f68b8581245240912";   
async function getWeather() {
    const city = document.getElementById("city").value;
    const weatherInfoDiv = document.getElementById("weatherInfo");

    if (city === "") {
        weatherInfoDiv.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            weatherInfoDiv.innerHTML = "City not found. Please try again.";
            return;
        }

        const cityName = data.name;
        const country = data.sys.country;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherInfoDiv.innerHTML = `
            <h2>Weather in ${cityName}, ${country}</h2>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Description:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
    } catch (error) {
        weatherInfoDiv.innerHTML = "An error occurred. Please try again later.";
    }
}
