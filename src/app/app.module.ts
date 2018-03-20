import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { ClarityModule } from "@clr/angular";
import { AgriculturaComponent } from './agricultura/agricultura.component';
import { DialogDirective } from './dialog.directive';
import { MenuDirective } from './menu.directive';
import { DialogComponent } from './dialog/dialog.component';



const AppRoutes: Routes = [
    { path: 'agricultura', component: AgriculturaComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];



@NgModule({
    declarations: [
        AppComponent,
        MainMenuComponent,
        AgriculturaComponent,
        DialogDirective,
        MenuDirective,
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
