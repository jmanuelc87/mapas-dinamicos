import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular";
import {
    DraggableDirective,
    FactoryDirective
} from "./directives/index";

import {
    AnioComponent,
    CatalogoComponent,
    CicloComponent,
    DashboardComponent,
    DistritoComponent,
    EsriMapComponent,
    EstadoComponent,
    FiltroEstadoComponent,
    HeaderComponent,
    ModalidadComponent,
    MunicipioComponent,
    WindowComponent
} from './components/index';

import { ProduccionCultivoComponent } from './windows/produccion-cultivo/produccion-cultivo.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EsriMapComponent,
        DashboardComponent,
        ModalidadComponent,
        CicloComponent,
        CatalogoComponent,
        AnioComponent,
        EstadoComponent,
        DistritoComponent,
        MunicipioComponent,
        FiltroEstadoComponent,
        WindowComponent,
        DraggableDirective,
        FactoryDirective,
        ProduccionCultivoComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        NgSelectModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        ProduccionCultivoComponent
    ],
})
export class AppModule { }
