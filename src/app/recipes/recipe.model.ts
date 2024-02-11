//Creating a blueprint/model of how each recipe is stored

import { Ingredient } from "../shared/ingredient.model";

export class Recipe{                 //Class that defines the variables of a Recipe
    public name : string;
    public description : string;
    public imagePath : string;
    public ingredients:Ingredient[];

    constructor(name : string,desc : string,imagePath : string, ingredients:Ingredient[]){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingredients=ingredients;
    }
}

