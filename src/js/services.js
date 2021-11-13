import axios from 'axios'
import Handlebars from 'handlebars/runtime';

Handlebars.registerHelper('temp', function (value) {
    console.log(value);
    return (value - 273.15).toFixed(1);
    // return new Handlebars.SafeString(Math.round(value - 273.15))

})

import weatherTemplate from './templates/weatherWidget.hbs'
export function getWeatherData(city, place) {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather`
    const apiKey = `b17a2dddb01d7481fea6373f92c2e546`
    let url = baseUrl + `?q=${city}&appid=${apiKey}`
    if (!city.trim()) alert(`Введите название города`)
    axios
        .get(url)
        .then(result => {
            return result.data
        })
        .then(data => {
            console.log(data)
            insertWidget(weatherTemplate, data, place)
        })
        .catch(err => console.log(err))
}
function insertWidget(template, data, place) {
    place.classList.remove('loading')
    place.insertAdjacentHTML('afterbegin', template(data))
}
