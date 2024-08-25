function displayWeather(response) {
    let tempsElement = document.querySelector("#temperature-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    tempsElement.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit)

searchCity("Abuja");