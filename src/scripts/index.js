import { displayWeatherDetails } from './display.js';
import { createSearchBar } from './search.js';

const API_KEY = 'f90c504e7a14a5c2e6b08327a814205b';
const container = document.getElementById('container');

async function fetchWeatherData(locationString, API_KEY)	
{
	const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locationString}&appid=${API_KEY}&units=metric`);
	const weatherData = await response.json();
	return weatherData;
}

function fetchAndDisplayWeatherData(locationString)	
{
	clearContainer(container);

	if (locationString === 'default')	displayWeatherDetails('default', container);
	else fetchWeatherData(locationString, API_KEY).then(resolve => {	displayWeatherDetails(resolve, container)	});

	initializeSearchBar();
}

function initializeSearchBar()
{
	const formNode = createSearchBar(container);
	formNode.addEventListener('submit', extractFormData);
}

function extractFormData(event) 
{
	event.preventDefault();
	const inputForm = new FormData(event.target);
	fetchAndDisplayWeatherData(inputForm.get('city'));
}

function clearContainer(node)
{
	while(node.firstChild)
		node.removeChild(node.firstChild);
}

(function() {
	fetchAndDisplayWeatherData('default');
}());