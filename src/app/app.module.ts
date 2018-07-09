import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ComponentsModule } from './shared/components/components.module';
import { reducers } from './shared/store';
import { YearEffects } from './shared/store/effects/year.effects';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ComponentsModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([YearEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
            logOnly: environment.production,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
