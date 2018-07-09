import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComponentsModule } from './shared/components/components.module';
import { StoreModule } from '../../node_modules/@ngrx/store';
import { reducers } from './shared/store';
import { EffectsModule } from '../../node_modules/@ngrx/effects';
import { YearEffects } from './shared/store/effects/year.effects';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ComponentsModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([YearEffects]),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
