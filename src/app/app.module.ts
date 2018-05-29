import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EsriMapComponent } from './components/esri-map/esri-map.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalidadComponent } from './components/modalidad/modalidad.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CicloComponent } from './components/ciclo/ciclo.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EsriMapComponent,
        DashboardComponent,
        ModalidadComponent,
        CicloComponent
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
