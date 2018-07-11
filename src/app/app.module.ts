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
import { MunEffects } from './shared/effects/mun.effect';
import { WindowComponent } from './window/window.component';
import { DraggableDirective } from './directives/draggable.directive';
import { ProductionByCropComponent } from './production-by-crop/production-by-crop.component';
import { ProductionFactory } from './util/production-factory';
import { ViewDirective } from './util/view.directive';



@NgModule({
    declarations: [
        AppComponent,
        WindowComponent,
        DraggableDirective,
        ViewDirective,
        ProductionByCropComponent,
    ],
    imports: [
        BrowserModule,
        ComponentsModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([YearEffects, StateEffects, DDREffects, MunEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
            logOnly: environment.production,
        }),
    ],
    providers: [ProductionFactory],
    entryComponents: [ProductionByCropComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
