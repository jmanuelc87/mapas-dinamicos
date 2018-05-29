import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EsriMapComponent } from './components/esri-map/esri-map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalidadComponent } from './components/modalidad/modalidad.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EsriMapComponent,
        DashboardComponent,
        ModalidadComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
