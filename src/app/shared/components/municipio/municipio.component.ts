import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../../models/municipio';
import { MunicipioSandbox } from './municipio.sandbox';

@Component({
    selector: 'app-select-municipio',
    templateUrl: './municipio.component.html',
    styleUrls: ['./municipio.component.scss'],
    providers: [MunicipioSandbox],
})
export class MunicipioComponent implements OnInit {

    private data$: Observable<Municipio[]>

    @Output()
    public selected: EventEmitter<Municipio> = new EventEmitter();

    constructor(
        private sandbox: MunicipioSandbox,
    ) { }

    ngOnInit() {
        this.data$ = this.sandbox.getMunicipios();
    }


    loadMunicipiosByIds(idestado: number, iddistrito: number) {
        this.sandbox.searchMunicipiosByIds(idestado, iddistrito);
    }

    handleChange($event) {
        this.selected.emit($event);
    }

}
