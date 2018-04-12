import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { Component, OnInit } from '@angular/core';
import { Cultivo } from '../../dominio/cultivo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Territorio } from '../../dominio/territorio';

@Component({
    selector: 'app-consulta-estado',
    templateUrl: './consulta-estado.component.html',
    styleUrls: ['./consulta-estado.component.css'],
    providers: [
        AnuarioAgricolaService
    ]
})
export class ConsultaEstadoComponent implements OnInit {

    private consultaEstadoForm: FormGroup;

    private estados: Array<Territorio>;

    private cultivos: Array<Cultivo>;

    private variedad: Cultivo;

    private variedadFormControl: FormControl;

    constructor(
        private service: AnuarioAgricolaService
    ) { }

    ngOnInit() {
        this.consultaEstadoForm = this.buildForm();
        this.consultaEstadoForm.get('cultivo').valueChanges.subscribe(item => this.getVariedadesByCultivo(item))
        this.consultaEstadoForm.get('catalogo').valueChanges.subscribe(item => this.changeVisibility(item));
        this.getAllCultivos();
        this.getAllEstados();
        this.variedadFormControl.disable();
    }

    private buildForm(): FormGroup {
        this.variedadFormControl = new FormControl('0', Validators.required);

        return new FormGroup({
            ciclo: new FormControl('oto-inv', Validators.required),
            modalidad: new FormControl('riego', Validators.required),
            catalogo: new FormControl('generico', Validators.required),
            cultivo: new FormControl('0', Validators.required),
            variedad: this.variedadFormControl,
            estados: new FormControl('0', Validators.required),
            filtro: new FormControl('1', Validators.required)
        });
    }

    private getAllCultivos() {
        this.service.getAllCultivo().then(cultivos => this.cultivos = cultivos);
    }

    private getVariedadesByCultivo(item) {
        this.service.getVariedadByCultivo(item).then(variedad => this.variedad = variedad);
    }

    private getAllEstados() {
        this.service.getAllStates().then(estados => this.estados = estados);
    }

    private changeVisibility(event) {
        if (event === 'generico') {
            this.variedadFormControl.disable();
        } else {
            this.variedadFormControl.enable();
        }
    }

    private onSubmit(event) {
        if (this.consultaEstadoForm.valid) {
            console.log('submitted....');
            console.log(this.consultaEstadoForm.value);
        } else {
            console.log('error....');
        }
    }

}
