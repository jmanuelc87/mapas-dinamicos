import { Directive, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MainMenuComponent } from './main-menu/main-menu.component';

@Directive({
    selector: '[appMenu]'
})
export class MenuDirective {

    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    public createMenu(menuComponent: { new(): MainMenuComponent}): ComponentRef<MainMenuComponent> {
        this.viewContainer.clear();
        const menuComponentFactory = this.componentFactoryResolver.resolveComponentFactory(menuComponent);
        const menuComponentRef = this.viewContainer.createComponent(menuComponentFactory);
        this.viewContainer.insert(menuComponentRef.hostView);

        return menuComponentRef;
    }

    public removeMenu() {
        this.viewContainer.clear();
    }
}
