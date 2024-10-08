import '../node_modules/modern-normalize/modern-normalize.css';
import './style.css'
import key from './APIKey.js'

const form = document.querySelector('form')
const cityInput = document.querySelector('input')
const weatherDisplay = document.querySelector('p')

async function getWeather(city) {
    let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`);
    try {
        data = await data.json();
    } catch {
        data = undefined;
    }
    return(!data ? new Weather(city, 'na') : new Weather(city, data.currentConditions.conditions));
}

function Weather(city, weather) {
    this.city = city;
    this.weather = weather;
}

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    let weatherData = await getWeather(formData.get('city'));
    weatherDisplay.textContent = weatherData.weather;
    cityInput.value = '';
})