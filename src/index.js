import 'animate.css';
import './sass/main.scss';
import fetchCountries from './js/fetchCountries.js';
import { debounce } from 'lodash';
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyCountdown from '@pnotify/countdown';

defaultModules.set(PNotifyMobile, { swipeDismiss: false });
import countrysElem from './js/templates/countrysElem.hbs';
import countryList from './js/templates/countryList.hbs';

const refs = {
    inputForm: document.querySelector('.form__country'),
    inputValue: document.querySelector('.form__country-input'),
    divContainer: document.querySelector('.countrys__block'),
}

refs.inputValue.addEventListener('input', debounce((onInputCountrys), 500));

function countryGet(name) {
    fetchCountries(name)
        .then(data => {
            if (data.length > 10) {
                errorPopUpList();
            } else if (data.length > 1) {
                renderCountriesList(data);
            } else if (countryCard !== 'null') {
                const countryCard = document.querySelector('.country__option')
                console.log(countryCard)
                renderCountries(data);
            }
        })
        .catch(() => {
            errorPopUp()
        });
}
function errorPopUp() {
    error({ title: 'Вы ввели не корректные данные!', text: 'Пожалуйста, введите название страны на Английском языке!' });
}
function errorPopUpList() {
    error({ title: 'Найдено слишком много совпадений.', text: 'Пожалуйста, введите более конкретный запрос!' });
}

function onInputCountrys(evt) {
    const name = evt.target.value;
    countryGet(name)
}

function renderCountries(countries) {
    const marcup = countrysElem(countries);
    refs.divContainer.innerHTML = marcup;
}


function renderCountriesList(countries) {
    const marcup = countryList(countries);
    refs.divContainer.innerHTML = marcup;
    onClickLink();
}


function onClickLink() {
    const countryItem = document.querySelectorAll('.country__list-item');
    countryItem.forEach(el => {
        el.addEventListener('click', e => {
            refs.inputValue.value = e.target.textContent
            fetchCountries(refs.inputValue.value).then(renderCountries)
            refs.inputForm.reset()
        })
    })
}






