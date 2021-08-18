import { basicElementFactory } from './display.js';
import SearchBtn from '../assets/search.png';

export function createSearchBar(containerNode)
{
	const searchForm = basicElementFactory('form', 'search-form');
	searchForm.setAttribute('name', 'search-form');

	const searchContainer = basicElementFactory('div', undefined, 'search-container')

	const searchBar = basicElementFactory('input', 'search-bar');
	searchBar.setAttribute('type', 'text');
	searchBar.setAttribute('maxlength', '20');
	searchBar.setAttribute('placeholder', 'Enter a city name');
	searchBar.setAttribute('name', 'city');
	
	const searchButton = basicElementFactory('input', 'search-button');
	searchButton.setAttribute('type', 'image');
	searchButton.setAttribute('alt', 'Submit');
	searchButton.src = SearchBtn;

	searchContainer.append(searchBar);
	searchContainer.append(searchButton);
	searchForm.append(searchContainer);
	containerNode.append(searchForm);

	return searchForm;
}

