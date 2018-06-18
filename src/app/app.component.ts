import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { FactoryDirective } from './directives/factory.directive';
import { ProduccionCultivoComponent } from './windows/produccion-cultivo/produccion-cultivo.component';
import { ServiceService } from './services/service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild(FactoryDirective)
    appFactory: FactoryDirective;

    constructor(
        private constructor: ServiceService,
    ) { }

    onClick(selected: string) {
        console.log(selected.trim())
        if (selected.trim() == 'Producción por Cultivo') {
            let component = this.constructor.createComponent(ProduccionCultivoComponent, this.appFactory);
            (component.instance as ProduccionCultivoComponent).componentRef = component;
        }
    }




}
