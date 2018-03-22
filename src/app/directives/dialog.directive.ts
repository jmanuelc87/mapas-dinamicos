import { Directive, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';

@Directive({
  selector: '[appDialog]'
})
export class DialogDirective {

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }


  public createDialog(): ComponentRef<DialogComponent> {
    this.viewContainer.clear();

    const dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
    dialogComponentRef.instance.ComponentRef = dialogComponentRef;
    this.viewContainer.insert(dialogComponentRef.hostView);

    return dialogComponentRef;
  }

}
