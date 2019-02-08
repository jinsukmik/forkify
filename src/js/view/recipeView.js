// import //
import {elements} from './base';
// npm package that changes the decimals into fractions //
import {Fraction} from 'fractional';
// clears the recipe container // 
export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}
// FRACTIONAL npm package // - changes integers with decimals into fractions using their logic
const formatCount = count => {
    if(count){
        const newCount = Math.round(count * 10000) / 10000;
        // split count into an array the holds integer number and the decimal number. they are both strings so we need to convert to integers
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el,10));
        // if no decimal, then just return the count
        if(!dec) return newCount;
        // if theres no integer, but there is a decimal
        if(int === 0){
            // count = 2.5 --> 5/2 --> 2 1/2
            // cunt = 0.5 --> 1/2
            const fr = new Fraction(newCount);
            // returns as a fraction
            return `${fr.numerator}/${fr.denominator}`
        }
        else{
            // example - take 5/2 from above and return it like 2 1/2 
            const fr = new Fraction(newCount - int);
            return `${int} ${fr.numerator}/${fr.denominator}`
        }
    }
    //it doesnt work and returns ?
    return '?';
};
// VIEW for ingredients //
const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;
// VIEW for our recipe list //
export const renderRecipe = (recipe, isLiked) => {
    const markup = `
        <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>
        
        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
            ${recipe.ingredient.map(el => createIngredient(el)).join('')}
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};
// UPDATE SERVINGS OF INGREDIENTS// 
export const updateServingsIngredients = recipe => {
    // update the servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    // update ingredients with class recipe__count
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    // iterate through the array and change the text content
    countElements.forEach((el,i) => {
        el.textContent = formatCount(recipe.ingredients[i]);
    });
}