import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]=[];
  private igChangeSub : Subscription

  constructor(private slService : ShoppingListService){

  }

  ngOnInit():void{
    this.ingredients=this.slService.getIngredients();
    this.igChangeSub= this.slService.ingredientsChanged.subscribe( //NOTE:Not necessary to store Subscription of Subejct in igChangeSub
      (ingredients:Ingredient[]) => {                 //Refresh service everytime something new is added for slice to work
          this.ingredients=ingredients;
      }
    );
  }

  onEditItem(index : number){
    this.slService.startedEditing.next(index);   
  }

  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe(); //clean up (optimizaton) code when deselcting, not necesary
  }



}
