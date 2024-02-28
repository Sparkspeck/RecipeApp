///USED AS PROVIDER IN APP MODULE SINCE IT HAS TO BE USED BY RECIPE (RECIPESERVICE USED IN RECIPE COMPONENT ONLY)
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>(); //Used to display the shopping list
    startedEditing = new Subject<number>(); //Displays the selected ingredient in shopping list
    private ingredients: Ingredient[]=[];        //Created Ingedients model just like recipe model

  getIngredients(){
    return this.ingredients.slice(); //get ingredients in entire ingredients array for display
  }

  addIngredient(ingredient:Ingredient){ //Data obtained from shopping-edit.ts use refElements
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice()); //next used to emit Subjects
  }

  getIngredient(index:number){
    return this.ingredients[index]; //get ingredient when selected
  }

  addIngredients(ingredients:Ingredient[]){   //For sending ingredients from recipe to shopping list
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number,newIngredient:Ingredient){
      this.ingredients[index]=newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice()); //re display the list
    }

    deleteIngredient(index:number){
      this.ingredients.splice(index,1);
      this.ingredientsChanged.next(this.ingredients.slice());//update ingredients subject
      
    }
}
