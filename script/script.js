'use strict';
const city = ['москва', 'ekat', 'gently', 'exhausting'];

const fixCity = city.map(city => city[0].toUpperCase + city.slice(1));

console.log(fixCity);
