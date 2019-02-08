// import dom selectors from base.js // 
import {elements} from './base';
// get the value of search input //
export const getInput = () => elements.searchInput.value;
// change the value of search input to empty //
export const clearInput = () => {
    elements.searchInput.value = '';
};
//change the results area/button to empty //
export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchResultsPages.innerHTML ='';
};
// HIGHLIGHT SELECTED ITEMS //
export const highlightSelected = id => {
    // grabs all the containers with the class results__link
    const resultsArr = Array.from(document.querySelector('.results__link'))
    // iterate through this array
    resultsArr.forEach(el => {
        // remove the results__link--active class from all the results
        el.classList.remove('results__link--active');
    })
    // gives the links with the correct ID a class of results__link--active
    document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active')
}
// SHORTENS THE RECIPE TITLE //
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    //if the length of the title is greater than limit...
    if(title.length > limit) {
        // split the title by words
        // accumulator and current value
        title.split(' ').reduce((acc,cur) => {
            if( acc + cur.length <= limit){
                // push the current word into the newTitle array
                newTitle.push(cur);
            }
            return acc + cur.length;
        // start accumulator at 0
        },0);
        // join elements of an array into string, seperated by spaces and add ... to indicate that the title is longer  
        return `${newTitle.join(' ')} ...`;
    }    
    //otherwise just return it
    return title;
}
// *EXTRA* //
/* another way to solve the same problem above
const limitRecipeTitle = (title, limit=21) => {
	title = title.trim();
	if(title.length <= limit) return title;
	let words = title.split(" ");
	let newTitle = words.shift();
	// testing for (limit - 4) leaves room for the ellipsis at the end.
	while (newTitle.length + words[0].length < limit - 4) newTitle += " " + words.shift();
	return newTitle + " ...";
*/
// *EXTRA* //


// CONSTRUCTOR FOR RECIPES //
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;
    elements.searchResultsList.insertAdjacentHTML('beforeend', markup); 
};
// render the next/previous buttons


// RENDERS NEXT/PREVIOUS BUTTONS //
// ternary operator to make an if else statement.
//if the type is prev make the arrow go left, otherwise right
//if the type is prev than its page - 1. otherwise its page + 1
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;
            
// RENDERS PAGE BUTTON // 
// according to the number of the page that we are one
const renderButtons = (page, numResults, resultsPerPages) => {
    // Tells us that there are 3 pages of data because 30 entries / 10 slots per page = 3 pages
    // we math.ceil this number incase the API limit increases/decreases
    const pages = Math.ceil(numResults / resultsPerPages);
   
    let button; 
    // if this is the first page
    if(page === 1 && pages > 1){
        // only display button to go to next page
        button = createButton(page, 'next');
    }else if(page < pages) {
        // display both previous and next page
        button = `${createButton(page, 'next')}
                ${createButton(page, 'prev')}
                `;
    }else if (page === pages && pages > 1){
        // only display button to go to previous page
        button = createButton(page, 'prev');
    }
    // insert buttons here
    elements.searchResultsPages.insertAdjacentHTML('afterbegin', button);
}

// RENDER RESULTS OF CURRENT PAGE //
export const renderResults = (recipes, page = 1, resultsPerPages = 10) => {
    // 0 based index at which to begin extraction of data
    const start = (page - 1) * resultsPerPages;
    // 0 based index before which to end extraction of data
    const end = page * resultsPerPages;
    // runs the slice method for each of the rendered recipes
    recipes.slice(start, end).forEach(renderRecipe);
    //render pagination button
    renderButtons(page, recipes.length, resultsPerPages);
}