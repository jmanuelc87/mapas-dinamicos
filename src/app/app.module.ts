import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular";
import {
    DraggableDirective,
    FactoryDirective
} from "./directives";

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
} from './components';

import { ProduccionCultivoComponent } from './windows/produccion-cultivo/produccion-cultivo.component';
import { EsriExtentService } from './services/esri-extent.service';
import { EsriWidgetDirective } from './directives/esri-widget.directive';
import { EsriLayerToggleComponent } from './components/esri-layer-toggle/esri-layer-toggle.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { LegendComponent } from './components/legend/legend.component';
import { InfoComponent } from './components/info/info.component';
import { PopupComponent } from './components/popup/popup.component';
import { ProduccionEstadoComponent } from './windows/produccion-estado/produccion-estado.component';
import { CultivoComponent } from './components/form/cultivo/cultivo.component';
import { RangosComponent } from './windows/rangos/rangos.component';
import { GridComponent } from './components/form/grid/grid.component';
import { CleanToolComponent } from './components/clean-tool/clean-tool.component';
import { HomeToolComponent } from './components/home-tool/home-tool.component';
import { ZoomPlusComponentComponent } from './components/zoom-plus-component/zoom-plus-component.component';
import { ZoomMinusComponent } from './components/zoom-minus/zoom-minus.component';

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
        EsriWidgetDirective,
        EsriLayerToggleComponent,
        ColorPickerComponent,
        LegendComponent,
        InfoComponent,
        PopupComponent,
        ProduccionEstadoComponent,
        CultivoComponent,
        RangosComponent,
        GridComponent,
        CleanToolComponent,
        HomeToolComponent,
        ZoomPlusComponentComponent,
        ZoomMinusComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
    ],
    providers: [
        EsriExtentService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ProduccionCultivoComponent,
        ProduccionEstadoComponent,
        RangosComponent,
    ],
})
export class AppModule { }
