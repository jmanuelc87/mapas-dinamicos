/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from "@ng-select/ng-select";

/* Components */
import { YearComponent } from './year/year.component';

let components = [
    YearComponent
];

@NgModule({
    imports: [
        CommonModule,
        NgSelectModule
    ],
    exports: components,
    declarations: components,
})
export class ComponentsModule { }
