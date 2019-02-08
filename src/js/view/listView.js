// imports //
import {elements} from './base';
// RENDER THE ITEM //
export const renderItem = item => {
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input class="shopping__count-value" type="number" value="${item.count}" step="${item.count}">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    // where and what were attaching the above
    elements.shopping.insertAdjacentHTML('beforeend', markup);
}
//delete the item/ingredient
export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
}