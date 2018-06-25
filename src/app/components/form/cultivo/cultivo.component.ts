import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CultivoService } from '../../../services/cultivo.service';

@Component({
    selector: 'app-cultivo',
    templateUrl: './cultivo.component.html',
    styleUrls: ['./cultivo.component.css']
})
export class CultivoComponent implements OnInit {

    cultivos = [
        { id: 0, nombre: "Resumen Cultivos" }
    ];

    variedades = [
        { id: 0, variedad: "Resumen Variedades" }
    ];

    @Input()
    nameFormCultivo: string;

    @Input()
    nameFormVariedad: string;

    @Input()
    group: FormGroup;

    @Output()
    selectedCultivo: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('variedad')
    private select: ElementRef

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
            this.renderer.setProperty(this.select.nativeElement, 'disabled', false);
        } else {
            // disable variedades
            this.renderer.setProperty(this.select.nativeElement, 'disabled', true);
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
}
