import uniqid from 'uniqid'
// HANDLES OUR INGREDIENTS LIST //
export default class List {
    constructor() {
        this.items = [];
    }
    addItem (count, unit, ingredient) {
        // using npm we create a unique id for each of our items
        const item = {
            id: uniqid(),
            // count: count;
            count, 
            // unit: unit;
            unit,
            // ingredient: ingredient;
            ingredient
        }
        // push the object to items(state above)
        this.items.push(item);
        return item;
    }
    deleteItem(id){
        // check where the element ID is the same as the id we passed in
        const index = this.items.findIndex(el => el.id === id);
        // take out what we selected and remove just 1 element(instead of multiple)
        this.items.splice(index, 1)
    }
    updateCount(id, newCount){
        // find the element where the element id is the same as the id we passed in
        // and make it equal to the newCount
        this.items.find(el => el.id === id).count = newCount;
    }
}