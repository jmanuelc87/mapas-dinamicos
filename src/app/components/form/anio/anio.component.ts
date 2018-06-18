import { Component, OnInit, Input } from '@angular/core';
import { Anio } from '../../../models/Anio';
import { AnioService } from '../../../services/anio.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-anio',
    templateUrl: './anio.component.html',
    styleUrls: ['./anio.component.css']
})
export class AnioComponent implements OnInit {

    anios: Anio[];

    @Input()
    id;

    @Input()
    group: FormGroup;

    @Input()
    name: string;

    default;

    constructor(
        private anioService: AnioService,
    ) { }

    ngOnInit() {
        this.fetch();
    }

    onChange(event) {
        this.default = event;
    }

    public getAnio() {
        return this.default;
    }

    public fetch() {
        this.anioService
            .getAllAnios()
            .subscribe((anios: Anio[]) => {
                this.anios = anios;
            }, err => console.error(err), () => console.debug('get all years completed'));
    }

}
