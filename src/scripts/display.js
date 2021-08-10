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

export function displayWeatherDetails(weatherData, containerNode)	{
	containerNode.append(createUpperBar());
	containerNode.append(createLowerBar());
}
