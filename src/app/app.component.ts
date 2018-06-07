import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { FactoryDirective } from './directives/factory.directive';
import { ProduccionCultivoComponent } from './windows/produccion-cultivo/produccion-cultivo.component';
import { WindowComponent } from './components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild(FactoryDirective)
    appFactory: FactoryDirective;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    onClick(selected: string) {
        console.log(selected.trim())
        if (selected.trim() == 'Producción por Cultivo') {
            console.log('creando ventana');
            let component = this.createComponent(ProduccionCultivoComponent);
            (component.instance as ProduccionCultivoComponent).componentRef = component;
        }
    }


    createComponent(component) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        let viewContainerRef = this.appFactory.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);

        /*
        (<WindowComponent>componentRef.instance).component = componentRef;
        viewContainerRef.insert(componentRef.hostView);
        */

        return componentRef;
    }

}
