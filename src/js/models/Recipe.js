// NPM for AJAX calls //
import axios from 'axios';
// api info //
import {key, cors} from '../config';
// HANDLES GET AJAX CALL // http = ...get?...
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
    // CALCULATE ESTIMATED TIME TO CREATE RECIPE // - assuming that we need 15 minutes for each 3 ingredients
    calcTime(){
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
    // Make sure all our units of measurements are uniform
    parseIngredients(){
        // need to put words with S first, so that it doesnt partially replace our unitsLong words
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        //starts our array with the items inside of unitsShort
        const units = [...unitsShort, 'kg', 'g']
        // function that changes our strings to seperate
        const newIngredients = this.ingredients.map(el => {
            // uniform units of measurements
            let ingredient = el.toLowerCase();
            // if we find any of the unitsLong words, we replace it with the same positioned unitsShort abbreviation
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            // remove parentheses with regular expression, we replace parentheses with a space
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            // parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            // find the index, where the unit is located, indexOf() doesnt work here b/c we dont know what unit were looking for
            // includes - returns true if the element were passing is in the units array
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            
            // if there is an unit
            let objIng;
            if(unitIndex > -1){
                // array ingredients, sliced from the beginning until the unitIndex excluding
                //example: 4 1/2 cups = arrCount is [4,1/2]
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                // if we have just 1 number ( no fractions after) count = arrIng[0]
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                }
                // otherwise (ex: 4 1/2) combine those two strings
                else{
                    // make it so 4 1/2 = eval = 4.5
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    //count = count
                    count,
                    unit: arrIng[unitIndex],
                    // starts right after the unit
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            }
            //there is no unit but the first position is a number(example 1 packet of active dry yeast)
            else if(parseInt(arrIng[0], 10)){
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    // entire array except the first element
                    ingredient: arrIng.slice(1).join(' ')
                }
            }
            // there is no unit and no number in the first position
            else if (unitIndex === -1){
                objIng = {
                    count: 1,
                    unit: '',
                    // ingredient: ingredient
                    ingredient
                }
            }
            return objIng;
        });        
        this.ingredients = newIngredients;
    }
    // updates the servings, which in turn updates the amount of ingredients needed for the recipe
    updateServings(type){
        //Servings
        // ternary operator: if its (dec)decreasing this.servings - 1, otherwise this.servings + 1
        const newServings = type === 'dec' ? this.servings -1 : this.servings + 1;
        //Ingredients
        //ing: current value of foreach loop
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newServings / this.servings);
        })

        this.servings = newServings;
    };
}

