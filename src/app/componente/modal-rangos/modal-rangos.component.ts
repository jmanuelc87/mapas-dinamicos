import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { PicoEvent } from 'picoevent';

export interface ConfirmModel { }

@Component({
    selector: 'app-modal-rangos',
    templateUrl: './modal-rangos.component.html',
    styles: [
        `
        .color-1 {
            background-color: softlight(#ff6600, #000000);
        }
        `
    ]
})
export class ModalRangosComponent extends DialogComponent<ConfirmModel, string> implements OnInit {

    private form: FormGroup;

    private data: Array<any>;

    private fields: Array<string>;

    private values: Array<any> = new Array<any>();

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
        this.result = JSON.stringify(this.values);
        this.close();
    }

    ngOnInit() {
        this.form = this.fb.group({
            variable: ['sembrada', Validators.required],
            rangos: ['0', Validators.required]
        });


        this.form.valueChanges.subscribe(value => this.createRangos(value));
    }

    createRangos(values) {
        let rangos = this.getRangos(Number.parseInt(values['rangos']));
        let max = this.getMaxFromValues(this.data, values['variable']);
        let min = this.getMinFromValues(this.data, values['variable']);
        let rango = max - min;

        this.values = new Array<any>();
        this.values.push(
            {
                id: 1,
                min: min,
                max: rango * rangos[0] + min,
                porcentaje: rangos[0]
            }
        )

        for (let i = 0; i < rangos.length - 1; i++) {
            this.values.push(
                {
                    id: i + 2,
                    min: rango * rangos[i] + min + 0.1,
                    max: rango * rangos[i + 1] + min,
                    porcentaje: rangos[i + 1]
                }
            );
        }
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
                array = [0.2, 0.5, 1.0];
                break;
            case 4:
                array = [0.25, 0.5, 0.75, 1.0];
                break;
            case 5:
                array = [0.2, 0.4, 0.6, 0.8, 1.0];
                break;
            default:
                array = [0.2, 0.5, 1.0];
                break;
        }

        return array;
    }

}
