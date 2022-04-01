

class Day{
    constructor(index,dayData){
        this.index = index;
        this.date = new Date(dayData.dt);
        this.icon = dayData.weather[0].icon;
    }
}


class WeatherObj{
    constructor(data,city,state){
        this.city = city;
        this.state=state;
        this.currentConditions = data.current.weather[0].main;
        this.currentConditionsDesc = data.current.weather[0].description;
        this.currentConditionsIcon = data.current.weather[0].icon;
        this.temp = data.current.temp;
        this.humidity = data.current.humidity;
        this.windSpeed = data.current.windSpeed;
        this.uvi = data.current.uvi;
        this.future= this.createDays(data)
        this.severity = this.findSeverity(this.temp,this.windSpeed,this.uvi)
    }
    createDays(data){
        const days = [];
        for(let i = 0;i<5;i++){
            days.push(new Day(i,data.daily[i]))
        }
        return days;
    }
    findSeverity(temp,wind,uvi){
        return "severe";
    }
}


const APIkey = "55f21782a1227e1ac4082242c21b252d"
const parseLocation = (input)=>{
    let locationArray = input.split(",")
    locationArray = locationArray.map(el=> el.trim());
    const city = locationArray[0];
    const state = locationArray[1];
    const country = "USA"
    return {
        city:city,
        state:state,
        country:country,
    }
}
const loadWeather = async (location)=>{
    const {city,state,country} = parseLocation(location);
    const coordURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${APIkey}`
    const coordResp = await fetch(coordURL);
    const coordData = await coordResp.json()
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordData[0].lat}&lon=${coordData[0].lon}&exclude={part}&appid=${APIkey}`;
    const resp = await fetch(weatherURL);
    const data = await resp.json();
    const weather = new WeatherObj(data,city,state);
    console.log(data)
    console.log(weather)
}

loadWeather("Minneapolis, MN")
