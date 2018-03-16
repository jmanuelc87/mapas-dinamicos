import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";


import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { ClarityModule } from "@clr/angular";


const appRoutes: Routes = [
    {
        path: 'agricultura',
        component: null,
    }
];


@NgModule({
    declarations: [
        AppComponent,
        MainMenuComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, { enableTracing: true }),
        ClarityModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
