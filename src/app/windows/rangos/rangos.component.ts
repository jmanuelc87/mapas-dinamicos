import { Component, OnInit, ComponentRef, Renderer2, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { WindowComponent } from '../../components';

@Component({
    selector: 'app-rangos',
    templateUrl: './rangos.component.html',
    styleUrls: ['./rangos.component.css']
})
export class RangosComponent implements OnInit {

    componentRef: ComponentRef<any>;

    @ViewChild(WindowComponent)
    window: WindowComponent;

    @ViewChild('variables')
    selectVariablesComponent: ElementRef;

    countRows = [];

    selectedVariable;

    columnValues;

    constructor(
        private renderer: Renderer2,
    ) { }

    ngOnInit(): void {
        this.selectedVariable = this.selectVariablesComponent.nativeElement.value;
    }

    @Input()
    set location(position) {
        let thisWindowPosition = this.window.position;
        let parentWindowPosition = position;

        /* Centra la ventana rangos dentro de la ventana producción por estado */
        let top = (parentWindowPosition.top + parentWindowPosition.height / 2) - (thisWindowPosition.height / 2);
        let left = (parentWindowPosition.left + parentWindowPosition.width / 2) - (thisWindowPosition.width / 2);

        /* actualiza la posición de la ventana modal */
        this.window.position = { top: top, left: left };
    }

    onSelectElement($event) {
        this.selectedVariable = $event.target.value;
    }

    /**
     * Calcula los rangos en función de la variable elegida
     */
    onSelecteRange($event) {
        let n = $event.target.value;
        let item = this.columnValues[0];
        console.log(this.selectedVariable);
        // obtener el valor maximo de la variable elegida
        let max = this.getMaximumFromValues(this.selectedVariable);
        let min = this.getMinimiumFromValues(this.selectedVariable);
        let bins = this.getBins(+n);
        let acc = 0;
        let rango = max - min;

        console.log(bins);

        this.countRows = [];

        this.countRows.push({
            idx: 1,
            min: min,
            max: rango * bins[0] + min,
            per: bins[0],
            sel: this.selectedVariable,
        });

        for (let i = 0; i < n - 1; i++) {
            acc += bins[i];
            /* calcular los rangos de las variables */
            this.countRows.push({
                idx: i + 2,
                min: rango * acc + min + 0.1,
                max: rango * (acc + bins[i + 1]) + min,
                per: bins[i + 1],
                sel: this.selectedVariable,
            });
        }
    }

    getMaximumFromValues(selectedVariable) {
        let max = Number.MIN_VALUE;
        for (let item of this.columnValues) {
            let value = Number.parseFloat(item[selectedVariable]);

            if (max < value) {
                max = value;
            }
        }
        return max;
    }

    getMinimiumFromValues(selectedVariable) {
        let min = Number.MAX_VALUE;
        for (let item of this.columnValues) {
            let value = Number.parseFloat(item[selectedVariable]);

            if (min > value) {
                min = value;
            }
        }

        return min;
    }

    getBins(qty: number) {
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

    onHandleClick($event) {

    }

}
