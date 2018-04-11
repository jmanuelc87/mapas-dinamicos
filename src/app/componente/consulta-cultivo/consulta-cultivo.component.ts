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

    constructor(
        private service: AnuarioAgricolaService
    ) { }

    ngOnInit() {
        this.consultaCultivoForm = this.buildForm();
        this.consultaCultivoForm.get('estado').valueChanges.subscribe(item => this.getDistritos(item));
        this.consultaCultivoForm.get('distrito').valueChanges.subscribe(item => this.getMunicipios(item));
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
        this.service.getAllYears().subscribe(anios => this.anios = anios);
    }

    private getAllEstados() {
        this.service.getAllStates().subscribe(estados => this.estados = estados);
    }

    private getDistritos(item) {
        this.service.getDistrictByState(item).subscribe(distritos => this.distritos = distritos);
    }

    private getMunicipios(item) {
        this.service.getMunicipioByDistrict(item).subscribe(municipios => this.municipios = municipios);
    }

    private onSubmit(event) {
        if (this.consultaCultivoForm.valid) {
            let model = this.consultaCultivoForm.value;
            this.service.consultaAnuarioPorCultivo(model).subscribe(data => {
                this.getDataEvent.emit(data);
            })
        } else {
            console.log('check errors...');
        }
    }
}
