// get this stuff done

var addHere = document.getElementById("newTetas");

var cityChama = JSON.parse(localStorage.getItem("cities"));
var prettyIcon = document.getElementById("todaysIcon");




function renderTodos() {
    for (var i = 0; i < cityChama.length; i++){
        var citySaved = cityChama[i];
        
        var btn = document.createElement("button");
        
        btn.textContent = citySaved;
        btn.classList.add('btn', 'btn-secondary', 'btn-lg', 'btn-block', 'mb-2')
        
        addHere.appendChild(btn);
    }
}
function init(){
    if(!cityChama || cityChama === null){
        cityChama = [];
    }else{
        
        renderTodos();
    }
}

init();
var secBtn = document.querySelectorAll(".btn-secondary");

for (var i = 0; i < secBtn.length; i++) {
    secBtn[i].addEventListener('click', goSec);
}
// secBtn.addEventListener('click', love);



var apiKey = "e9338296fd417a53918f0986d22214b3";
// goLoco();
function goSec(event) {
    // event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${event.target.innerText}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then((data)=>{  
        errorMessage.textContent = "";      
        errorMessage.style.display = "none";
        cityDisplayed = event.target.innerText;
        selectedCity.textContent = cityDisplayed.toUpperCase();
        weatherDatasec(data);
        
        return
    })
    .catch((error) => {
        errorMessage.textContent = "City Not Found";
        errorMessage.style.display = "inline";
      });

};

function weatherDatasec(data) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then((weatherLoco) =>{    

        mainGrid.style.display = "inline";
        var iconUrl = `https://openweathermap.org/img/w/${weatherLoco.current.weather[0].icon}.png`;
        // Set attribute to attach to <img>
        prettyIcon.setAttribute("src", iconUrl);
        todayTemp.textContent= weatherLoco.current.temp + " °C";
        todayWind.textContent= weatherLoco.current.wind_speed + " KM/H" ;
        todayHumidity.textContent= weatherLoco.current.humidity + " %";
        // todayUVIndex.textContent= weatherLoco.current.uvi;

        var uvIndex = weatherLoco.current.uvi
        setUV(uvIndex);
        todayUVIndex.textContent = uvIndex;
        
        // five day forecast
        for (var i = 0; i < 5; i++) {
            tempCard[i].textContent =   weatherLoco.daily[i].temp.eve + " °C";
            windCard[i].textContent =   weatherLoco.daily[i].wind_speed +" KM/H" ;
            humidCard[i].textContent =  weatherLoco.daily[i].humidity + " %";    

            var iconFiveDays = `https://openweathermap.org/img/w/${weatherLoco.daily[i].weather[0].icon}.png`;

            var firstSelec = document.getElementById("icon" + String(i));
            firstSelec.setAttribute("src", iconFiveDays);
          }
    })
};

function setUV(uvIndex){
    if (0 <= uvIndex && uvIndex < 2) {
        todayUVIndex.classList.add("bg-success", "txt-white");
    } else if (2 <= uvIndex && uvIndex < 8) {
        todayUVIndex.classList.add("bg-warning", "txt-dark");
    } else {
        todayUVIndex.classList.add("bg-danger", "txt-white");
    };
}