import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Estado } from '../../../models/Estado';
import { MunicipioService } from '../../../services/municipio.service';

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

    constructor(
        private municipioService: MunicipioService
    ) { }

    ngOnInit() {
    }

    onChange(event) {
        this.selected.emit(event);
    }

    public fetch(estadoid: number, distritoid: number) {
        this.municipioService
            .getMunicipioByEstadoAndDistrito(estadoid, distritoid)
            .subscribe((municipios: Estado[]) => {
                municipios.push({ id: 0, name: "Todos" });
                this.municipios = municipios;
            }, err => console.error(err), () => console.log('get municipios completed.'));
    }

}
