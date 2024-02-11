///USED AS PROVIDER IN APP MODULE SINCE IT HAS TO BE USED BY RECIPE (RECIPESERVICE USED IN RECIPE COMPONENT ONLY)

import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new EventEmitter<Ingredient[]>(); //Slice takes copy of Ingredient array but does not update it, this is used to refresh the array every time the service is subscribed to in shopping-list component (Can just plainly return this.ingredients)
    private ingredients: Ingredient[]=[          //Created Ingedients model just like recipe model
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){ //Data obtained from shopping-edit.ts use refElements
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){   //For sending ingredients from recipe to shopping list
    for(let ingredient of ingredients){
        this.addIngredient(ingredient);
    }
  }
}