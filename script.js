const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const statusMessage = document.getElementById('status-message');

const locationElem = document.getElementById('location');
const dateElem = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const tempElem = document.getElementById('temp');
const descriptionElem = document.getElementById('weather-description');
const humidityValue = document.getElementById('humidity-value');
const pressureValue = document.getElementById('pressure-value');
const windSpeedValue = document.getElementById('wind-speed-value');
const windDirectionValue = document.getElementById('wind-direction-value');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const feelsLikeValue = document.getElementById('feels-like-value');
const visibilityValue = document.getElementById('visibility-value');

form.addEventListener('submit', e => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    statusMessage.textContent = 'Loading...';
    clearWeather();

    try {
        const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();


        const current = data.current_condition[0];
        const astronomy = data.weather[0].astronomy[0];

        locationElem.textContent = city.charAt(0).toUpperCase() + city.slice(1);
        dateElem.textContent = new Date().toLocaleString();

        weatherIcon.src = `https://wttr.in/static/weather/png/64/${current.weatherCode}.png`;
        weatherIcon.alt = current.weatherDesc[0].value;

        tempElem.textContent = `${current.temp_C}°C`;
        descriptionElem.textContent = current.weatherDesc[0].value;

        humidityValue.textContent = `${current.humidity}%`;
        pressureValue.textContent = `${current.pressure} mb`;
        windSpeedValue.textContent = `${current.windspeedKmph} km/h`;
        windDirectionValue.textContent = current.winddir16Point;
        feelsLikeValue.textContent = `${current.FeelsLikeC}°C`;
        visibilityValue.textContent = `${current.visibility} km`;

        sunriseTime.textContent = astronomy.sunrise;
        sunsetTime.textContent = astronomy.sunset;

        statusMessage.textContent = '';
    } catch (error) {
        statusMessage.textContent = error.message;
    }
}

function clearWeather() {
    locationElem.textContent = 'City, Country';
    dateElem.textContent = 'Date and Time';
    weatherIcon.src = '';
    weatherIcon.alt = 'Weather icon';
    tempElem.textContent = '--°C';
    descriptionElem.textContent = 'Description';
    humidityValue.textContent = '--%';
    pressureValue.textContent = '-- mb';
    windSpeedValue.textContent = '-- km/h';
    windDirectionValue.textContent = '--';
    feelsLikeValue.textContent = '--°C';
    visibilityValue.textContent = '-- km';
    sunriseTime.textContent = '--:--';
    sunsetTime.textContent = '--:--';
}
