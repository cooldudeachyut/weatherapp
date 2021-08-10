import { displayWeatherDetails } from './display.js';

const API_KEY = 'f90c504e7a14a5c2e6b08327a814205b';
const container = document.getElementById('container');

async function fetchWeatherData(locationString, API_KEY)	{
	const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locationString}&appid=${API_KEY}&units=metric`);
	const weatherData = await response.json();
	return weatherData;
}

(function ()	{
	fetchWeatherData('Lucknow', API_KEY).then(resolve => {	displayWeatherDetails(resolve, container)	});
})();


