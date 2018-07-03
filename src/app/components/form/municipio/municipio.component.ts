import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Estado } from '../../../models/Estado';
import { MunicipioService } from '../../../services/municipio.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
    selector: 'app-municipio',
    templateUrl: './municipio.component.html',
    styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit {

    municipios: Estado[] = [
        { id: 0, name: "Todos" }
    ];

    @Input()
    id;

    @Input()
    group: FormGroup;

    @Input()
    name: string;

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(NgSelectComponent)
    ngSelect: NgSelectComponent;

    default = this.municipios[0];

    constructor(
        private municipioService: MunicipioService
    ) { }

    ngOnInit() {
    }

    onChange(event) {
        if (event != undefined && event.hasOwnProperty('id')) {
            this.ngSelect.placeholder = '';
            this.default = event;
            this.selected.emit(this.default);
        } else {
            // set placeholder
            this.ngSelect.placeholder = 'Seleccione un Municipio';
        }
    }

    public getMunicipio() {
        return this.default;
    }

    public fetch(estadoid: number, distritoid: number) {
        this.municipioService
            .getMunicipioByEstadoAndDistrito(estadoid, distritoid)
            .subscribe((municipios: Estado[]) => {
                municipios.unshift({ id: 0, name: "Todos" });
                this.municipios = municipios;
            }, err => console.error(err), () => console.log('get municipios completed.'));
    }

    public reset() {
        let item = this.ngSelect.itemsList.findByLabel('Todos');
        this.ngSelect.select(item);
    }

}
