// imported models // 
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
// imported views // 
import * as searchView from './view/searchView'
import * as recipeView from './view/recipeView'
// imported functions and selectors //
import {elements, renderLoader, clearLoader} from './view/base';
// GLOBAL STATE - search object, current recipe object, shopping list object, liked recipes //
const state = {}
// SEARCH CONTROLLER //
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
// SUBMIT EVENT //
elements.searchForm.addEventListener('submit', e => {
    // stops page from refreshing
    e.preventDefault();
    // run the search function
    controlSearch();
});
// CLICK EVENT //
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
// RECIPE CONTROLLER //
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
// window.addEventListener('hashchange', controlRecipe); - now works when the hash is changed
// window.addEventListener('load', controlRecipe); - now works when page is loaded
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// SERVING CONTROLLER //
elements.recipe.addEventListener('click', e => {
    // btn-decrease, and ANY child of btn-decrease
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        // only decrease if the servings is greater than 1
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } 
    // btn-increase, and ANY child of btn-increase
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
})

//test
window.l = new List();