import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { Anuario } from '../../dominio/anuario';
import { Territorio } from '../../dominio/territorio';
import { AnuarioAgricola } from '../../dominio/anuario-agricola';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cultivo } from '../../dominio/cultivo';

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

    private consultaCultivoForm: FormGroup;

    private anios: Array<Anuario>;

    private estados: Array<Territorio>;

    private distritos: Array<Territorio>;

    private municipios: Array<Territorio>;

    @Output('dataEvent')
    public getDataEvent: EventEmitter<Cultivo[]> = new EventEmitter<Cultivo[]>();

    @Output('territorioSelectedEvent')
    public territorioSelectedEvent: EventEmitter<Territorio> = new EventEmitter<Territorio>();

    constructor(
        private service: AnuarioAgricolaService
    ) { }

    ngOnInit() {
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
    }

    private buildForm(): FormGroup {
        return new FormGroup({
            ciclo: new FormControl('oto-inv', Validators.required),
            modalidad: new FormControl('riego', Validators.required),
            catalogo: new FormControl('generico', Validators.required),
            anio: new FormControl('2016', Validators.required),
            estado: new FormControl(0, Validators.required),
            distrito: new FormControl(0, Validators.required),
            municipio: new FormControl(0, Validators.required)
        });
    }

    private getAllAnios() {
        this.service.getAllYears().then(anios => this.anios = anios);
    }

    private getAllEstados() {
        this.service.getAllStates().then(estados => this.estados = estados);
    }

    private emitEstadoSelection(item) {
        if (item !== '0') {
            let estado = new Territorio(item, 0, 0, null, 'estado');
            this.territorioSelectedEvent.emit(estado);
        }
    }

    private emitDistritoSelection(item) {
        if (item !== '0') {
            let distrito = new Territorio(0, item, 0, null, 'distrito');
            this.territorioSelectedEvent.emit(distrito);
        }
    }

    private emitMunicipioSelection(item) {
        if (item !== '0') {
            let id_ent = this.consultaCultivoForm.get('estado').value;
            let municipio = new Territorio(id_ent, 0, item, null, 'municipio');
            this.territorioSelectedEvent.emit(municipio);
        }
    }

    private getDistritos(item) {
        this.service.getDistrictByState(item).then(distritos => this.distritos = distritos);
    }

    private getMunicipios(item) {
        this.service.getMunicipioByDistrict(item).then(municipios => this.municipios = municipios);
    }

    private onSubmit(event) {
        if (this.consultaCultivoForm.valid) {
            let model = this.consultaCultivoForm.value;
            this.service.consultaAnuarioPorCultivo(model).then(data => {
                this.getDataEvent.emit(data);
            });
        } else {

        }
    }
}
