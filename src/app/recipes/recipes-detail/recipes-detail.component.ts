import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrl: './recipes-detail.component.css'
})
export class RecipesDetailComponent {
  @Input() recipe : Recipe; //creates an instance of Recipe class from recipe.model.ts

  constructor(private recipeService:RecipeService){} //creates an instance of RecipeService

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingLIst(this.recipe.ingredients); //Uses function from recipeService to store ingredients onto shopping list
  }
}


