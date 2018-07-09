import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './shared/components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { reducers } from './shared';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { YearEffects } from './shared/effects/year.effects';
import { StateEffects } from './shared/effects/state.effect';
import { DDREffects } from './shared/effects/ddr.effect';



@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ComponentsModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([YearEffects, StateEffects, DDREffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
            logOnly: environment.production,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
