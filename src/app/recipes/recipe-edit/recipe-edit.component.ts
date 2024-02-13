import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent {
  id: number;
  editMode=false;

  constructor(private route:ActivatedRoute){}

ngOnInit(){
  this.route.params.subscribe((params:Params)=>{   //Check if parameters have changed in correct route
    this.id = +params['id'];
    this.editMode=params['id']!=null; //if edit recipe of selected recipe is clicked, this returns true
  })
}

}
