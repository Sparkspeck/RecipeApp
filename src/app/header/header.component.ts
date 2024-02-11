import { Component, EventEmitter, Output } from '@angular/core' //EventEmitter helps create events to show either shopping or recipe

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent{
    @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature : string){
        this.featureSelected.emit(feature);   //Outputs selected feature on the screen and provides value to $event in app-component
    }
}