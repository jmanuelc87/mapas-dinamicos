import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from "@angular/core";
import { ProductionByCropComponent } from "../production-by-crop/production-by-crop.component";
import { ViewDirective } from "./view.directive";


@Injectable()
export class ProductionFactory {

    constructor(
        private _cfr: ComponentFactoryResolver
    ) { }

    addComponent(container: ViewContainerRef, componentType) {
        container.clear();
        let factory = this._cfr.resolveComponentFactory<ProductionByCropComponent>(componentType);
        let component = container.createComponent(factory);
        container.insert(component.hostView);
        component.instance._ref = component;
        return component;
    }

}
