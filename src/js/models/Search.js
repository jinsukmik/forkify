import axios from 'axios';

export default class Search {
    // add properties we want the new properties to have
    constructor(query){
        this.query = query;
    }
    // async = this function returns a promise. it takes in results to add to our HTTP request
    async getResults(){
        // api key
        const key = '04f7503812fffada5e6384429b55186d';
        // this allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served
        const cors = 'https://cors-anywhere.herokuapp.com/';
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