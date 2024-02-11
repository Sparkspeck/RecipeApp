import { Component, ElementRef, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput',{static:false}) nameInputRef : ElementRef //ViewChild allows access to child component (eg, for nameInput which is text input, it's child component is the name of the ingredient)
  @ViewChild('amountInput',{static:false}) amountInputRef : ElementRef

  constructor(private slService:ShoppingListService){}
  

  onAddItem(){
    const ingName=this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;  //setters
    const newIngredient=new Ingredient(ingName,ingAmount);
    this.slService.addIngredient(newIngredient); //service used to add ingredient
  }
}
