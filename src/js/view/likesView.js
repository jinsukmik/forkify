import {elements} from './base'
import {limitRecipeTitle} from './searchView';
// controls which heart is being displayed
export const toggleLikeBtn = isLiked => {
    //ternary operator if like then icon-heart else heart-outline
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}
// controls if the heart on the top right is visible or hidden
export const toggleLikeMenu = numLikes => {
    elements.likesMenu.getElementsByClassName.visibility = numLikes > 0 ? 'visible' : 'hidden';
}
export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${limitRecipeTitle(like.title)}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${like.title}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};
// delete the parent element of the element that we selected
export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}