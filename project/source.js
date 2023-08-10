const city=document.getElementById('inputvalue');
const searchButton=document.querySelector(".search-btn");
const locationButton=document.querySelector(".location-btn");
const weatherCardsDiv=document.querySelector(".weather-cards");
const currentWeatherDiv=document.querySelector(".current-weather");
//Elements for current weather details
const current1=document.getElementById('current-weather-h2');
const current2=document.getElementById('current-weather-temp');
const current3=document.getElementById('current-weather-wind');
const current4=document.getElementById('current-weather-humidity');
const current5=document.getElementById('current-weather-img');
const current7=document.getElementById('current-weather-name');
//Elements for 5 days forecast
const card11=document.getElementById('card-1-1');
const card12=document.getElementById('card-1-2');
const card13=document.getElementById('card-1-3');
const card14=document.getElementById('card-1-4');
const card15=document.getElementById('card-1-5');

const card21=document.getElementById('card-2-1');
const card22=document.getElementById('card-2-2');
const card23=document.getElementById('card-2-3');
const card24=document.getElementById('card-2-4');
const card25=document.getElementById('card-2-5');

const card31=document.getElementById('card-3-1');
const card32=document.getElementById('card-3-2');
const card33=document.getElementById('card-3-3');
const card34=document.getElementById('card-3-4');
const card35=document.getElementById('card-3-5');

const card41=document.getElementById('card-4-1');
const card42=document.getElementById('card-4-2');
const card43=document.getElementById('card-4-3');
const card44=document.getElementById('card-4-4');
const card45=document.getElementById('card-4-5');

const card51=document.getElementById('card-5-1');
const card52=document.getElementById('card-5-2');
const card53=document.getElementById('card-5-3');
const card54=document.getElementById('card-5-4');
const card55=document.getElementById('card-5-5');


const API_KEY="de71d5ff6ee4aeb5e8ce93ff7e32df66";


const fun=(name,weatherItem,index)=>{
    if(index===1){
        card11.innerHTML=weatherItem.dt_txt.split(" ")[0];
        card15.src=`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png`
        card12.innerHTML=`Temp : ${(weatherItem.main.temp -273.15).toFixed(2)} °C`;;
        card13.innerHTML=`Wind : ${weatherItem.wind.speed} M/S`;
        card14.innerHTML=`Humidity: ${weatherItem.main.humidity}%`;
    }
    if(index===2){
        card21.innerHTML=weatherItem.dt_txt.split(" ")[0];
        card25.src=`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png`
        card22.innerHTML=`Temp : ${(weatherItem.main.temp -273.25).toFixed(2)} °C`;;
        card23.innerHTML=`Wind : ${weatherItem.wind.speed} M/S`;
        card24.innerHTML=`Humidity: ${weatherItem.main.humidity}%`;
    }
    if(index===3){
        card31.innerHTML=weatherItem.dt_txt.split(" ")[0];
        card35.src=`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png`
        card32.innerHTML=`Temp : ${(weatherItem.main.temp -273.35).toFixed(2)} °C`;;
        card33.innerHTML=`Wind : ${weatherItem.wind.speed} M/S`;
        card34.innerHTML=`Humidity: ${weatherItem.main.humidity}%`;
    }
    if(index===4){
        card41.innerHTML=weatherItem.dt_txt.split(" ")[0];
        card45.src=`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png`
        card42.innerHTML=`Temp : ${(weatherItem.main.temp -273.45).toFixed(2)} °C`;;
        card43.innerHTML=`Wind : ${weatherItem.wind.speed} M/S`;
        card44.innerHTML=`Humidity: ${weatherItem.main.humidity}%`;
    }
    if(index===5){
        card51.innerHTML=weatherItem.dt_txt.split(" ")[0];
        card55.src=`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png`
        card52.innerHTML=`Temp : ${(weatherItem.main.temp -273.55).toFixed(2)} °C`;;
        card53.innerHTML=`Wind : ${weatherItem.wind.speed} M/S`;
        card54.innerHTML=`Humidity: ${weatherItem.main.humidity}%`;
    }
}

const createWeatherCard=(name,weatherItem,index)=>{
    if(index===0){
        //main weather card
        console.log(weatherItem)
        current7.innerHTML=name;
        current1.innerHTML=weatherItem.dt_txt.split(" ")[0];
        current2.innerHTML=`Temp : ${(weatherItem.main.temp -273.15).toFixed(2)} °C`;
        current3.innerHTML=`Wind : ${weatherItem.wind.speed} M/S`;
        current4.innerHTML=`Humidity: ${weatherItem.main.humidity}%`;
        current5.src=`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`;
        
    }  
}



const getWeatherDetails=(name,lat,lon)=>{
    //testing
    const WEATHER_API_URL=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res=>res.json()).then(data=>{
        const uniqueForecastDays=[];
        const fiveDaysForecast=data.list.filter(forecast=>{
            const forecastDate=new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        })
        //looping working
        for(var i=1;i<fiveDaysForecast.length;i++){
            fun(name,fiveDaysForecast[i],i);
        }
        //clearing previous weather data
        fiveDaysForecast.forEach((weatherItem,index)=>{
            console.log(weatherItem);
            if(index===0){
                weatherCardsDiv.insertAdjacentHTMl("beforeend",createWeatherCard(name,weatherItem,index));
            }
    })


}).catch(()=>{
       
    })


}


const getCityCoordinates=()=>{
    const cityName=city.value.trim();

    if(!cityName) return;

    const GEOCODING_API_URL=`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    fetch(GEOCODING_API_URL).then(res=>res.json()).then(data=>{
        if(!data.length) return alert(`No coordinates found for ${cityName}`)
        const {name,lat,lon}=data[0];
        getWeatherDetails(name,lat,lon);
    }).catch(()=>{
        alert('An error occured while fetching the coordinates!');
    })
    
}

const getUserCoordinates=()=>{
    navigator.geolocation.getCurrentPosition(
        position=>{
            const {latitude,longitude}=position.coords;
            const REVERSE_GEOCODING_URL=`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch((REVERSE_GEOCODING_URL)).then(res=>res.json()).then(data=>{
                const{name} =data[0];
                getWeatherDetails(name,latitude,longitude);
            }).catch(()=>{
                alert("An error occured while fetching the city!");
            })
            console.log(position)
        },
        error=>{
            if(error.code===error.PERMISSION_DENIED){
                alert("Geolocation request denied.Please reset location permission to grant access again.");
            }
        }
    )
}

locationButton.addEventListener("click",getUserCoordinates);
searchButton.addEventListener("click",getCityCoordinates);