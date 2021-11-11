import refs from './refs'
import { getWeatherData } from './services'

const { weatherContainer, searchForm, showWidgetBtn, card } = refs

showWidgetBtn.addEventListener('click', () => {
    card.classList.toggle('isHide')
})

searchForm.addEventListener('submit', getWeathere)

function getWeathere(e) {
    e.preventDefault()
    getWeatherData(e.target.elements.searchBar.value, weatherContainer)
    searchForm.reset()
}

if (!card.classList.contains('isHide')) {
    searchForm.removeEventListener('submit', getWeathere)
}