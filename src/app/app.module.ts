import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";


import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { ClarityModule } from "@clr/angular";
import { AgriculturaComponent } from './agricultura/agricultura.component';
import { DialogDirective } from './dialog.directive';
import { MenuDirective } from './menu.directive';



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
        MenuDirective
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        BrowserAnimationsModule,
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
