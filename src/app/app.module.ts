import { AngularDraggableModule } from 'angular2-draggable';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { ProduccionCultivoComponent } from './produccion-cultivo/produccion-cultivo.component';
import { ProduccionCultivoLateralDirective } from './directives/lateral.directive';
import { ProduccionEstadoComponent } from './produccion-estado/produccion-estado.component';
import { CapasGeograficasComponent } from './capas-geograficas/capas-geograficas.component';
import { WebmapComponent } from './webmap/webmap.component';



@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        ProduccionCultivoComponent,
        ProduccionCultivoLateralDirective,
        ProduccionEstadoComponent,
        CapasGeograficasComponent,
        WebmapComponent,
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        BrowserAnimationsModule,
        AngularDraggableModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ],
    entryComponents : [
    ]
})
export class AppModule { }
