const getWeather = document.getElementById('get-weather');
const selectedCity = document.getElementById('select-city');
const card = document.querySelector('.card');
const noData = document.querySelector('.no-data');
const wcity = document.getElementById('wcity');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const remove = document.getElementById('remove');

getWeather.addEventListener('submit', (e) => {
    e.preventDefault();
    displayData(selectedCity.value);
})

async function displayData(city) {
    const data = await getData(city);

    noData.style.display = `none`;
    card.style.display = 'flex';

    wcity.innerText = city;
    description.innerText = data.description;
    pressure.innerText = data.pressure_in_hPa;
    humidity.innerText = data.humidity_in_percent;
    temp.innerText = data.temp_in_celsius;

    card.classList.add('rbborder');

    setTimeout(() => {
      card.classList.remove('rbborder');
    }, 3000);
}

async function getData(city) {
    const res = await fetch( `https://some-weather-api?cityname=${city}`);
    const data = await res.json();
    return data;
}

remove.addEventListener('click', () => {
    card.style.display = `none`;
    noData.style.display = `block`
})