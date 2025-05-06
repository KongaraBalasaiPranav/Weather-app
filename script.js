const form = document.getElementById("form");
let cityName = document.getElementById("cityName");
const cityContainer = document.querySelector(".city-container");
const apikey = "54b51ec2096fe672ac9b14604681fa3d";

window.addEventListener("DOMContentLoaded", () => {
    const savedData=JSON.parse(localStorage.getItem("weatherData")) || [] // Getting the data from local storage
    savedData.forEach(displayWeatherDetails); // Looping through the data and displaying it
})


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let city = cityName.value;
    console.log(cityName);
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    fetch(api)
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((res) => {
            console.log(res);
            if (res.cod == 404) {
                alert("Please enter a valid city name");
                return;
            }
            const { main, wind, name,sys } = res; // Destructuring the response object to get the main, weather 12 and name properties
            
            const weatherObj = {
                name,
                temp: main.temp,
                country: sys.country,
                wind: wind.speed
            }
            let data=JSON.parse(localStorage.getItem("weatherData")) || [] // Getting the data from local storage
            data.push(weatherObj); // Pushing the new weather object to the data array
            localStorage.setItem("weatherData", JSON.stringify(data)); // Setting the data array to local storage
            displayWeatherDetails(weatherObj);
        })

})
function displayWeatherDetails(data) {
    console.log("from display function",data);
    let div = document.createElement("div");
    div.classList.add("city-item");
    div.innerHTML = `
        <h2>City: ${data.name}</h2>
        <p>Temperature: ${data.temp}°C</p>
        <p>Country: ${data.country}</p>
        <p>Wind Speed: ${data.wind} m/s</p>
        
    `
    cityContainer.appendChild(div); // Appending the div to the city container
}