import '../sass/main.scss';
import { debounce } from 'lodash';
import { error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries';
import countryCard from '../templates/country-card.hbs';
import countriesList from '../templates/countries-list.hbs';

const refs = {
  input: document.querySelector('#input'),
  output: document.querySelector('.country-box'),
  country: document.querySelector('.country-box'),
};

refs.input.addEventListener('input', debounce(onInput, 500));
refs.country.addEventListener('click', e => {
  if (e.target.className === 'name-country') {
    refs.input.value = e.target.innerText;
    refs.output.classList.remove('show-js');
    setTimeout(() => onInput(), 250);
  }
  return;
});

function onInput(event) {
  const userRequest = event.target.value.trim();
  if (!userRequest) return;

  /*if (!refs.input.value) return markupOutput(0);

  if (!refs.input.value.match(/^[a-zA-Z,() ']*$/)) {
    markupOutput(0);
    return errMsg('415', 'Use latin alphabet on the search!');
  }
  */

  fetchCountries(refs.input.value).then(data => {
    if (!data) {
     /* markupOutput(0);*/
      return errMsg(
        data.status,
        `Country "${refs.input.value}" is not found. Please specify your request!`,
      );
    }

    if (data.length > 10) {
      /*markupOutput(0);*/
      errMsg('300', `Found ${data.length} matches. Enter a more specific request!`);
    } else if (data.length > 2 && data.length <= 10) {
      markupOutput(countriesList(data));
    } else {
      markupOutput(countryCard(...data));
    }
    return;
  });

  function markupOutput(markup) {
    if (markup) {
      refs.output.innerHTML = markup;
      refs.output.classList.add('show-js');
    } else {
      refs.output.classList.remove('show-js');
      return (refs.output.innerHTML = '');
    }
  }

  function errMsg(numErr, message) {
    const myStack = new Stack({
      dir1: 'right',
      firstpos1: 25,
      push: 'top',
      modal: true,
    });

    return error({
      text: message,
      delay: 2000,
      closer: false,
      stack: myStack,
      title: `Error - ${numErr}`,
      icon: false,
      width: '250px',
      sticker: false,
      addClass: 'error-box',
    });
  }
}
