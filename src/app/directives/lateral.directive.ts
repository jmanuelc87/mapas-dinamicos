import { Directive, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Component } from '@angular/compiler/src/core';
import { ProduccionCultivoComponent } from '../produccion-cultivo/produccion-cultivo.component';

@Directive({
  selector: '[appOpenLateral]'
})
export class LateralDirective {

  private componentRef: ComponentRef<ProduccionCultivoComponent>;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }


  public openLateral() {
    this.viewContainer.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProduccionCultivoComponent);
    this.componentRef = this.viewContainer.createComponent(componentFactory);
    console.log(this.viewContainer);
    this.viewContainer.insert(this.componentRef.hostView, 0);
  }

  public closeLateral() {
    this.viewContainer.clear();
  }
}
