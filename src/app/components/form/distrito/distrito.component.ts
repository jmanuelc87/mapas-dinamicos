import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DistritoService } from '../../../services/distrito.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Distrito } from '../../../models/distrito';

@Component({
    selector: 'app-distrito',
    templateUrl: './distrito.component.html',
    styleUrls: ['./distrito.component.css']
})
export class DistritoComponent implements OnInit {

    distritos: Distrito[] = [
        { cve_ddr: 0, nombre: 'Todos' }
    ];

    @Input()
    id;

    @Input()
    group: FormGroup;

    @Input()
    name: string;

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    default = this.distritos[0];

    @ViewChild(NgSelectComponent)
    ngSelect: NgSelectComponent;

    constructor(
        private distritoService: DistritoService
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
            this.ngSelect.placeholder = 'Seleccione un Distrito';
        }
    }

    getDistrito() {
        return this.default;
    }

    public fetch(estadoid) {
        this.distritoService.getDistritoByEstado(estadoid)
            .subscribe((distritos: Distrito[]) => {
                distritos.unshift({ cve_ddr: 0, nombre: 'Todos' });
                this.distritos = distritos;
            }, err => console.error(err), () => console.log('get all ddr completed.'));
    }

    public reset() {
        this.distritos = [
            { cve_ddr: 0, nombre: 'Todos' }
        ];
        let item = this.ngSelect.itemsList.findByLabel("Todos");
        this.ngSelect.select(item);
    }

}
