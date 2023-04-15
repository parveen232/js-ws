const getWeather = document.getElementById('get-weather');
const selectedCity = document.getElementById('select-city');
const weatherData = document.querySelector('.weather-data');
const noData = document.querySelector('.no-data');

getWeather.addEventListener('submit', (e) => {
    e.preventDefault();
    displayData(selectedCity.value);
})

async function displayData(city) {
    const data = await getData(city);

    noData.style.display = `none`;
    noData.parentElement.classList.remove('no-data-container');

    const li = document.createElement('li');

    li.classList.add('gborder');
    setTimeout(() => {
        li.classList.remove('gborder');
        li.classList.add('liborder');
    }, 3000);

    li.innerHTML = `
        <div class="card">
             <button class="remove">x</button>
             <div><h3 id="wcity">${city}</h3></div>
             <div>Description: <span id="description">${data.description}</span></div>
             <div>Temperature: <span id="temp">${data.temp_in_celsius}</span>°C</div>
             <div>Humidity: <span id="humidity">${data.humidity_in_percent}</span>%</div>
             <div>Pressure: <span id="pressure">${data.pressure_in_hPa}</span>hPa</div>
         </div>
    `

    weatherData.prepend(li)

    const removeList = document.querySelectorAll('.remove');

    for(const remove of removeList) {
        remove.addEventListener('click', () => {
            remove.parentElement.parentElement.remove();

            if(weatherData.innerHTML === ``) {
                noData.style.display = `block`;
                noData.parentElement.classList.add('no-data-container');
            } 
        })
    }
}

async function getData(city) {
    const res = await fetch( `https://some-weather-api?cityname=${city}`);
    const data = await res.json();
    return data;
}