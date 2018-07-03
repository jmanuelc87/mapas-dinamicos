import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/estado.service';
import { NgSelectComponent } from '@ng-select/ng-select';

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

    @ViewChild(NgSelectComponent)
    ngSelect: NgSelectComponent;

    constructor(
        private estadoService: EstadoService,
    ) { }

    ngOnInit() {
        this.fetch();
    }

    onChange(event) {
        if (event != undefined && event.hasOwnProperty('id')) {
            this.ngSelect.placeholder = '';
            this.default = event;
            this.selected.emit(this.default);
        } else {
            // set placeholder
            this.ngSelect.placeholder = 'Seleccione un Estado';
        }
    }

    onRemove($event) {
        console.log($event);
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
