import { Component, OnInit, ComponentRef, Renderer2, AfterViewInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { WindowComponent } from '../../components';
import { ColorPickerComponent } from '../../components/color-picker/color-picker.component';
import { GeometryService } from '../../services/geometry.service';
import { EsriMapService } from '../../services/esri-map.service';
import { PopupService } from '../../services/popup.service';

@Component({
    selector: 'app-rangos',
    templateUrl: './rangos.component.html',
    styleUrls: ['./rangos.component.css']
})
export class RangosComponent implements OnInit {

    componentRef: ComponentRef<any>;

    @ViewChild(WindowComponent)
    window: WindowComponent;

    @ViewChild(ColorPickerComponent)
    colorPicker: ColorPickerComponent;

    @ViewChild('variables')
    selectVariablesComponent: ElementRef;

    countRows = [];

    selectedVariable;

    columnValues;

    bins = [];

    n;

    filtro

    @Output()
    close: EventEmitter<void> = new EventEmitter();

    constructor(
        private renderer: Renderer2,
        private geometryService: GeometryService,
        private mapService: EsriMapService,
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
        if (this.n) {
            this.createBins(+this.n, this.selectedVariable);
        }
    }

    /**
     * Calcula los rangos en función de la variable elegida
     */
    onSelecteRange($event) {
        this.n = $event.target.value;
        if (this.selectedVariable) {
            this.createBins(+this.n, this.selectedVariable);
        }
    }

    createBins(n, selectedVariable) {
        // obtener el valor maximo de la variable elegida
        let max = this.getMaximumFromValues(selectedVariable);
        let min = this.getMinimiumFromValues(selectedVariable);
        this.bins = this.getBins(n);
        let acc = 0;
        let rango = max - min;

        this.countRows = [];

        this.countRows.push({
            idx: 1,
            min: min,
            max: rango * this.bins[0] + min,
            per: this.bins[0],
            sel: this.selectedVariable,
        });

        for (let i = 0; i < n - 1; i++) {
            acc += this.bins[i];
            /* calcular los rangos de las variables */
            this.countRows.push({
                idx: i + 2,
                min: rango * acc + min + 0.1,
                max: rango * (acc + this.bins[i + 1]) + min,
                per: this.bins[i + 1],
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
        if (this.countRows.length != 0 && this.bins.length != 0) {
            let color = this.colorPicker.getSelectedColor();
            let palette = this.getColorPalette(this.bins, color);
            let classBreaks = this.createClassBreaks(this.columnValues, this.countRows, palette);


            this.mapService.cleanMap();
            this.geometryService.getGeometryWithColumnsAsync(this.columnValues, this.filtro).map((promise) => {
                // features from the promise
                promise.then((response) => {
                    let classes = this.filterClassBreaks(response.features, this.columnValues, classBreaks, this.filtro);
                    this.mapService.showRangesOnMap(response.features, classes);
                });

                /* Cerrar el componente rangos y minimizar el componente padre */
                this.close.emit();
                this.window.handleClickClose(null);
            });

        } else {
            /* show error */
            alert('Por favor selecciona los rangos o actualiza')
        }

    }

    filterClassBreaks(features, columnValues, classBreaks, filtro) {
        let fields = [];
        let query = [];

        if (filtro == 'estado') {
            query = ['CVE_ENT'];
            fields = ['idestado'];
        }

        if (filtro == 'distrito') {
            query = ['CVE_DDR'];
            fields = ['iddistrito'];
        }

        if (filtro == 'municipio') {
            query = ['CVE_ENT', 'CVE_MUN'];
            fields = ['idestado', 'idmunicipio'];
        }

        if (filtro == 'ddr-mun') {
            query = ['CVE_ENT', 'CVE_MUN'];
            fields = ['idestado', 'idmunicipio'];
        }

        return this.getClassBreaks(features, fields, query, columnValues, classBreaks);
    }

    getClassBreaks(features, fields, attributes, columnValues, classBreaks) {
        let classes = [];
        for (let item of features) {

            if (fields.length == attributes.length) {
                let ids = []
                for (let i = 0; i < fields.length; i++) {
                    let field = fields[i];
                    let attribute = attributes[i];
                    ids.push({
                        field: field,
                        value: parseInt(item.attributes[attribute])
                    });
                }

                if (columnValues.length == classBreaks.length) {
                    for (let i = 0; i < columnValues.length; i++) {
                        let item = columnValues[i];
                        let count = 0;
                        for (let id of ids) {
                            if (item[id.field] == id.value) {
                                count++;
                            }
                        }

                        if (ids.length == count) {
                            classes.push(classBreaks[i])
                        }
                    }
                }
            }
        }

        return classes;
    }

    createClassBreaks(data, countRows, palette) {
        let classBreaks = [];
        for (let item of data) {
            for (let b of countRows) {
                if (item[b.sel] >= b.min && item[b.sel] <= b.max) {

                    classBreaks.push(
                        palette[palette.length - b.idx]
                    );
                }
            }
        }

        return classBreaks;
    }

    getColorPalette(bins, color) {
        let r = color[0];
        let g = color[1];
        let b = color[2];

        let r1 = (255 - r) / Number.parseInt(bins.length);
        let g1 = (255 - g) / Number.parseInt(bins.length);
        let b1 = (255 - b) / Number.parseInt(bins.length);

        let colors = [];

        let newColor = [
            Math.round(r + 0 * r1),
            Math.round(g + 0 * g1),
            Math.round(b + 0 * b1),
        ];

        colors.push(newColor);

        for (let i = 0; i < bins.length - 1; i++) {
            colors.push([
                Math.round(r + (i + 1) * r1),
                Math.round(g + (i + 1) * g1),
                Math.round(b + (i + 1) * b1),
            ]);
        }

        return colors;
    }

}
