import { Directive, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

@Directive({
  selector: '[appDialog]'
})
export class DialogDirective {

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }


  public createDialog(dialogComponent: { new(): DialogComponent }): ComponentRef<DialogComponent> {
    this.viewContainer.clear();

    const dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
    const dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
    this.viewContainer.insert(dialogComponentRef.hostView);

    return dialogComponentRef;
  }

}
