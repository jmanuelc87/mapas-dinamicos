import { Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { v4 as uuid } from "uuid";

@Component({
    selector: 'app-filtro-estado',
    templateUrl: './filtro-estado.component.html',
    styleUrls: ['./filtro-estado.component.css']
})
export class FiltroEstadoComponent implements OnInit {

    id: any;

    @Input()
    group: FormGroup;

    @Input()
    name: string;

    @Input()
    show: boolean;

    constructor() { }

    ngOnInit() {
        this.id = uuid();
    }

}
