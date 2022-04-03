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

const newSearch = async ()=>{
    const weather = await loadWeather(searchInput.val()?searchInput.val():"Minneapolis, MN");
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
    // const weather = await loadWeather(searchInput.val());
    // currentCity.text(`${weather.city}, ${weather.state}`);
    // console.log(currentDate.text());
    // currentDate.text(moment().format("MMM Do"));
    // currentTemp.text(Math.round(weather.temp)+"&#176; F");
    // currentWind.text(weather.windSpeed+ " mph");
    // currentHumidity.text(weather.humidity);
    // currentUV.text(weather.uvi);
    // for(let i = 0;i<5;i++){
    //     $(`#date-${i}`).text(weather.future[i].date);
    //     $(`#temp-${i}`).text(`${weather.future[i].low} / ${weather.future[i].high}`)
    //     $(`#wind-${i}`).text(`${weather.future[i].windSpeed}`)
    //     $(`#humidity-${i}`).text(`${weather.future[i].humidity}%`)
    // }
    await newSearch()
})

newSearch();