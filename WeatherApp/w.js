const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="66eed9986da38a360f336c5665429223";

weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const city=cityInput.value;
    if(city){
        try{
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
        }
    }
    else{
        displayError("Please enter a valid city");
    }

});

async function getWeatherData(city) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response=await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch the city");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name:city,
           main:{temp,humidity},
           weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDisplay.textContent=city;
    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    tempDisplay.textContent=Math.round(temp-273.15,2)+"°C";
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent="Humidity: "+humidity+"%";
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.textContent=description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    weatherEmoji.textContent=getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(id){
    if(id>=200 && id<300) return "⛈️";
    else if(id>=300 && id<400) return "🌦️";
    else if(id>=500 && id<600) return "🌧️";
    else if(id>=600 && id<700) return "🌨️";
    else if(id>=700 && id<800) return "🌁";
    else if(id===800) return "☀️";
    else if(id>=801 && id<810) return "☁️";
    else return "?";
}

function displayError(message){
    const error=document.createElement("p");
    error.textContent=message;
    error.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(error);
}