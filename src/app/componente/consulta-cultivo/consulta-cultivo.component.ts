import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { Anuario } from '../../dominio/anuario';
import { Territorio } from '../../dominio/territorio';
import { AnuarioAgricola } from '../../dominio/anuario-agricola';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Cultivo } from '../../dominio/cultivo';
import { ClrDatagrid } from '@clr/angular';
import { Estado } from '../../dominio/estado';
import { Ddr } from '../../dominio/ddr';
import { Municipio } from '../../dominio/municipio';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-consulta-cultivo',
    templateUrl: './consulta-cultivo.component.html',
    styleUrls: ['./consulta-cultivo.component.css'],
    providers: [
        AnuarioAgricolaService
    ]
})
export class ConsultaCultivoComponent implements OnInit {

    private collapsed: boolean;

    private form: FormGroup;

    private anuario: Array<Anuario>;

    private estados: Array<Estado>;

    private distritos: Array<Ddr>;

    private municipios: Array<Municipio>;

    @Output('dataEvent')
    public getDataEvent: EventEmitter<Cultivo[]> = new EventEmitter<Cultivo[]>();

    @Output('territorioSelectedEvent')
    public territorioSelectedEvent: EventEmitter<Territorio> = new EventEmitter<Territorio>();

    constructor(
        private service: AnuarioAgricolaService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.getAllAnuarios();
        this.getAllEstados();

        this.form = this.fb.group({
            ciclo: ['oto-inv', Validators.required],
            modalidad: ['riego', Validators.required],
            catalogo: ['generico', Validators.required],
            anio: [2016, Validators.required],
            estado: [0, Validators.required],
            distrito: [0, Validators.required],
            municipio: [0, Validators.required]
        });

        // deshabilita los select de 'distrito' y 'municipio'
        this.form.get('distrito').disable();
        this.form.get('municipio').disable();

        // llena el select de distrito
        this.form.get('estado').valueChanges
            .map(value => Number.parseInt(value))
            .subscribe(id => this.getDistritosByEstado(id));

        // habilita el select de 'distrito' y 'municipio' cuando un estado es seleccionado
        this.form.get('estado').valueChanges
            .map(value => Number.parseInt(value))
            .filter((value, index) => value !== 0)
            .subscribe(value => {
                this.form.get('distrito').enable();
                this.form.get('municipio').enable();
            });

        // deshabilita el select 'distrito' y 'municipio' cuando resumen nacional es seleccionado
        this.form.get('estado').valueChanges
            .map(value => Number.parseInt(value))
            .filter((value, index) => value === 0)
            .subscribe(value => {
                this.form.get('distrito').setValue('0');
                this.form.get('municipio').setValue('0');
                this.form.get('distrito').disable();
                this.form.get('municipio').disable();
            });

        // llena el select de 'municipios'
        this.form.get('distrito').valueChanges
            .map(value => Number.parseInt(value))
            .subscribe(id => this.getMunicipiosByDistrito(id));

        // elimina los datos del select 'municipios'
        this.form.get('distrito').valueChanges
            .map(value => Number.parseInt(value))
            .filter((value, index) => value == 0)
            .subscribe(value => {
                this.form.get('municipio').setValue('0');
            });
    }

    private getAllAnuarios() {
        this.service.getAllYears().then(anuarios => this.anuario = anuarios);
    }

    private getAllEstados() {
        this.service.getAllStates().then(estados => this.estados = estados);
    }

    private getDistritosByEstado(id: number) {
        this.service.getDistrictByState(id).then(distritos => {
            this.distritos = distritos
        });
    }

    private getMunicipiosByDistrito(item) {
        this.service.getMunicipioByDistrict(item).then(municipios => this.municipios = municipios);
    }

    private onSubmit(event) {
        // submit event
        console.log(event);
    }
}
