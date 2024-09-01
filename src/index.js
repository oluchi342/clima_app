function displayWeather(response) {
    let tempsElement = document.querySelector("#temperature-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date;
    let iconImage = document.querySelector("#icon");
    iconImage.innerHTML = ` <img src="${response.data.condition.icon_url}" class="temperature-icon"/> `;


    cityElement.innerHTML = response.data.city;
    tempsElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satruday",];
    let day = days[date.getDay()];

    if (minutes < 10) {
       minutes = `0${minutes}`; 
    }

    return `${day} ${hours}:${minutes}`;
    

}

function searchCity(city) {
    let apiKey = "o4bcac1at7e73505ab4974f6a544518b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayWeather);
}


function searchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#form-search-input");
    
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Sat", "Sun"];
    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "o4bcac1at7e73505ab4974f6a544518b";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);

    
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml = 
        forecastHtml + 
        ` <div class="daily-forecast-day">
        <div class="daily-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}"class="daily-forecast-icon"  />
        <div class="daily-forecast-temperatures">
        <div class="daily-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}⁰</strong></div> 
        <div class="daily-forecast-temperature">${Math.round(day.temperature.minimum)}⁰</div>
        </div>
        </div>
        `;
        }
    });
    let forecastElement = document.querySelector("#forecast")
    forecastElement.innerHTML = forecastHtml;
    
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit)

searchCity("Abuja");


