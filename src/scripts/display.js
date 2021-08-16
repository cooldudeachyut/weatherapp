import '../styles/style.css';
import Logo from '../assets/logo_white_cropped.png';

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

function createInfoCard(weatherData)
{
	const infoCard = basicElementFactory('div', 'info-card');

	const timeBox = basicElementFactory('div', 'time-box');
	const dateBox = basicElementFactory('div', 'date-box');
	updateDateAndTimeIndefinitely(timeBox, dateBox);
	infoCard.append(timeBox);
	infoCard.append(dateBox);

	const weatherBox = basicElementFactory('div', 'weather-box');
	const tempBox = basicElementFactory('div', 'temp-box');
	const temp = basicElementFactory('p', undefined, 'temp-text');
	temp.innerText = `Temperature: ${Math.round(weatherData['main']['temp'])} °C`;
	tempBox.append(temp);

	const otherDetails = basicElementFactory('div', 'other-details');
	const humidity = createSeperatedText('Humidity: ', `${Math.round(weatherData['main']['humidity'])} %`, 'details-text', 'text-box');
	const cloudiness = createSeperatedText('Cloudiness: ', `${Math.round(weatherData['clouds']['all'])} %`, 'details-text', 'text-box');
	const wind = createSeperatedText('Wind Speed: ', `${Math.round((weatherData['wind']['speed'])*(18/5))} km/hr`, 'details-text', 'text-box');
	otherDetails.append(humidity);
	otherDetails.append(cloudiness);
	otherDetails.append(wind);

	weatherBox.append(tempBox);
	weatherBox.append(otherDetails);
	infoCard.append(weatherBox);

	console.log(weatherData);
	return infoCard;
}

export function displayWeatherDetails(weatherData, containerNode)	{
	containerNode.append(createUpperBar());
	containerNode.append(createInfoCard(weatherData));
	containerNode.append(createLowerBar());
}