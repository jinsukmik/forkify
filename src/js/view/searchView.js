// import dom selectors from base.js
import {elements} from './base';
// get the value of search input 
export const getInput = () => elements.searchInput.value;
// change the value of search input to empty
export const clearInput = () => {
    elements.searchInput.value = '';
};
//change the results area/button to empty
export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchResultsPages.innerHTML ='';
};
// function to shorten recipe title, takes in the title name and a limit, which is at default 17
// EXAMPLE of the iterations for split //
// 'Pasta with tomato and spinach'//
// acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
// acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta','with']
// acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
// acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
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


// constructor for recipes incoming as well as running the title limiter on recipe.title
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
            
// render the page buttons, according to the number of the page that we are one
const renderButtons = (page, numResults, resultsPerPages) => {
    // Tells us that there are 3 pages because 30 / 10 = 3
    // we math.ceil this number incase the API limit increases/decreases
    const pages = Math.ceil(numResults / resultsPerPages);
    // if this is the first page
    let button;
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

//render results of current page
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