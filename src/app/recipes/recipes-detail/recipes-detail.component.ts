import { Component} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrl: './recipes-detail.component.css'
})
export class RecipesDetailComponent {
  recipe : Recipe; //creates an instance of Recipe class from recipe.model.ts
  id:number;

  constructor(private recipeService:RecipeService,//creates an instance of RecipeService
              private route: ActivatedRoute,
              private router:Router){} 

  ngOnInit(){
    const id=this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingLIst(this.recipe.ingredients); //Uses function from recipeService to store ingredients onto shopping list
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route}); //Moves to recipe edit component when edit is clicked in a recipe (forecfully changes route to recipe/id/new)
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}


