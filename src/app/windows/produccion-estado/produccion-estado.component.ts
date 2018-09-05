import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { ServiceService } from '../../services/service.service';
import { FactoryDirective } from '../../directives';
import { RangosComponent } from '../rangos/rangos.component';
import { WindowComponent, FiltroEstadoComponent, DistritoComponent, EstadoComponent } from '../../components';
import { ColumnsService } from '../../services/columns.service';
import { PopupService } from '../../services/popup.service';
import { EsriExtentService } from '../../services/esri-extent.service';
import { LegendService } from '../../services/legend.service';

@Component({
    selector: 'app-produccion-estado',
    templateUrl: './produccion-estado.component.html',
    styleUrls: ['./produccion-estado.component.css']
})
export class ProduccionEstadoComponent implements OnInit {

    public windowRef: any;

    @ViewChild(FactoryDirective)
    appFactory: FactoryDirective;

    @ViewChild(WindowComponent)
    windowComponent: WindowComponent;

    @ViewChild(FiltroEstadoComponent)
    appFiltroComponent: FiltroEstadoComponent;

    @ViewChild(DistritoComponent)
    appDistrito: DistritoComponent;

    @ViewChild(EstadoComponent)
    appEstado: EstadoComponent;

    catalogo: string = 'generico';

    form: FormGroup;

    rowData = [];

    columnDefs = [];

    showTable: boolean = false;

    constructor(
        private columns: ColumnsService,
        private fb: FormBuilder,
        private consultaService: ConsultaService,
        private constructor: ServiceService,
        private popupService: PopupService,
        private extentService: EsriExtentService,
        private legendService: LegendService,
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            'ciclo': ['1', Validators.required],
            'modalidad': ['1', Validators.required],
            'catalogo': ['generico', Validators.required],
            'anio': ['2016', Validators.required],
            'estado': ['', Validators.required],
            'cultivo': [0, Validators.required],
            'variedad': [0, Validators.required],
            'filtro': ['estado', Validators.required],
            'distrito': [0, Validators.required],
        });
    }

    onHandleClose() {
        // Eliminar leyenda del mapa
        this.legendService.removeLegend();
    }

    onSelectedChanged(event) {
        this.catalogo = event;
    }

    onSubmitForm(event) {
        this.rowData = [];

        let datosConsulta = this.form.value;

        let estado = this.appEstado.getEstado();
        let distrito = this.appDistrito.getDistrito();
        this.legendService.addLegendConsultaEstado(datosConsulta, estado, distrito);

        this.consultaService
            .getAnuarioByEstado(datosConsulta)
            .subscribe((response: any) => {
                this.legendService.addLegend();
                this.columnDefs = this.columns.parseConsultaForProduccionEstado(datosConsulta);
                this.rowData = response
                this.showTable = true;
            }, err => console.error(err), () => console.log('get consulta completed!'));
    }

    onHandleSelectedEstado($event) {
        if ($event.id != 0) {
            this.appFiltroComponent.show = true;
            this.form.get('filtro').setValue('distrito');
        } else {
            this.appFiltroComponent.show = false;
            this.form.get('filtro').setValue('estado');
        }

        let item = $event;

        if (item != undefined && item.id != undefined) {
            this.appDistrito.fetch(item.id);
            if (item.id == 0) {
                this.extentService.fetchExtentAll();
            } else {
                this.extentService.fetchExtentEstado(item.id);
            }
        }
    }

    onHandleCloseRangos() {
        this.windowComponent.handleClickMinimize(null);
        this.popupService.addConsultaParameters(this.form.value);
    }

    onClickRanges(event) {
        if (this.rowData.length > 0) {
            // show modal rangos
            let component = this.constructor.createComponent(RangosComponent, this.appFactory);
            let pos = this.windowComponent.position;
            (component.instance as RangosComponent).location = pos;
            (component.instance as RangosComponent).componentRef = component;
            (component.instance as RangosComponent).columnValues = this.rowData;
            (component.instance as RangosComponent).filtro = this.form.get('filtro').value;
            (component.instance as RangosComponent).close.subscribe(() => this.onHandleCloseRangos());
        } else {
            /* mostrar error 'Por favor de realizar una búsqueda' */
            alert('Por favor de realizar una búsqueda');
        }
    }

}
