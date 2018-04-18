import { AngularDraggableModule } from 'angular2-draggable';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { Component, NgModule } from '@angular/core';
import { ConsultaCultivoComponent } from './componente/consulta-cultivo/consulta-cultivo.component';
import { ConsultaEstadoComponent } from './componente/consulta-estado/consulta-estado.component';
import { EmptyComponentComponent } from './componente/empty-component/empty-component.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderMenuComponent } from './componente/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { IteratorKeysPipe } from './iterator-keys.pipe';
import { OverlayComponent } from './componente/overlay/overlay.component';
import { PicoEventModule } from 'picoevent';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './componente/table/table.component';
import { WebMapComponent } from './componente/web-map/web-map.component';
import { ModalComponent } from './componente/modal/modal.component';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';


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
        WebMapComponent,
        OverlayComponent,
        TableComponent,
        IteratorKeysPipe,
        ModalComponent,
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        BrowserAnimationsModule,
        AngularDraggableModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        ReactiveFormsModule,
        PicoEventModule,
        BootstrapModalModule.forRoot({ container: document.body })
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        ModalComponent
    ]
})
export class AppModule { }
