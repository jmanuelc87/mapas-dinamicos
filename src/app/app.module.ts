import { AnioComponent } from './components/form/anio/anio.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CatalogoComponent } from './components/form/catalogo/catalogo.component';
import { CicloComponent } from './components/form/ciclo/ciclo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EsriMapComponent } from './components/esri-map/esri-map.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalidadComponent } from './components/form/modalidad/modalidad.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadoComponent } from './components/form/estado/estado.component';
import { DistritoComponent } from './components/form/distrito/distrito.component';
import { MunicipioComponent } from './components/form/municipio/municipio.component';
import { FiltroEstadoComponent } from './components/form/filtro-estado/filtro-estado.component';
import { WindowComponent } from './components/window/window.component';
import { DraggableDirective } from './directives/draggable.directive';


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
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        NgSelectModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        WindowComponent
    ],
})
export class AppModule { }
