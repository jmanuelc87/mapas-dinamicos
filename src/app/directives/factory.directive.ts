import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appFactory]'
})
export class FactoryDirective {

    constructor(
        public viewContainerRef: ViewContainerRef
    ) { }


}
