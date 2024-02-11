import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrl: './recipes-item.component.css'
})
export class RecipesItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService:RecipeService){

  }
  

  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe); //Selected recipe item sent to recipeServices (very first line)
  }

}
