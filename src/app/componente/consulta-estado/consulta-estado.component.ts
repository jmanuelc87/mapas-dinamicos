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
import { Ddr } from '../../dominio/ddr';
import { Anuario } from '../../dominio/anuario';
import { ServiceUtil } from '../../util/util';


@Component({
    selector: 'app-consulta-estado',
    templateUrl: './consulta-estado.component.html',
    styleUrls: ['./consulta-estado.component.css'],
    providers: [
        AnuarioAgricolaService,
        ServiceUtil
    ]
})
export class ConsultaEstadoComponent implements OnInit {

    private form: FormGroup;

    private anuario: Anuario[];

    private estados: Array<Territorio>;

    private distritos: Array<Territorio> = new Array<Territorio>();

    private cultivos: Array<Cultivo>;

    private variedades: Array<Variedad>;

    private filtro: boolean = true;

    private collapsed: boolean;

    private distritosFormControl: FormControl;

    constructor(
        private service: AnuarioAgricolaService,
        private util: ServiceUtil,
        private fb: FormBuilder,
        private pico: PicoEvent
    ) { }

    ngOnInit() {
        this.getAllCultivos('generico');
        this.getAllEstados();
        this.getAllYears();

        this.form = this.fb.group({
            ciclo: ['1', Validators.required],
            modalidad: ['1', Validators.required],
            catalogo: ['generico', Validators.required],
            year: ['2016', Validators.required],
            cultivo: ['0', Validators.required],
            variedad: ['0', Validators.required],
            estados: ['0', Validators.required],
            filtroTerritorio: ['1', Validators.required],
            distrito: ['', Validators.required]
        });

        this.form.get('variedad').disable();
        let catalogo = this.form.get('catalogo');

        // llena el select de variedades
        this.form.get('cultivo').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id !== 0)
            .subscribe(id => catalogo.value == 'detalle' ? this.getVariedadesByCultivo(id) : this.disableVariedad());

        // deshabilita el select 'variedades' para hacer la caja de texto el cultivo
        this.form.get('cultivo').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id === 0)
            .subscribe(id => this.form.get('variedad').setValue('0'));

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


        this.form.get('catalogo').valueChanges
            .filter(value => value === 'detalle')
            .subscribe(value => this.enableVariedad());

        this.form.get('catalogo').valueChanges
            .filter(value => value === 'generico')
            .subscribe(value => this.disableVariedad());

        this.form.get('catalogo').valueChanges
            .subscribe(value => this.getAllCultivos(value));

        this.form.get('estados').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id !== 0)
            .subscribe(id => this.showFiltro(id));

        this.form.get('estados').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id === 0)
            .subscribe(id => this.filtro = true);

    }

    private showFiltro(id) {
        this.filtro = false;
        this.service.getDistrictByState(id).then(value => this.distritos = value);

        this.form.get('distrito').valueChanges
            .subscribe(id => this.pico.publish(new Ddr(id), ['draw-map-ddr']));
    }

    private disableVariedad() {
        this.form.get('variedad').setValue('0');
        this.form.get('variedad').disable();
    }

    private enableVariedad() {
        this.form.get('variedad').enable();
    }

    private getAllCultivos(catalogo: string) {
        this.service.getAllCultivo(catalogo).then(cultivos => this.cultivos = cultivos);
    }


    private getVariedadesByCultivo(id) {
        this.form.get('variedad').enable();
        this.service.getVariedadByCultivo(id).then(variedad => this.variedades = variedad);
    }

    private getAllEstados() {
        this.service.getAllStates().then(estados => this.estados = estados);
    }

    private getAllYears() {
        this.service.getAllYears().then(years => this.anuario = years);
    }

    private onSubmit(event) {
        console.log(this.form.value);
        let ciclo = this.form.get('ciclo').value;
        let modalidad = this.form.get('modalidad').value;
        let catalogo = this.form.get('catalogo').value;
        let year = this.form.get('year').value;
        let cultivo = this.form.get('cultivo').value;
        let variedad = this.form.get('variedad').value;
        let estado = this.form.get('estados').value;
        let filtroTerritorio = this.form.get('filtroTerritorio').value;
        let distrito = this.form.get('distrito').value;

        filtroTerritorio = Number.parseInt(filtroTerritorio);

        let fields = ServiceUtil.buildColumnFieldsTerritorioCultivo(filtroTerritorio);
        let printable = ServiceUtil.buildPrintableFieldsTerritorioCultivo(filtroTerritorio);

        this.service.consultaProduccionPorEstado(year, ciclo, modalidad, catalogo, cultivo, variedad, estado, filtroTerritorio, distrito)
            .then((cultivoTerritorio) => {

                let map = new Map();
                map.set('id', 'produccion-estado');
                map.set('data', cultivoTerritorio);
                map.set('fields', fields);
                map.set('printable', printable);

                // extra parameters
                map.set('estados', cultivoTerritorio);
                map.set('distrito.id', distrito);
                map.set('cultivo.id', cultivo);
                map.set('variedad.id', variedad);

                this.pico.publish(map, ['update-table']);
                this.collapsed = true;
            });
    }
}
