import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearComponent } from "./year/year.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { StatesComponent } from './states/states.component';
import { DdrComponent } from './ddr/ddr.component';
import { MunicipioComponent } from './municipio/municipio.component';

let components = [
    YearComponent,
    StatesComponent,
    DdrComponent,
    MunicipioComponent,
];

@NgModule({
    imports: [
        CommonModule,
        NgSelectModule
    ],
    declarations: components,
    exports: components,
})
export class ComponentsModule { }
