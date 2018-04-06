import { AngularDraggableModule } from 'angular2-draggable';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Imports from custom components
 */
import { HeaderMenuComponent } from './componente/menu/menu.component';
import { ConsultaCultivoComponent } from './componente/consulta-cultivo/consulta-cultivo.component';
import { ConsultaEstadoComponent } from './componente/consulta-estado/consulta-estado.component';
import { EmptyComponentComponent } from './componente/empty-component/empty-component.component';
import { WebMapComponent } from './componente/web-map/web-map.component';


const appRoutes = [
    { path: 'consulta-cultivo', component: ConsultaCultivoComponent },
    { path: 'consulta-estado', component: ConsultaEstadoComponent },
    { path: '', component: EmptyComponentComponent },
    { path: '**', component: EmptyComponentComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderMenuComponent,
        ConsultaCultivoComponent,
        ConsultaEstadoComponent,
        EmptyComponentComponent,
        WebMapComponent
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        BrowserAnimationsModule,
        AngularDraggableModule,
        RouterModule.forRoot(appRoutes, { enableTracing: true })
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        ConsultaCultivoComponent
    ]
})
export class AppModule { }
