import { Directive, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Component } from '@angular/compiler/src/core';
import { ProduccionCultivoComponent } from '../produccion-cultivo/produccion-cultivo.component';
import { ProduccionEstadoComponent } from '../produccion-estado/produccion-estado.component';

@Directive({
  selector: '[appOpenLateral]'
})
export class ProduccionCultivoLateralDirective {

  private componentProduccionCultivoRef: ComponentRef<ProduccionCultivoComponent>;

  private componentProduccionEstadoRef: ComponentRef<ProduccionEstadoComponent>;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }


  public openLateralProduccionCultivoComponent() {
    this.viewContainer.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProduccionCultivoComponent);
    this.componentProduccionCultivoRef = this.viewContainer.createComponent(componentFactory);
    this.viewContainer.insert(this.componentProduccionCultivoRef.hostView, 0);
  }

  public openLateralProduccionEstadoComponent() {
    this.viewContainer.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProduccionEstadoComponent);
    this.componentProduccionEstadoRef = this.viewContainer.createComponent(componentFactory);
    this.viewContainer.insert(this.componentProduccionEstadoRef.hostView, 0);
  }

  public closeLateral() {
    this.viewContainer.clear();
  }
}
