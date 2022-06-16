import './css/styles.css';

const DEBOUNCE_DELAY = 300;



function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/ukraine?fields=name,capital,population,flags,languages`)
        .then(response => {
            // console.log(response.json());
            return response.json();
        });
};


    // .then(countries => {
    // console.log(countries);
    // })
    // .catch(error => {
    //     console.log(error);
    // });


