// query selectors that we will import on other files //
export const elements = {
    // dom selector for search button
    searchForm: document.querySelector('.search'),
    // dom selector for search value
    searchInput: document.querySelector('.search__field'),
    // dom selector for results area
    searchResultsList: document.querySelector('.results__list'),
    // dom selector for results parent container
    searchResults: document.querySelector('.results'),
    // dom selector for result pages 
    searchResultsPages: document.querySelector('.results__pages'),
    // dom selector for recipe
    recipe: document.querySelector('.recipe'),
    // dom selector for shopping list
    shopping: document.querySelector('.shopping__list')
}

export const elementStrings = {
    loader: 'loader'
};
// RENDER THE LOADER //
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    // where and what were attaching
    parent.insertAdjacentHTML('afterbegin', loader);
}
// CLEAR THE LOADER //
export const clearLoader = () => {
    // class selector
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}