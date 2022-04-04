const prevSearches = JSON.parse(localStorage.getItem("prevWeatherSearches")) || ["Minneapolis, MN"];

const searchBtn = $("#search-btn");
const searchInput = $("#search-input")

const currentCity = $('#current-city');
const currentDate = $("#current-date");
const currentIcon = $("#current-icon")
const currentTemp = $("#current-temp");
const currentWind = $("#current-wind");
const currentHumidity = $("#current-humidity");
const currentUV = $("#current-uv")


const icons = {
    
}

const newSearch = async (terms)=>{
    let weather="x";
    let search = terms?terms:(searchInput.val()?searchInput.val():prevSearches[0]);
    console.log(search)
    weather = await loadWeather(search);
    console.log(weather);
    currentCity.text(`${weather.city}, ${weather.state}`);
    console.log(currentDate.text());
    currentDate.text(moment().format("MMM Do"));
    currentTemp.text(Math.round(weather.temp));
    currentWind.text(weather.windSpeed+ " mph");
    currentHumidity.text(weather.humidity);
    currentUV.text(weather.uvi);
    for(let i = 0;i<5;i++){
        $(`#date-${i}`).text(weather.future[i].date);
        $(`#temp-${i}`).text(`${weather.future[i].low} / ${weather.future[i].high}`)
        $(`#wind-${i}`).text(`${weather.future[i].windSpeed}`)
        $(`#humidity-${i}`).text(`${weather.future[i].humidity}%`)
    } 
}

console.log(searchInput);
searchBtn.on("click", async e=>{
    await newSearch(false)
    prevSearches.unshift(searchInput.val());
    localStorage.setItem("prevWeatherSearches",JSON.stringify(prevSearches));
    searchInput.val("")
})

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
        $("#past-searches").append(btn);
    }
}