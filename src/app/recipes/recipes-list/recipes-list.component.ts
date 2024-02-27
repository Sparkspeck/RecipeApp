import { Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes : Recipe[] = []; //Initializes empty recipe array
  subscription : Subscription;



  constructor(private recipeService:RecipeService,
              private router:Router,
              private route:ActivatedRoute,){

  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
        (recipes:Recipe[])=>{
          this.recipes=recipes;
        }
    )
    this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{this.recipes=recipes;});
    this.recipes=this.recipeService.getRecipes(); //Recipe Service gets all available recipes and puts them in a list which is iterated through ngFor
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route}); //Changes path to new recipe component when button is clicked
  }

  ngOnDestroy(){

  }
  
}
