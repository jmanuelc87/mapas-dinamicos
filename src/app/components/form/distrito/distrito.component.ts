import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Estado } from '../../../models/Estado';
import { FormGroup } from '@angular/forms';
import { DistritoService } from '../../../services/distrito.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
    selector: 'app-distrito',
    templateUrl: './distrito.component.html',
    styleUrls: ['./distrito.component.css']
})
export class DistritoComponent implements OnInit {

    distritos: Estado[] = [
        { id: 0, name: 'Todos' }
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
            .subscribe((distritos: Estado[]) => {
                distritos.unshift({ id: 0, name: 'Todos' });
                this.distritos = distritos;
            }, err => console.error(err), () => console.log('get all ddr completed.'));
    }

    public reset() {
        let item = this.ngSelect.itemsList.findByLabel('Todos');
        this.ngSelect.select(item);
    }

}
