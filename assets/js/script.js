// buttons Start
var searchBtn = document.getElementById("submitbtn");

searchBtn.addEventListener('click', startLoco);
// buttons End

// Text/Elements Start

var selectedCity = document.getElementById("city");
var todayTemp = document.getElementById("currentTemperature");
var todayWind = document.getElementById("currentWind");
var todayHumidity = document.getElementById("currentHumidity");
var todayUVIndex = document.getElementById("currentUVIndex");
var errorMessage = document.querySelector("#errorMessage");
var mainGrid = document.getElementById("currentBox");
var cityTBS = document.getElementById("inserthere");
var tempCard = document.querySelectorAll(".fiveDayTemp");
var windCard = document.querySelectorAll(".fiveDayWind");
var humidCard = document.querySelectorAll(".fiveDayHumid");
var currentDay = document.getElementById("todaysDate");
// Text/Elements End

// Dates
var dates = moment().format("DD/MM/YYYY");

for (var i = 1; i < 6; i++){
    document.getElementById(String(i)).textContent = moment().add(i, "day").format("DD/MM/YYYY");
}
currentDay.textContent = dates;

function startLoco(){
    if(cityTBS.value === ""){
        alert("Please Select a City");
        return
    }else{
        goLoco();
        setLocal();
    }      
}
// API stuff

var apiKey = "e9338296fd417a53918f0986d22214b3";
function goLoco(event) {
    // event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityTBS.value}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then((data)=>{  
        errorMessage.textContent = "";      
        errorMessage.style.display = "none";
        weatherData(data);        
        return
    })
    .catch((error) => {
        errorMessage.textContent = "City Not Found";
        errorMessage.style.display = "inline";

        var citiesLocal = localStorage.getItem("cities");

        if(!citiesLocal || citiesLocal === null){
            citiesLocal = [];
        }else{
            citiesLocal = JSON.parse(citiesLocal)
            citiesLocal.pop();
            console.log(citiesLocal);
            localStorage.setItem("cities", JSON.stringify(citiesLocal));
            initTwo();
        }
        
      });

};

function weatherData(data) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then((weatherLoco) =>{    

        mainGrid.style.display = "inline";
        cityDisplayed = cityTBS.value
        selectedCity.textContent = cityDisplayed.toUpperCase();
        todayTemp.textContent= weatherLoco.current.temp + " °C"
        todayWind.textContent= weatherLoco.current.wind_speed + " KM/H" 
        todayHumidity.textContent= weatherLoco.current.humidity + " %"
        todayUVIndex.textContent= weatherLoco.current.uvi

        // five day forecast
        for (var i = 0; i < 5; i++) {
            tempCard[i].textContent =   weatherLoco.daily[i].temp.eve + " °C";
            windCard[i].textContent =   weatherLoco.daily[i].wind_speed +" KM/H" ;
            humidCard[i].textContent =  weatherLoco.daily[i].humidity + " %";            
          }
    })
};

var citiesLocal = localStorage.getItem("cities");
function setLocal(){
    var cityLocal = {
        city: cityTBS.value
    };


    if(!citiesLocal || citiesLocal === null){
        citiesLocal = [];
    }else{
        citiesLocal = JSON.parse(localStorage.getItem("cities"))
        citiesLocal.push(cityLocal);
        localStorage.setItem("cities", JSON.stringify(citiesLocal));
    }

    // window.location.reload();

  
    initTwo();

    
}

function resetState(){
    while (addHere.firstChild){
        addHere.removeChild
        (addHere.firstChild)
    }
}

function renderTodosMain() {
    for (var i = 0; i < citiesLocal.length; i++){
        var btn = document.createElement("button");
        var citySaved = citiesLocal[i]["city"];
        
        
        btn.textContent = citySaved;
        btn.classList.add('btn', 'btn-secondary', 'btn-lg', 'btn-block', 'mb-2')
        
        addHere.appendChild(btn);
    }
}
function initTwo(){
    if(!citiesLocal || citiesLocal === null){
        citiesLocal = [];
    }else{
        resetState();
        renderTodosMain();
        for (var i = 0; i < secBtn.length; i++) {
            secBtn[i].addEventListener('click', goSec);
        }
    }
}