import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";


@Injectable({providedIn: 'root'}) //dependency injection of shopping and ingredients service
export class DataStorageService{
    constructor(private http : HttpClient, private recipeService:RecipeService){}   

    storeRecipes(){
        const recipes=this.recipeService.getRecipes(); //get stored recipes
        this.http.put('https://ng-course-recipe-book-65252-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response => {
            console.log(response);
        }); //Query to store recipes in firebase db needs to be subscribed as the observable has to be executed then

    }

    fetchRecipes(){
        this.http.get<Recipe[]>('https://ng-course-recipe-book-65252-default-rtdb.firebaseio.com/recipes.json').subscribe(recipes => {
            this.recipeService.setRecipes(recipes); //Typecasting is necessary as Angular cannot recognize
                                                    //type of data being fetched
        });
    }
}