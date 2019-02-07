// for the ajax call
import axios from 'axios';
//api info
import {key, cors} from '../config';

export default class Recipe {
    // each recipe has an id, based on the id were going to make ajax calls for the recipe
    constructor(id){
        this.id = id;
    }
    // asynchronous function
    async getRecipe(){
        try{
            // define our HTTP request
            const res = await axios(`${cors}https://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            // take these properties from the response and save it to this instance
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.img_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch(error){
            console.log(error);
            alert('Something went wrong');
        }
    }
    calcTime(){
    // assuming that we need 15 minutes for each 3 ingredients
    // number of ingredients
    const numIng = this.ingredients.length;
    // number of 15 minute periods that we have 
    const periods = Math.ceil(numIng / 3);

    this.time = periods * 15;
    }
    // Assume that all recipes are meant to serve 4 people
    calcServings(){
        this.servings = 4;
    }
}

