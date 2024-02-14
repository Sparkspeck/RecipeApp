import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ANIMATION_MODULE_TYPE, Component, ElementRef, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('f') slForm: NgForm; //Selects form in html component so values of selected ingredients can be displayed on it
  subscription :Subscription;
  editMode=false;
  editedItemIndex : number;
  editedItem : Ingredient;

  constructor(private slService:ShoppingListService){}

  ngOnInit(){
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex=index; //Helps obtain info of selected item
        this.editMode=true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name, //sets name and amount input field to selected items name and amount
          amount : this.editedItem.amount
        })
      }
    ); //Allows shopping-edit to subscribe to the subject startedEditing which is in shopping-list
  }
  

  onAddItem(form:NgForm){
    const value=form.value; //set value of form to obtain its values
    const newIngredient=new Ingredient(value.name,value.amount); //create new ingredient object and obtain values from form
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
    this.slService.addIngredient(newIngredient); //service used to add ingredient
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe(); //cleans up subscription and prevents memory lea
  }
}
