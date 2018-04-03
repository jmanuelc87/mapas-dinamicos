import { Directive, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Component } from '@angular/compiler/src/core';
import { ProduccionCultivoComponent } from '../produccion-cultivo/produccion-cultivo.component';
import { ProduccionEstadoComponent } from '../produccion-estado/produccion-estado.component';
import { CapasGeograficasComponent } from '../capas-geograficas/capas-geograficas.component';

@Directive({
  selector: '[appOpenLateral]'
})
export class ProduccionCultivoLateralDirective {

  private componentProduccionCultivoRef: ComponentRef<ProduccionCultivoComponent>;

  private componentProduccionEstadoRef: ComponentRef<ProduccionEstadoComponent>;

  private componentCapasGeograficasRef: ComponentRef<CapasGeograficasComponent>;

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

  public openLateralCapasGeograficas() {
    this.viewContainer.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CapasGeograficasComponent);
    this.componentCapasGeograficasRef = this.viewContainer.createComponent(componentFactory);
    this.viewContainer.insert(this.componentCapasGeograficasRef.hostView, 0);
  }

  public closeLateral() {
    this.viewContainer.clear();
  }
}
