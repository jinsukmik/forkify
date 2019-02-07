// for the ajax call
import axios from 'axios';
//api info
import {key, cors} from '../config';
export default class Search {
    // add properties we want the new properties to have
    constructor(query){
        this.query = query;
    }
    // async = this function returns a promise. it takes in results to add to our HTTP request
    async getResults(){

        try{
            // await this result(promise) AJAX call
            const res = await axios(`${cors}https://food2fork.com/api/search?key=${key}&q=${this.query}`)
            // result from the AJAX call
             this.result = res.data.recipes;
        }catch(error){
            alert(error);
        }
    }
}