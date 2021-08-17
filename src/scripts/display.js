import '../styles/style.css';
import Logo from '../assets/logo_white_cropped.png';
import Day from '../assets/day.jpg';
import Night from '../assets/night.jpg';
import Weather from '../assets/weather.jpg';

function basicElementFactory(...elementDetails)	{ //Element tag name, Element id (send value as undefined for no id), Element class 1, class 2 ....
	let div = document.createElement(elementDetails[0]);

	for (let i = 1; i < elementDetails.length; i++)	{
		if (i === 1 && elementDetails[i] !== undefined)	{
			div.id = elementDetails[i];	
		}	else if (i !== 1)	{
			div.className += ` ${elementDetails[i]}`;
		}
	}
	return div;
}

function createUpperBar()
{
	const upperBar = basicElementFactory('div', undefined, 'upper-bar');

	const logoContainer = basicElementFactory('div', undefined, 'logo-container');
	const logoText = basicElementFactory('p');
	logoText.innerText = "Powered by";
	const logoImg = basicElementFactory('img', undefined, 'logo-img');
	logoImg.src = Logo;
	logoContainer.append(logoText);
	logoContainer.append(logoImg);

	const title = basicElementFactory('h1', 'title');
	title.innerText = "Weather Report";

	upperBar.append(logoContainer);
	upperBar.append(title);
	return upperBar;
}

function createLowerBar()
{
	const lowerBar = basicElementFactory('div', undefined, 'lower-bar');
	return lowerBar;
}

function returnDateAndTime()
{
	const currentDate = new Date();
	const dayArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const day = dayArr[(currentDate.getDay() - 1)];
	const date = currentDate.getDate().toString().padStart(2, '0');
	const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const month = monthArr[currentDate.getMonth()];
	const year = currentDate.getFullYear().toString();
	const hours = currentDate.getHours().toString().padStart(2, '0');
	const minutes = currentDate.getMinutes().toString().padStart(2, '0');

	return [minutes, hours, day, date, month, year];
}

function updateDateAndTimeIndefinitely(timeBox, dateBox)
{
	let timeArr =  returnDateAndTime();
	timeBox.innerText = `${timeArr[1]}:${timeArr[0]}`;
	dateBox.innerText = `${timeArr[2]}, ${timeArr[4]}-${timeArr[3]}, ${timeArr[5]}`;

	new Promise(resolve => {
		setTimeout(() => resolve(), 10000);
	}).then(() => updateDateAndTimeIndefinitely(timeBox, dateBox));
}

function createSeperatedText(text1, text2, textClass, boxClass)
{
	const div = basicElementFactory('div', undefined, boxClass);
	const textBox1 = basicElementFactory('p', undefined, textClass);
	textBox1.innerText = text1;
	const textBox2 = basicElementFactory('p', undefined, textClass);
	textBox2.innerText = text2;
	div.append(textBox1);
	div.append(textBox2);
	return div;
}

function changeWeatherCardBackgroundImg(imgNode) 
{
	let imagePath;
	const currTime = new Date();
	if (currTime.getHours() < 20 && currTime.getHours() >= 7) {
		imagePath = Day;
		imgNode.style.color = 'rgb(0, 0, 0)';
	}	else {
		imagePath = Night;
		imgNode.style.color = 'rgb(255, 255, 255)';
	}
	
	new Promise((resolve, reject) => {
		const img = new Image();
		img.src = imagePath;
		img.onload = resolve(imagePath);
		img.onerror = reject();
	}).then(imagePath => {
		imgNode.style.background = `url('${imagePath}')`;
	}).catch(() => console.log("Error in loading image"));
}

function addWeatherIcon(imgNode, weatherIconId) 
{
	const iconImgPath = `https://openweathermap.org/img/wn/${weatherIconId}@2x.png`;
	
	new Promise((resolve, reject) => {
		const img = basicElementFactory('img', undefined, 'weather-icon');
		img.src = iconImgPath;
		img.onload = resolve(img);
		img.onerror = reject();
	}).then(img => imgNode.append(img))
	.catch(() => console.log("Error in loading image"));
}

function createInfoCard(weatherData)
{
	const infoCard = basicElementFactory('div', 'info-card');
	changeWeatherCardBackgroundImg(infoCard);

	const timeBox = basicElementFactory('div', 'time-box');
	const dateBox = basicElementFactory('div', 'date-box');
	updateDateAndTimeIndefinitely(timeBox, dateBox);
	infoCard.append(timeBox);
	infoCard.append(dateBox);

	const tempBox = basicElementFactory('div', 'temp-box');
	const temp = basicElementFactory('p', undefined, 'temp-text');
	temp.innerText = `${Math.round(weatherData['main']['temp'])}°C`;
	tempBox.append(temp);

	const locationBox = basicElementFactory('div', 'location-box');
	const location = basicElementFactory('p', undefined, 'location-text');
	location.innerText = `${weatherData['name']}, ${weatherData['sys']['country']}`;
	locationBox.append(location);

	const tempAndLocation = basicElementFactory('div', undefined, 'main-arrange');
	tempAndLocation.append(tempBox);
	tempAndLocation.append(locationBox);

	const iconBox = basicElementFactory('div', 'weather-icon-box');
	addWeatherIcon(iconBox, weatherData['weather'][0]['icon']);

	const descriptionText = weatherData['weather'][0]['description'];
	const weatherDescription = basicElementFactory('div', 'weather-desciption');
	const description = basicElementFactory('p', undefined, 'weather-text');
	description.innerText = descriptionText[0].toUpperCase() + descriptionText.slice(1);
	weatherDescription.append(description);

	const mainWeather = basicElementFactory('div', undefined, 'main-arrange');
	mainWeather.append(iconBox);
	mainWeather.append(weatherDescription);

	const mainDetails = basicElementFactory('div', 'main-details');
	mainDetails.append(mainWeather);
	mainDetails.append(tempAndLocation);

	const humidity = createSeperatedText('Humidity: ', `${Math.round(weatherData['main']['humidity'])} %`, 'details-text', 'text-box');
	const cloudiness = createSeperatedText('Cloudiness: ', `${Math.round(weatherData['clouds']['all'])} %`, 'details-text', 'text-box');
	const wind = createSeperatedText('Wind Speed: ', `${Math.round((weatherData['wind']['speed'])*(18/5))} km/hr`, 'details-text', 'text-box');

	const otherDetails = basicElementFactory('div', 'other-details');
	otherDetails.append(humidity);
	otherDetails.append(cloudiness);
	otherDetails.append(wind);

	const weatherBox = basicElementFactory('div', 'weather-box');
	weatherBox.append(mainDetails);
	weatherBox.append(otherDetails);
	infoCard.append(weatherBox);

	return infoCard;
}

function changeMainBackgroundImg(imgNode) 
{
	const imagePath = Weather;

	new Promise((resolve, reject) => {
		const img = new Image();
		img.src = imagePath;
		img.onload = resolve(imagePath);
		img.onerror = reject();
	}).then(imagePath => {
		imgNode.style.background = `url('${imagePath}')`;
	}).catch(() => console.log("Error in loading image"));
}

export function displayWeatherDetails(weatherData, containerNode)	{
	changeMainBackgroundImg(containerNode);
	containerNode.append(createUpperBar());
	containerNode.append(createInfoCard(weatherData));
	containerNode.append(createLowerBar());
}