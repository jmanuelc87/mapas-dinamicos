import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/estado.service';

@Component({
    selector: 'app-estado',
    templateUrl: './estado.component.html',
    styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

    estados: Estado[] = [
        { id: 0, name: "Resumen Nacional" }
    ];

    @Input()
    id;

    @Input()
    group: FormGroup;

    @Input()
    name: string;

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    default = this.estados[0];

    constructor(
        private estadoService: EstadoService,
    ) { }

    ngOnInit() {
        this.fetch();
    }

    onChange(event) {
        this.default = event;
        this.selected.emit(this.default);
    }

    public getEstado() {
        return this.default;
    }

    public fetch() {
        this.estadoService
            .getAllEstados()
            .subscribe((estados: Estado[]) => {
                this.estados = estados;
            },
                err => console.error(err),
                () => console.debug('get all states completed'));
    }

}
