import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { Cultivo } from '../../../models/cultivo';
import { CultivoService } from '../../../services/cultivo.service';
import { FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Variedad } from '../../../models/variedad';

@Component({
    selector: 'app-cultivo',
    templateUrl: './cultivo.component.html',
    styleUrls: ['./cultivo.component.css']
})
export class CultivoComponent implements OnInit {

    cultivos: Cultivo[] = [
        { id: 0, nombre: "Resumen Cultivos" }
    ];

    variedades: Variedad[] = [
        { id: 0, nombre: "Resumen Variedades" }
    ];

    show = false;

    @Input()
    nameFormCultivo: string;

    @Input()
    nameFormVariedad: string;

    @Input()
    group: FormGroup;

    @Output()
    selectedCultivo: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('variedad')
    private ngSelect: NgSelectComponent

    private _catalogo: string;

    defaultCultivo = this.cultivos[0];

    defaultVariedad = this.variedades[0];

    constructor(
        private cultivoService: CultivoService,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.fetchCultivo('generico');
    }

    onChangeCultivo(event) {
        this.defaultCultivo = event;
        if (this._catalogo == 'detalle' && event.id) {
            this.fetchVariedad(event.id);
        }
        this.selectedCultivo.emit(event);
    }

    onChangeVariedades(event) {
        this.defaultVariedad = event;
    }

    getCultivo() {
        return this.defaultCultivo;
    }

    getVariedad() {
        return this.defaultVariedad;
    }

    @Input()
    set catalogo(catalogo: string) {
        this._catalogo = catalogo;
        this.fetchCultivo(catalogo);
        if (catalogo == 'detalle') {
            // enable variedades
            this.show = true;
        } else {
            // disable variedades
            this.show = false;
        }
    }

    public fetchCultivo(catalogo) {
        this.cultivoService
            .getCultivos(catalogo)
            .subscribe(data => {
                data.unshift({ id: 0, nombre: "Resumen Cultivos" });
                this.cultivos = data;
            }, err => console.error(err), () => console.log('get all cultivos completed'));
    }

    public fetchVariedad(id) {
        this.cultivoService.getVariedadesByCultivo(id)
            .subscribe((data: Array<any>) => {
                data.unshift({ id: 0, variedad: "Resumen Variedades" });
                this.variedades = data;
            }, err => console.error(err), () => console.log('get all variedades completed'));
    }

    public resetVariedades() {
        this.variedades = [
            { id: 0, nombre: "Resumen Variedades" }
        ];
        let item = this.ngSelect.itemsList.findByLabel("Resumen Variedades");
        this.ngSelect.select(item);
    }

}
