import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[view]'
})
export class ViewDirective {

    constructor(
        public viewContainerRef: ViewContainerRef
    ) { }

}
