import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../../models/municipio';
import { MunicipioSandbox } from './municipio.sandbox';
import { NgSelectComponent } from '../../../../../node_modules/@ng-select/ng-select';

@Component({
    selector: 'app-select-municipio',
    templateUrl: './municipio.component.html',
    styleUrls: ['./municipio.component.scss'],
    providers: [MunicipioSandbox],
})
export class MunicipioComponent implements OnInit {

    @ViewChild(NgSelectComponent)
    private select: NgSelectComponent;

    private data$: Observable<Municipio[]>

    @Output()
    public selected: EventEmitter<Municipio> = new EventEmitter();

    constructor(
        private sandbox: MunicipioSandbox,
    ) { }

    ngOnInit() {
        this.data$ = this.sandbox.getMunicipios();
    }

    loadMunicipiosByIds(estadoid: number, distritoid: number) {
        this.sandbox.searchMunicipiosByIds(estadoid, distritoid);
    }

    selectItem(value: any) {
        let item = this.select.itemsList.findItem(value);
        if (item) {
            this.select.select(item);
        }
    }

    getSelectedItem() {
        return this.select.selectedItemId;
    }

    handleChange($event) {
        this.selected.emit($event);
    }

    clear() {
        this.sandbox.cleanMunicipios();
        this.select.clearModel();
    }

}
