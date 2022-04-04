var unixFormat = moment(0).format("MM/DD/YYYY HH:MM");
class Day{
    constructor(index,dayData){
        this.index = index;
        this.date = moment(dayData.dt*1000).format("MMM Do");
        this.icon = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
        this.low = Math.round(toFarenheit(dayData.temp.min));
        this.high = Math.round(toFarenheit(dayData.temp.max));
        this.windSpeed = dayData.wind_speed;
        this.humidity = dayData.humidity;
        this.severity = this.findSeverity(this.low,this.high,this.windSpeed)
    }
    findSeverity(low,high,wind){
        if (low<15||high>95||wind>20)
        return "severe";
        else if(low<55||high>88||wind>10){
            return "moderate"
        }
        else return "favorable";
    }
}

class WeatherObj{
    constructor(data,city,state){
        this.city = city;
        this.state=state;
        this.currentConditions = data.current.weather[0].main;
        this.icon = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
        this.currentConditionsDesc = data.current.weather[0].description;
        this.temp = toFarenheit(data.current.temp);
        this.humidity = data.current.humidity;
        this.windSpeed = data.current.wind_speed;
        this.uvi = data.current.uvi;
        this.future= this.createDays(data)
        this.severity = this.findSeverity(this.temp,this.windSpeed,this.uvi)
    }
    createDays(data){
        const days = [];
        for(let i = 1;i<6;i++){
            days.push(new Day(i,data.daily[i]))
        }
        return days;
    }
    findSeverity(temp,wind,uvi,humidity){
        if (temp<15||temp>95||wind>20||uvi>8)
        return "severe";
        else if(temp<55||temp>88||wind>10||uvi>6){
            return "moderate"
        }
        else return "favorable";
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
    const coordURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${APIkey}`
    const coordResp = await fetch(coordURL);
    const coordData = await coordResp.json()
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordData[0].lat}&lon=${coordData[0].lon}&exclude={part}&appid=${APIkey}`;
    const resp = await fetch(weatherURL);
    const data = await resp.json();
    const weather = new WeatherObj(data,city,state);
    console.log(weather)
    return weather;
}

 function toFarenheit(kel){
     console.log(kel)
    return (kel-273.15)*9/5+32
 }
