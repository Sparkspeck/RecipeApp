import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent {
  id: number;
  editMode=false;
  recipeForm : FormGroup;

  constructor(private route:ActivatedRoute,
              private recipeService : RecipeService,
              private router : Router){}

ngOnInit(){
  this.route.params.subscribe((params:Params)=>{   //Check if parameters have changed in correct route
    this.id = +params['id'];
    this.editMode=params['id']!=null; //if edit recipe of selected recipe is clicked, this returns true
    this.initForm();
  })
}

onSubmit(){
const newRecipe=new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients']);

  if(this.editMode){
    this.recipeService.updateRecipe(this.id, newRecipe); //if in edit mode, whatever is in recipeForm updates current vals
  }else{                                     //NOTE: USING this.recipeForm.value IS SAME AS newRecipe, hence all declarations not needed
    this.recipeService.addRecipe(newRecipe); //if not in edit mode, recipeForm is used to add new data
  }

  this.onCancel();
}

onAddIngredient(){
  (<FormArray>this.recipeForm.get('ingredients')).push( //Type casting as TypeScript does not understand this
    new FormGroup({
      'name':new FormControl(null, Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  );
}

onCancel(){
  this.router.navigate(['../'],{relativeTo: this.route})
}

get controls() { // a getter!
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
}

  private initForm(){
    let recipeName ='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients = new FormArray([]);  

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]) //regex to accept +ve numbers
            })
          )
        }
      }
    }
  this.recipeForm = new FormGroup({       //Validators.required ensure it isn't empty
    'name' : new FormControl(recipeName, Validators.required),
    'imagePath' : new FormControl(recipeImagePath, Validators.required),
    'description' : new FormControl(recipeDescription, Validators.required),
    'ingredients':recipeIngredients
  });
}

onDeleteIngredient(index:number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}
}
