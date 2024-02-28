import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable() //Injects recipe service into the recipes component

export class RecipeService{


  recipesChanged = new Subject<Recipe[]>(); //Reload the recipe list to reflect updates and newly added recipes
   //Stores selected Recipe from recipe list (obtained from recipe-item under recipe-list)

    private recipes : Recipe[] = []          //This object has been defined in recipe.model.ts
    

  constructor(private slService:ShoppingListService){}

  getRecipes(){
    return this.recipes.slice(); //Returns contents of above array recipes (slice not needed but refreshes array often)
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingLIst(ingredients : Ingredient[]){
    this.slService.addIngredients(ingredients); //Uses addIngredients from shoppingListServices to add items to shopping list
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice()); //Add a new recipe into recipe list
  }

  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice())  //Update existing recipe
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes : Recipe[]){
    this.recipes=recipes;
    this.recipesChanged.next(this.recipes.slice()); //Update recipe list when data loaded from db
  }

}