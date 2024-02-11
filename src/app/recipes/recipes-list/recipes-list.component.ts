import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent implements OnInit {
  recipes : Recipe[] = []; //Initializes empty recipe array



  constructor(private recipeService:RecipeService){

  }

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes(); //Recipe Service gets all available recipes and puts them in a list which is iterated through ngFor
  }

  
}
