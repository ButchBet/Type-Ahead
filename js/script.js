// alert('Hello World');
// Elements
const search = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');
const mainSuggestions = Array.from(document.getElementsByClassName('from--main'));
const counter = document.getElementById('counter');

// Objects with the cities
const endPoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const options = {
    method: 'GET'
}
fetch(endPoint, options)
    .then(response => response.json())
    .catch(error => console.log(error))
    .then(data => cities.push(...data)); // Loading the cities into an array

search.addEventListener('input', (e) => {
    const value = search.value.trim();

    suggestionsList.textContent = '';

    if(value.length > 0) { // Avoid making search when the input is empty
        const suggestions = matchedCities(value, cities); // Get the suggestions

        changeSuggestionsQuantity(suggestions); // Set the quantity of sugestions

        showSuggestions(value, suggestions);
    } else { // Show the main items when the string be empty
        changeSuggestionsQuantity([]); // Set the results as 0
    }
});

// Function to find the posible cities or states and filter them
function matchedCities(input, cities) {
    const regex = new RegExp(input, 'gi');
    
    return cities.filter((city) => city.city.match(regex) || city.state.match(regex))
}

// Function to set the item found in the searching 
function changeSuggestionsQuantity(suggestions) {
    counter.textContent = suggestions.length;
}

// Function show the suggestions 
function showSuggestions(input, suggestions) {
    const items = suggestions.map((place, index, array) => {
        const regex = new RegExp(input, 'gi');

        const city = place.city.replace(regex, `<span class="marked">${input}</span>`);

        const state = place.state.replace(regex, `<span class="marked">${input}</span>`);

        // Check if the element is pair or odd in order to the array of siggestions
        let position = '';

        if((index + 1 ) % 2 === 0) {
            position = 'pair';
        } else {
            position = 'odd';
        }

        return `
            <li class="form__item form--${position}">
                <span>${city}, ${state}</span>
                <span class="population">${populationWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');

    suggestionsList.innerHTML = items;
}

// Function to set the poputaliton with commas
function populationWithCommas(population) {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}