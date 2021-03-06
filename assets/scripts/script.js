// Minneapolis is the default search
const prevSearches = JSON.parse(localStorage.getItem("prevWeatherSearches")) || ["Minneapolis, MN"];

const searchBtn = $("#search-btn");
const searchInput = $("#search-input")
const currentCity = $('#current-city');
const currentDate = $("#current-date");
const currentIcon = $("#current-icon")
const currentTemp = $("#current-temp");
const currentWind = $("#current-wind");
const currentHumidity = $("#current-humidity");
const currentUV = $("#current-uv");


const newSearch = async (terms)=>{
    let weather="x";
    let search = terms?terms:(searchInput.val()?searchInput.val():prevSearches[0]);
    weather = await loadWeather(search);
    currentCity.text(`${weather.city}, ${weather.state}`);
    currentDate.text(moment().format("MMM Do"));
    currentIcon.attr("src",weather.icon)
    currentTemp.text(Math.round(weather.temp));
    currentWind.text(weather.windSpeed+ " mph");
    currentHumidity.text(weather.humidity);
    currentUV.text(weather.uvi);
    let severity;
    if (weather.uvi<3){
        severity = "favorable"
    }
    else if (weather.uvi<5){
        severity = "moderate";
    }
    else severity = "severe"
    currentUV.attr("class",severity)
    for(let i = 0;i<5;i++){
        $(`#date-${i}`).text(weather.future[i].date);
        $(`#temp-${i}`).text(`${weather.future[i].low} / ${weather.future[i].high}`)
        $(`#wind-${i}`).text(`${weather.future[i].windSpeed}`)
        $(`#humidity-${i}`).text(`${weather.future[i].humidity}%`)
        $(`#icon-${i}`).attr("src",`${weather.future[i].icon}%`)
        $(`#card-${i}`).attr("class",`card custom-card ${weather.future[i].severity}`)
    } 
}

searchBtn.on("click", async e=>{
    await newSearch(false)
    prevSearches.unshift(searchInput.val());
    localStorage.setItem("prevWeatherSearches",JSON.stringify(prevSearches));
    searchInput.val("")
})

// needed to load the last searched place's weather
newSearch();
loadButtons();

function loadButtons(){
    $("#past-searches").html("");
    for(let i=0;i<(Math.min(10,prevSearches.length));i++){
        const btn = $("<button>");
        btn.text(prevSearches[i]);
        btn.on("click",async e=>{
            console.log(prevSearches)
            await newSearch(prevSearches[i])
        })
        btn.addClass("btn custom-button w-100")
        $("#past-searches").append(btn);
    }
}