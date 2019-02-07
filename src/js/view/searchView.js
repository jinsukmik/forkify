// import dom selectors from base.js
import {elements} from './base';
// get the value of search input 
export const getInput = () => elements.searchInput.value;
// change the value of search input to empty
export const clearInput = () => {
    elements.searchInput.value = '';
};
//change the results area to empty
export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
}
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
            return acc + cur.length
        // start accumulator at 0
        },0);
        // return the result
        return `${newTitle.join(' ')} ...`;
        }
        return title;
    //otherwise just return it
    // join elements of an array into string, seperated by spaces and add ... to indicate that the title is longer  
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
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;
    elements.searchResultsList.insertAdjacentHTML('beforeend', markup); 
};


//iterate through the array and return it
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}