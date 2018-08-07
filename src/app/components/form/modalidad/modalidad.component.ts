import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { v4 as uuid } from "uuid";
import { FormGroup } from '@angular/forms';
import { Modalidad } from '../../../models/modalidad';

@Component({
    selector: 'app-modalidad',
    templateUrl: './modalidad.component.html',
    styleUrls: ['./modalidad.component.css']
})
export class ModalidadComponent implements OnInit {

    @Input()
    id;

    @Input()
    group: FormGroup;

    @Input()
    name: string;

    @Output()
    change: EventEmitter<Modalidad> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.id = uuid();
    }

    onChange($event) {
        let value: string[] = $event.target.value.split("*");

        let moda = new Modalidad();
        moda.Id = +value[0];
        moda.Nombre = value[1];

        this.change.emit(moda);
    }

}
