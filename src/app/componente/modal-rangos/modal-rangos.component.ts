import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PicoEvent } from 'picoevent';

export interface ConfirmModel { }

@Component({
    selector: 'app-modal-rangos',
    templateUrl: './modal-rangos.component.html',
})
export class ModalRangosComponent extends DialogComponent<ConfirmModel, string> implements OnInit {

    private form: FormGroup;

    private data: Array<any>;

    private fields: Array<string>;

    private color: Array<number>;

    private ranges: Array<any> = new Array<any>();

    constructor(
        dialogService: DialogService,
        private fb: FormBuilder,
    ) {
        super(dialogService);
    }

    closed() {
        this.close();
    }

    submit() {
        if (!this.ranges.length) {
            this.result = null;
            return
        }
        this.result = JSON.stringify(this.ranges);
        this.close();
    }

    ngOnInit() {
        this.form = this.fb.group({
            variable: ['sembrada', Validators.required],
            rangos: ['0', Validators.required]
        });


        this.form.valueChanges.subscribe(value => {
            this.createRangos(value)
        });
    }

    createRangos(values) {
        this.ranges = new Array<any>();
        let rangos = this.getRangos(Number.parseInt(values['rangos']));
        let max = this.getMaxFromValues(this.data, values['variable']);
        let min = this.getMinFromValues(this.data, values['variable']);
        let rango = max - min;

        this.ranges.push(
            {
                id: 1,
                min: min,
                max: rango * rangos[0] + min,
                porcentaje: rangos[0],
                field: values['variable'],
            }
        )

        let acc = 0;
        for (let i = 0; i < rangos.length - 1; i++) {
            acc += rangos[i];
            this.ranges.push(
                {
                    id: i + 2,
                    min: rango * acc + min + 0.1,
                    max: rango * (acc + rangos[i + 1]) + min,
                    porcentaje: rangos[i + 1],
                    field: values['variable'],
                }
            );
        }

        let palette = this.getColorPalette(values, rangos);
        for (let i = this.ranges.length - 1, j = 0; i >= 0; i-- , j++) {
            this.ranges[i].color = palette[j];
        }
    }

    getColorPalette(values, rangos) {
        let r = this.color[0];
        let g = this.color[1];
        let b = this.color[2];

        let r1 = (255 - r) / Number.parseInt(values['rangos']);
        let g1 = (255 - g) / Number.parseInt(values['rangos']);
        let b1 = (255 - b) / Number.parseInt(values['rangos']);

        let colors = [];

        let newColor = [
            Math.round(r + 0 * r1),
            Math.round(g + 0 * g1),
            Math.round(b + 0 * b1),
        ];

        colors.push(newColor);

        for (let i = 0; i < rangos.length; i++) {
            colors.push([
                Math.round(r + (i + 1) * r1),
                Math.round(g + (i + 1) * g1),
                Math.round(b + (i + 1) * b1),
            ]);
        }

        return colors;
    }

    getMaxFromValues(data: Array<any>, variable) {
        let max = Number.MIN_VALUE;
        for (let item of data) {
            let value = Number.parseFloat(item[variable]);
            if (max < value) {
                max = value;
            }
        }
        return max;
    }


    getMinFromValues(data: Array<any>, variable) {
        let min = Number.MAX_VALUE;
        for (let item of data) {
            let value = Number.parseFloat(item[variable]);
            if (min > value) {
                min = value;
            }
        }
        return min;
    }

    getRangos(qty: number) {
        let array;
        switch (qty) {
            case 3:
                array = [0.2, 0.3, 0.5];
                break;
            case 4:
                array = [0.25, 0.25, 0.25, 0.25];
                break;
            case 5:
                array = [0.2, 0.2, 0.2, 0.2, 0.2];
                break;
            default:
                array = [0.2, 0.3, 0.5];
                break;
        }

        return array;
    }

}
