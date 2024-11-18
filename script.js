
//the key only 100 API calls are free, this is only for a final testing
// const apiURL = "https://api.weatherstack.com/current";
// const urlParams = {
//     query: "Norwich",
//     access_key: "9bd3e70aef89cedeef506d24be20a705"
// };

//for fake API calls, replace with the 100 API calls only for final testing
const apiURL = "/assets/data/test.json"

const mainDiv = document.getElementById("main-div");

// variables for sliders
const humiditiSlider = document.getElementById("humidity-slider");
const temperatureSlider = document.getElementById("temperature-slider");
const windSlider = document.getElementById("wind-slider");
const cloudSlider = document.getElementById("cloud-slider");

//all values
const humidityValue = document.getElementById("humidity-value");
const temperatureValue = document.getElementById("temperature-value");
const windValue = document.getElementById("wind-value");
const cloudValue = document.getElementById("cloud-value");

// leaf and clauds animation
const leafAnimations = document.getElementsByClassName("leaf");
const cloudAnimations = document.getElementsByClassName("clouds");
// humidity filter
const humidityFilter = document.getElementById("humidity-filter");

async function fetchData() {
    try {
        const response = await fetch(apiURL);
        //variable above for fake API calls variable below only for final testing
        // const response = await fetch(apiUrl + new URLSearchParams(urlParams));
        if(!response.ok) {
            throw new Error("response status: ", response.status);
        }
        const json = await response.json();
        //functions update
        updateValue(temperatureSlider, temperatureValue, json.current.temperature);
        updateValue(windSlider, windValue, json.current.wind_speed);
        updateValue(humiditiSlider, humidityValue, json.current.humidity);
        updateValue(cloudSlider, cloudValue, json.current.cloudcover);

        updateWind(json.current.wind_speed);
        updateHumidity(json.current.humidity);
        updateBackground(json.current.temperature);
    } catch (error) { 
        console.error(error);
    }
}

// temperature change background
function updateBackground(temperature) {
    let red;
    let green;
    let blue;
    //the key is to think about the extremes
    //when temperature = -20 (min temperature), what happens?
    //when tempearture = 20 (middle temperature), what happens?
    //when temperature = 35 (max temperature), what happens?
    if(temperature < 20) {
        red = (temperature + 20)*255/40;
        green = (temperature + 20)*255/40;
        blue = (20 - temperature)*255/40;
    }
    else {
        red = 255;
        green = (35 - temperature)*255/15;
        blue = 0;
    }
    console.log('red', red, 'blue', blue)
    mainDiv.style.backgroundColor = "rgb(" + red + "," + green +"," + blue + ")";
}

function updateHumidity(humidity) {
    humidityFilter.style.opacity = (0.5 * Number(humidity)) / 100;
}

function updateWind(windSpeed) {
    const newDuration = ((408 - Number(windSpeed)) * 11) /408+1;
    for (const leaf of leafAnimations) {
        leaf.style.animationDuration = newDuration + "s";
    }
    for (const cloud of cloudAnimations) {
        cloud.style.animationDuration = newDuration + "s";
    }
}


function updateValue(sliderElement, valueElement, value) {
    sliderElement.value = value;
    valueElement.innerHTML = value;
}

fetchData();
//fetch data every half second
//setInterval(fetchData, 500);


//the website to shows how the rgb colour change works in a math way
//https://www.wolframalpha.com/input?i=%28x%2B+20%29*255%2F40