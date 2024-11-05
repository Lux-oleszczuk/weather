
//the key only 100 API calls are free, this is only for a final testing
// const apiURL = "https://api.weatherstack.com/current";
// const urlParams = {
//     query: "Norwich",
//     access_key: "9bd3e70aef89cedeef506d24be20a705"
// };

//for fake API calls, replace with the 100 API calls only for final testing
const apiURL = "http://localhost:5500/assets/data/test.json"

// variables for sliders
const humiditiSlider = document.getElementById("humidity-slider");
const temperatureSlider = document.getElementById("temperature-slider");
const windSlider = document.getElementById("wind-slider");

//all values
const humidityValue = document.getElementById("humidity-value");
const temperatureValue = document.getElementById("temperature-value");
const windValue = document.getElementById("wind-value");

// leaf animation
const leafAnimations = document.getElementsByClassName("leaf");
// humidity filter
const humidityFilter = document.getElementById("humidity-filter");

async function fetchData() {
    try {
        const response = await fetch(apiURL);
        //variable abow for fake API calls variable below only for final testing
        // const response = await fetch(apiUrl + new URLSearchParams(urlParams));
        if(!response.ok) {
            throw new Error("response status: ", response.status);
        }
        const json = await response.json();
        //functions update
        updateValue(temperatureSlider, temperatureValue, json.current.temperature);
        updateValue(windSlider, windValue, json.current.wind_speed);
        updateValue(humiditiSlider, humidityValue, json.current.humidity);

        updateWind(json.current.wind_speed);
        updateHumidity(json.current.humidity);
    } catch (error) { 
        console.error(error);
    }
}

function updateHumidity(humidity) {
    humidityFilter.style.opacity = (0.5 * Number(humidity)) / 100;
}

function updateWind(windSpeed) {
    const newDuration = ((32 - Number(windSpeed)) * 11) /32+1;
    for (const leaf of leafAnimations) {
        leaf.style.animationDuration = newDuration + "s";
    }
}

function updateValue(sliderElement, valueElement, value) {
    sliderElement.value = value;
    valueElement.innerHTML = value;
}

fetchData();
//fetch data every half second
//setInterval(fetchData, 500);