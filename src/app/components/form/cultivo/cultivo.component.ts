import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CultivoService } from '../../../services/cultivo.service';

@Component({
    selector: 'app-cultivo',
    templateUrl: './cultivo.component.html',
    styleUrls: ['./cultivo.component.css']
})
export class CultivoComponent implements OnInit {

    cultivos = [
        { id: 0, name: "Resumen Cultivos" }
    ];

    variedades = [
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

    defaultCultivo = this.cultivos[0];

    constructor(
        private cultivoService: CultivoService
    ) { }

    ngOnInit() {
        this.fetchCultivo('generico');
    }

    onChangeCultivo(event) {
        this.defaultCultivo = event;
        this.selectedCultivo.emit(event);
    }

    onChangeVariedades(event) {
        console.log(event);
    }

    getCultivo() {
        return this.defaultCultivo;
    }

    public fetchCultivo(catalogo) {
        this.cultivoService
            .getCultivos(catalogo)
            .subscribe((data: Array<any>) => {
                data.push({ id: 0, name: "Resumen Cultivos" });
                this.cultivos = data;
            }, err => console.error(err), () => console.log('get all cultivos completed'));
    }
}
