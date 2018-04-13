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

    /*ngOnInit() {
        this.consultaCultivoForm = this.buildForm();
        this.consultaCultivoForm.get('estado').valueChanges.subscribe(item => {
            if (item !== '0') {
                this.getDistritos(item);
                this.emitEstadoSelection(item);
            } else {
                console.log(item);
                this.distritos = [];
                this.municipios = [];
            }
        });
        this.consultaCultivoForm.get('distrito').valueChanges.subscribe(item => {
            this.getMunicipios(item);
            this.emitDistritoSelection(item);
        });
        this.consultaCultivoForm.get('municipio').valueChanges.subscribe(item => {
            this.emitMunicipioSelection(item);
        });
        this.getAllAnios();
        this.getAllEstados();
    }*/

    ngOnInit() {
        this.getAllAnuarios();
        this.getAllEstados();

        this.form = this.fb.group({
            ciclo: ['oto-inv', Validators.required],
            modalidad: ['riego', Validators.required],
            catalogo: ['generico', Validators.required],
            anio: [2016, Validators.required],
            estado: [0, Validators.required],
            distrito: [Validators.required],
            municipio: [Validators.required]
        });

        this.form.valueChanges
            .subscribe(data => {
                console.log(JSON.stringify(data));
            });
    }

    private getAllAnuarios() {
        this.service.getAllYears().then(anuarios => this.anuario = anuarios);
    }

    private getAllEstados() {
        this.service.getAllStates().then(estados => this.estados = estados);
    }

    private emitEstadoSelection(item) {
        if (item !== '0') {
            //let estado = new Territorio(item, 0, 0, null, 'estado');
            //this.territorioSelectedEvent.emit(estado);
        }
    }

    private emitDistritoSelection(item) {
        if (item !== '0') {
            //let distrito = new Territorio(0, item, 0, null, 'distrito');
            //this.territorioSelectedEvent.emit(distrito);
        }
    }

    private emitMunicipioSelection(item) {
        if (item !== '0') {
            //let id_ent = this.consultaCultivoForm.get('estado').value;
            //let municipio = new Territorio(id_ent, 0, item, null, 'municipio');
            //this.territorioSelectedEvent.emit(municipio);
        }
    }

    private getDistritos(item) {
        this.service.getDistrictByState(item).then(distritos => this.distritos = distritos);
    }

    private getMunicipios(item) {
        this.service.getMunicipioByDistrict(item).then(municipios => this.municipios = municipios);
    }

    private onSubmit(event) {
        // submit event
    }
}
