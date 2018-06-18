import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { FactoryDirective } from '../directives';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    createComponent(component, appFactory: FactoryDirective) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        let viewContainerRef = appFactory.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);

        return componentRef;
    }

}
