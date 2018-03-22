import { AngularDraggableModule } from 'angular2-draggable';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { DialogComponent } from './dialog/dialog.component';
import { DialogDirective } from './directives/dialog.directive';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NgModule } from '@angular/core';






@NgModule({
    declarations: [
        AppComponent,
        MainMenuComponent,
        DialogDirective,
        DialogComponent
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
        MainMenuComponent
    ]
})
export class AppModule { }
