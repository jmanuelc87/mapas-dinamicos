import { AngularDraggableModule } from 'angular2-draggable';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { ProduccionCultivoComponent } from './produccion-cultivo/produccion-cultivo.component';



@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        ProduccionCultivoComponent,
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
