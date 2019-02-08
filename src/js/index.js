import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './view/searchView'
import * as recipeView from './view/recipeView'
import {elements, renderLoader, clearLoader} from './view/base';
/** global state 
* - search object
* - current recipe object
* - shopping list object
* - liked recipes
*/
const state = {}
// SEARCH CONTROLLER
const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();
    console.log(query);
    if(query){
        // new search object and add to state
        state.search = new Search(query);
        //prepare UI for results, by clearing it
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);
        
        try{
            //search for recipes
            await state.search.getResults();
            //render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }
        catch(err){
            alert('Something is wrong with the search...');
            clearLoader();
        }
    }
}
// submit event
elements.searchForm.addEventListener('submit', e => {
    // stops page from refreshing
    e.preventDefault();
    // run the search function
    controlSearch();
});
// click event we use e to have access to event
elements.searchResultsPages.addEventListener('click', e => {
    // grab the closest parent's class with btn-inline
    const btn = e.target.closest('.btn-inline')
    if(btn){
        // select the element using data-goto attribute
        // convert this string to an integer, base 10 = 0-9
        const goToPage = parseInt(btn.dataset.goto, 10);
        // clear the search view so it does not show double
        searchView.clearResults();
        // render results to search view with gotoPage buttons
        searchView.renderResults(state.search.result, goToPage);
    }
});

// RECIPE CONTROLLER
const controlRecipe = async () => {
    // get entire url -> just the hash (ID) -> REMOVE the hash with ''
    const id = window.location.hash.replace('#','');
    console.log(id);
    if(id){
        // prepare UI for changes
        recipeView.clearRecipe
        renderLoader(element.recipe)
        //highlight selected search item
        if (state.search) searchView.highlightSelected(id);
        
        // create new recipe object
        state.recipe = new Recipe(id);
        try {
            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);  
        }
        catch(err){
            alert('Error processing recipe!');
        }
    }
}
// we needed this because if someone saves an URL with the hash, they wont be able to render anything
// works when the hash is changed
// window.addEventListener('hashchange', controlRecipe);
// works when page is loaded
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));