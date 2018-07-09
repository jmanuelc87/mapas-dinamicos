import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComponentsModule } from './shared/components/components.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ComponentsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
