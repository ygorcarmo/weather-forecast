// buttons Start
var searchBtn = document.getElementById("submitbtn");

searchBtn.addEventListener('click', goLoco);
// buttons End

// Text/Elements Start

var selectedCity = document.getElementById("city");
var todayTemp = document.getElementById("currentTemperature");
var todayWind = document.getElementById("currentWind");
var todayHumidity = document.getElementById("currentHumidity");
var todayUVIndex = document.getElementById("currentUVIndex");
var errorMessage = document.querySelector("#errorMessage");

var cityTBS = document.getElementById("inserthere");

// Text/Elements End

// API stuff

var apiKey = "e9338296fd417a53918f0986d22214b3";
function goLoco(event) {
    event.preventDefault();
    forecastData = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityTBS.value}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then((data)=>{
        errorMessage.style.display = "none";
        console.log(data);
        weatherData(data);
        FutureForecast(data);
    })
    .catch((error) => {
        errorMessage.textContent = "City Not Found";
        errorMessage.style.display = "inline";
      });

};
function weatherData(data) {
    var oneCall = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then((weatherLoco) =>{    

        cityDisplayed = cityTBS.value
        selectedCity.textContent = cityDisplayed.toUpperCase();
        todayTemp.textContent= weatherLoco.current.temp + " °C"
        todayWind.textContent= weatherLoco.current.wind_speed + " KM/H" 
        todayHumidity.textContent= weatherLoco.current.humidity + " %"
        todayUVIndex.textContent= weatherLoco.current.uvi
    })
}
function FutureForecast(data){
    console.log(data);
}


