import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable() //In order to use a shoping list service in recipe service we use Injectable, this is done so we can send our ingredients to the shopping list
//Note:- injectable not used for recipe services as its within the same folder

export class RecipeService{

    recipeSelected  = new EventEmitter<Recipe>(); //Stores selected Recipe from recipe list (obtained from recipe-item under recipe-list)

    private recipes : Recipe[] = [          //This object has been defined in recipe.model.ts
    new Recipe('Burger','A juicy hamburger','https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg',[
      
      new Ingredient("Buns",2),
      new Ingredient("Meat",1)
    ]),
    new Recipe('Schnitzel','A tasty schnitzel','https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/05/thumb-1200x675.jpg',[
      new Ingredient("Meat",1),
      new Ingredient("French Fries",20)
    ])

  ]; 

  constructor(private slService:ShoppingListService){}

  getRecipes(){
    return this.recipes.slice(); //Returns contents of above array recipes (slice not needed but refreshes array often)
  }

  addIngredientsToShoppingLIst(ingredients : Ingredient[]){
    this.slService.addIngredients(ingredients); //Uses addIngredients from shoppingListServices to add items to shopping list
  }
}