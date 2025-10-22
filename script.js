let inputBox = document.querySelector("#input-box");
const searchBtn = document.querySelector(".search-btn");
let currentLocation = document.querySelector(".current-weather-location");
let temperature = document.querySelector("#temp");
let windSpeed = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");
let cityName = document.querySelector("#city-name");
let datespan = document.querySelector("#date");
let weatherImg = document.querySelector(".weather-img");
let errMsg = document.querySelector(".err-msg");



let reset = () => {

    window.location = "index.html"
}

let checkWeather = async (city) => {
    const api_key = "fd3f3b2a0597494c83a133301252908";
    const current_url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`;

    weather_data = await fetch(`${current_url}`)
    .then((response) => {
        return response.json();
    })
    .then((weather_data) => {

        if(inputBox.value === ""){
            errMsg.innerHTML = "Enter a city name to begin";
            errMsg.classList.remove("hide");
            // return;
        }
        else{
            errMsg.innerHTML = "Oops! We couldn't find that city. Try another one.";
            errMsg.classList.add("hide");
        }

         

        cityName.innerText = weather_data.location.name;
        datespan.innerText = `(${(weather_data.current.last_updated.slice(0,10))})`;
         weatherImg.src = "https:" + weather_data.current.condition.icon;
        temp.innerText = `${weather_data.current.temp_c}°C`;
        windSpeed.innerText = `${weather_data.current.wind_kph} km/hr`;
        humidity.innerText = `${weather_data.current.humidity}%`;
       
        })
    .catch((error) => {
        console.log("error fetching the city", error);
        errMsg.classList.remove("hide");

        
    })
}

let forecastCards = document.querySelectorAll(".forecast-card");

let forecastWeather = async(city) => {
    const api_key = "fd3f3b2a0597494c83a133301252908";
    const forcast_url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=4`;

    forecast_data = await fetch(`${forcast_url}`)
    .then((response) => {
        return response.json();
    })
    .then((forecast_data) => {
        console.log(forecast_data);
        let forecastDays = forecast_data.forecast.forecastday;  //array of days 

        forecastDays.forEach((day, index) =>{
            if(forecastCards[index]){
                forecastCards[index].querySelector(".forecast-date").innerText = day.date;
                forecastCards[index].querySelector(".weather-icon").src = "https:" + day.day.condition.icon;
                forecastCards[index].querySelector(".forecast-temp").innerText = `${day.day.avgtemp_c}°C`;
                forecastCards[index].querySelector(".forecast-wind").innerText = `${day.day.maxwind_kph} km/hr`;
                forecastCards[index].querySelector(".forecast-humidity").innerText = `${day.day.avghumidity}%`;

            }
        })
        
    })
}

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
    forecastWeather(inputBox.value);
});


