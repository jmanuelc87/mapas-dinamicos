import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { Component, OnInit } from '@angular/core';
import { Cultivo } from '../../dominio/cultivo';
import { Estado } from '../../dominio/estado';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { PicoEvent } from 'picoevent';
import { Territorio } from '../../dominio/territorio';
import { Variedad } from '../../dominio/variedad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Component({
    selector: 'app-consulta-estado',
    templateUrl: './consulta-estado.component.html',
    styleUrls: ['./consulta-estado.component.css'],
    providers: [
        AnuarioAgricolaService
    ]
})
export class ConsultaEstadoComponent implements OnInit {

    private form: FormGroup;

    private estados: Array<Territorio>;

    private cultivos: Array<Cultivo>;

    private variedad: Array<Variedad>;

    constructor(
        private service: AnuarioAgricolaService,
        private fb: FormBuilder,
        private pico: PicoEvent
    ) { }

    ngOnInit() {
        this.getAllCultivos();
        this.getAllEstados();

        this.form = this.fb.group({
            ciclo: ['oto-inv', Validators.required],
            modalidad: ['riego', Validators.required],
            catalogo: ['generico', Validators.required],
            cultivo: ['0', Validators.required],
            variedad: ['1', Validators.required],
            estados: ['0', Validators.required],
            territorio: ['1', Validators.required]
        });

        this.form.get('variedad').disable();

        // llena el select de variedades
        this.form.get('cultivo').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id !== 0)
            .subscribe(id => this.getVariedadesByCultivo(id));

        // deshabilita el select 'variedades' para hacer la caja de texto el cultivo
        this.form.get('cultivo').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id === 0)
            .subscribe(id => {
                this.form.get('variedad').setValue('0');
                this.form.get('variedad').disable();
            });

        // actualiza el extent de los estados
        this.form.get('estados').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id !== 0)
            .subscribe(id => this.pico.publish(new Estado(id), ['update-extent-entidades']));


        // actualiza el extent a nivel nacional
        this.form.get('estados').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id === 0)
            .subscribe(id => this.pico.publish(new Estado(id), ['update-extent-all']));
    }

    private getAllCultivos() {
        this.service.getAllCultivo().then(cultivos => this.cultivos = cultivos);
    }

    private getVariedadesByCultivo(id) {
        this.form.get('variedad').enable();
        this.service.getVariedadByCultivo(id).then(variedad => this.variedad = variedad);
    }

    private getAllEstados() {
        this.service.getAllStates().then(estados => this.estados = estados);
    }

    private onSubmit(event) {
        // on submit event
        console.log(JSON.stringify(this.form.value));
    }

}
