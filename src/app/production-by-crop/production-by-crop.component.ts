import { Component, OnInit, ComponentRef } from '@angular/core';
import { ProductionFactory } from '../util/production-factory';

@Component({
    selector: 'window-production-by-crop',
    templateUrl: './production-by-crop.component.html',
    styleUrls: ['./production-by-crop.component.scss'],
    providers: [
        ProductionFactory,
    ]
})
export class ProductionByCropComponent implements OnInit {

    public _ref: ComponentRef<ProductionByCropComponent>;

    constructor() { }

    ngOnInit() {
    }

    onHandleCloseWindow() {
        this._ref.destroy();
    }

}
