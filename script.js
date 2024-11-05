// 9bd3e70aef89cedeef506d24be20a705
//the key
const apiURL = "https://api.weatherstack.com/current";
const urlParams = {
    query: "Norwich",
    access_key: "9bd3e70aef89cedeef506d24be20a705"
};

// variables for sliders
const humiditiSlider = document.getElementById("humidity-slider");
const temperatureSlider = document.getElementById("temperature-slider");
const windSlider = document.getElementById("wind-slider");

//all values
const humidityValue = document.getElementById("humidity-value");
const temperatureValue = document.getElementById("temperature-value");
const windValue = document.getElementById("wind-value");

// leaf animation
const leafAnimation = document.getElementsByClassName("leaf");
// humidity filter
const humidityFilter = document.getElementById("humidity-filter");


