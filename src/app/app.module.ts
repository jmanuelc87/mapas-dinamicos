import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CicloComponent } from './components/form/ciclo/ciclo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EsriMapComponent } from './components/esri-map/esri-map.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalidadComponent } from './components/form/modalidad/modalidad.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoComponent } from './components/form/catalogo/catalogo.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EsriMapComponent,
        DashboardComponent,
        ModalidadComponent,
        CicloComponent,
        CatalogoComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
