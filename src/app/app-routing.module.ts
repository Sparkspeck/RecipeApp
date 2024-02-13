import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes/recipes-detail/recipes-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes : Routes=[
    {path:'',redirectTo:'/recipes', pathMatch:'full'},  //This path indicates the default path when the page is hosted, pathMatch full is needed to prevent errors when '' is given
    {path:'recipes',component:RecipesComponent,children:[//Path which leads to recipes
        {path:'', component:RecipeStartComponent}, //Don't set a path name here as we want it displayed by default
        {path:'new',component:RecipeEditComponent}, //Create new reciperouter (Comes above ID as new will be considered as an ID if this statement is placed below it)
        {path:':id',component:RecipesDetailComponent}, //Uses id (basically array index) of recipe in recipe list, to obtain this ':' indicates dynamic ID
        {path:':id/edit',component:RecipeEditComponent}//Edit existing recipe router
    ]},        
    {path:'shopping-list', component:ShoppingListComponent}, //Path which leads to Shopping List
    
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],  //instantiate the paths
    exports: [RouterModule] //allows us to use <router-outlet>
})

export class AppRoutingModule{  //exported in app.module imports

}