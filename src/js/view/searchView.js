import {elements} from './base';
export const getInput = () => elements.searchInput.value;
// constructor for recipes incoming
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`
};
elements.searchResultsList.insertAdjacentHTML('beforeend',markup);
//iterate through the array and return it
export const renderResults = recipes => {
    recipes.forEach(el => renderRecipe(el))
}