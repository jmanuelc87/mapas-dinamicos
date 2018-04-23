import { Anuario } from '../../dominio/anuario';
import { AnuarioAgricola } from '../../dominio/anuario-agricola';
import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { ClrDatagrid } from '@clr/angular';
import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { Cultivo } from '../../dominio/cultivo';
import { DatatableMensaje } from '../../dominio/datatable-mensaje';
import { Ddr } from '../../dominio/ddr';
import { Estado } from '../../dominio/estado';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Mensaje } from '../../dominio/mensaje';
import { Municipio } from '../../dominio/municipio';
import { PicoEvent } from 'picoevent';
import { ServiceUtil } from '../../util/util';
import { Subscription } from 'rxjs/Subscription';
import { Territorio } from '../../dominio/territorio';
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
        private fb: FormBuilder,
        private pico: PicoEvent
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

        // envia un evento para actualizar el extent de las entidades en el mapa
        this.form.get('estado').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id !== 0)
            .subscribe(id => this.pico.publish(new Estado(id), ['update-extent-entidades']));

        // 
        this.form.get('estado').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id === 0)
            .subscribe(id => this.pico.publish(new Estado(id), ['update-extent-all']));

        // 
        this.form.get('estado').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id !== 0)
            .subscribe(id => this.pico.publish(new Estado(id), ['draw-map-entidad']))

        // 
        this.form.get('distrito').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id !== 0)
            .subscribe(id => this.pico.publish(new Ddr(id), ['draw-map-ddr']));

        // 
        this.form.get('municipio').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id !== 0)
            .subscribe(id =>
                this.pico.publish(
                    new Mensaje(
                        new Municipio(id),
                        new Estado(this.form.get('estado').value)
                    ), ['draw-map-municipio']));

        this.form.get('municipio').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id === 0)
            .subscribe(id => this.pico.publish(new Mensaje(), ['erase-map-municipio']));

        this.form.get('distrito').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id === 0)
            .subscribe(id => this.pico.publish(new Mensaje(), ['erase-map-distrito']));

        this.form.get('estado').valueChanges
            .map(value => Number.parseInt(value))
            .filter(id => id === 0)
            .subscribe(id => this.pico.publish(new Mensaje(), ['erase-map-estado']));

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
        // enviar datos al servidor y emittir evento
        // verificar y validar los datos
        // console.log(JSON.stringify(this.form.value));
        
        let val = this.form.value;
        let anuario = new AnuarioAgricola(0, val.anio, val.ciclo, val.modalidad, val.catalogo, val.estado, val.distrito, val.municipio);

        let fields = ServiceUtil.buildFieldsConsultaCultivo(anuario);
        let printableFields = ServiceUtil.buildPrintableFieldsConsultaCultivo(anuario);

        this.service.consultaAnuarioPorCultivo(anuario).then(cultivo => {
            this.pico.publish(new DatatableMensaje(cultivo, fields, printableFields, anuario), ['update-table']);
            this.collapsed = true;
        });
    }
}
