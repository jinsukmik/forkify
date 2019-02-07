import Search from './models/Search';
import * as searchView from './view/searchView'
import {elements, renderLoader, clearLoader} from './view/base';
/** global state 
* - search object
* - current recipe object
* - shopping list object
* - liked recipes
*/
const state = {}
// search controller
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
        //search for recipes
        await state.search.getResults();
        //render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    // stops page from refreshing
    e.preventDefault();
    // run the search function
    controlSearch();
})
