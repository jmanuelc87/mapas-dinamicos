import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Estado } from '../../../models/Estado';
import { FormGroup } from '@angular/forms';
import { DistritoService } from '../../../services/distrito.service';

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

    constructor(
        private distritoService: DistritoService
    ) { }

    ngOnInit() {
    }

    onChange(event) {
        this.default = event;
        this.selected.emit(event);
    }

    getDistrito() {
        return this.default;
    }

    public fetch(estadoid) {
        this.distritoService.getDistritoByEstado(estadoid)
            .subscribe((distritos: Estado[]) => {
                distritos.push({ id: 0, name: 'Todos' });
                this.distritos = distritos;
            }, err => console.error(err), () => console.log('get all ddr completed.'));
    }

}
