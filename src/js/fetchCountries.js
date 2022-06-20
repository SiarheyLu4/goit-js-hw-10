
export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
//         .then(response => {
//             if (!response.ok) {
//    throw new Error('Ответ сети был не ok.');
// }
//             return response.json();
//         })
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error(response.statusText)
        })
        .catch((err) => {
        console.log(err)
    })
};



// if (!response.ok) {
//    throw new Error('Ответ сети был не ok.');
// }