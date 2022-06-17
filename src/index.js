import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputCoutry = document.querySelector('#search-box');
const listCoutry = document.querySelector('.country-list');
const infoCoutry = document.querySelector('.country-info');

inputCoutry.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    infoCoutry.innerHTML = '';
    listCoutry.innerHTML = '';
    
    const countryName = e.target.value.trim();
    if (countryName === '') {
        return;
    }

    fetchCountries(countryName)
    .then(renderCountry)
    .catch(onFetchError);
}

function renderCountry(countries) {
    console.log(countries);
    
        if (countries.length === 1) {
        infoCoutry.insertAdjacentHTML('beforeend', infoCoutryMarkup(countries));
        } else if (countries.length >= 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
        listCoutry.insertAdjacentHTML('beforeend', listCoutryMarkup(countries));
        }
    }

function onFetchError(error) {
    Notify.failure('Oops, there is no country with that name');
}

function infoCoutryMarkup(country) {
    return country
    .map(({ name, flags, capital, population, languages }) => {
        const markupList = 
        `<ul class="list">
            <li class="country-info__item">
                <img src="${flags.svg}" alt="flag of ${name.official}" width="50">
                <h1 class="country-info__title">${name.official}</h1>
            </li>
            <li class="country-info__item">
                <span class="country-info__span">Capital: </span>${capital}
            </li>
            <li class="country-info__item">
                <span class="country-info__span">Population: </span>${population}
            </li>
            <li class="country-info__item">
                <span class="country-info__span">Languages: </span>${Object.values(languages)}
            </li>
        </ul>`;
    return markupList;
    }).join('');
};

function listCoutryMarkup(country) {
return country
    .map(({ name, flags }) => {
        const markupInfo = 
            `<li class="country-list__item">
                <img src="${flags.svg}" alt="flag of ${name.official}" width="50">
                <h1 class="country-list__title">${name.official}</h1>
            </li>`;
    return markupInfo;
    }).join('');
};




