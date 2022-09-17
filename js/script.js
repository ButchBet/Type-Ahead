// alert('Hello World');
// Elements
const search = document.getElementById('search');
const suggestions = document.getElementById('suggestions');
const mainSuggestions = Array.from(document.getElementsByClassName('from--main'));

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
    let value = search.value.trim();

    if(value.length > 0) { // Avoid making search when the input is empty
        mainSuggestions.forEach((suggestion) => {
            suggestion.classList.add('hidenItem');
        });

        let suggestions = matchedCities(value, cities);
        console.log(suggestions);

        
    } else { // Show the main items when the string be empty
        mainSuggestions.forEach((suggestion) => {
            suggestion.classList.remove('hidenItem');
        });
    }
});

// Function to find the posible cities or states and filter them
function matchedCities(input, cities) {
    return cities.filter((city) => city.city.includes(input) || city.state.includes(input))
}