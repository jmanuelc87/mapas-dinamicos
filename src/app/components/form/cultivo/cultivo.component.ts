import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CultivoService } from '../../../services/cultivo.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
    selector: 'app-cultivo',
    templateUrl: './cultivo.component.html',
    styleUrls: ['./cultivo.component.css']
})
export class CultivoComponent implements OnInit {

    private cultivos = [
        { id: 0, name: "Resumen Cultivos" }
    ];

    private variedades = [
        { id: 0, name: "Resumen Variedades" }
    ];

    @Input()
    nameFormCultivo: string;

    @Input()
    nameFormVariedad: string;

    @Input()
    group: FormGroup;

    @Output()
    selectedCultivo: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('variedad')
    private ngSelect: NgSelectComponent

    private _catalogo: string;

    defaultCultivo = this.cultivos[0];

    defaultVariedad = this.variedades[0];

    constructor(
        private cultivoService: CultivoService,
    ) { }

    ngOnInit() {
        this.fetchCultivo('generico');
    }

    onChangeCultivo(event) {
        this.defaultCultivo = event;
        if (this._catalogo == 'detalle' && event.id) {
            this.fetchVariedad(event.id);
        }
        this.selectedCultivo.emit(event);
    }

    onChangeVariedades(event) {
        this.defaultVariedad = event;
    }

    getCultivo() {
        return this.defaultCultivo;
    }

    getVariedad() {
        return this.defaultVariedad;
    }

    @Input()
    set catalogo(catalogo: string) {
        this._catalogo = catalogo;
        this.fetchCultivo(catalogo);
        if (catalogo == 'detalle') {
            // enable variedades
            this.ngSelect.setDisabledState(false);
        } else {
            // disable variedades
            this.ngSelect.setDisabledState(true);
        }
    }

    public fetchCultivo(catalogo) {
        this.cultivoService
            .getCultivos(catalogo)
            .subscribe((data: Array<any>) => {
                data.push({ id: 0, name: "Resumen Cultivos" });
                this.cultivos = data;
            }, err => console.error(err), () => console.log('get all cultivos completed'));
    }

    public fetchVariedad(id) {
        this.cultivoService.getVariedadesByCultivo(id)
            .subscribe((data: Array<any>) => {
                data.push({ id: 0, name: "Resumen Variedades" });
                this.variedades = data;
            }, err => console.error(err), () => console.log('get all variedades completed'));
    }
}
