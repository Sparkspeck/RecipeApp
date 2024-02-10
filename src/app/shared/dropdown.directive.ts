import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})

export class DropdownDirective{
    @HostBinding('class.open') isOpen=false;  //class.open is for CSS open command to open up dropdown

    @HostListener('click') toggleOpen(){      //Listening for click
        this.isOpen = !this.isOpen;
    }
}
