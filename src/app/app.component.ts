import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WindowComponent } from './components/window/window.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('windowContainer')
    entryPoint: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    /*
    private group: FormGroup = this.fb.group({
        catalogo: ['', Validators.required]
    });

    constructor(
        private fb: FormBuilder
    ) { }

    private selected(event) {
        console.log(event);
    }*/

    onClick(selected) {
        if (selected === 'Producción por Cultivo') {
            console.log(selected);
            let component = this.createComponent(WindowComponent);
            (component.instance as WindowComponent).closeEvent.subscribe(() => {
                component.destroy();
            });
        }
    }


    createComponent(component) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        let dynamicComponentRef = this.entryPoint.createComponent(componentFactory);
        this.entryPoint.insert(dynamicComponentRef.hostView);
        return dynamicComponentRef;
    }

}
