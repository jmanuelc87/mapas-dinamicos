import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistritoComponent, MunicipioComponent, WindowComponent, EstadoComponent, AnioComponent } from '../../components';
import { ConsultaService } from '../../services/consulta.service';
import { EsriExtentService } from '../../services/esri-extent.service';
import { GeometryService } from '../../services/geometry.service';
import { ColorPickerComponent } from '../../components/color-picker/color-picker.component';
import { LegendService } from '../../services/legend.service';
import { ColumnsService } from '../../services/columns.service';

@Component({
    selector: 'app-produccion-cultivo',
    templateUrl: './produccion-cultivo.component.html',
    styleUrls: ['./produccion-cultivo.component.css']
})
export class ProduccionCultivoComponent implements OnInit {

    componentRef: any;

    form: FormGroup;

    showTable: boolean;

    panCompleteSubscription;

    columnDefs = [];

    rowData;

    @ViewChild(AnioComponent)
    appAnio: AnioComponent;

    @ViewChild(EstadoComponent)
    appEstado: EstadoComponent;

    @ViewChild(DistritoComponent)
    appDistrito: DistritoComponent;

    @ViewChild(MunicipioComponent)
    appMunicipio: MunicipioComponent;

    @ViewChild(WindowComponent)
    appWindow: WindowComponent;

    @ViewChild(ColorPickerComponent)
    colorPicker: ColorPickerComponent;

    constructor(
        private fb: FormBuilder,
        private consulta: ConsultaService,
        private extentService: EsriExtentService,
        private columns: ColumnsService,
        private geometryService: GeometryService,
        private legendService: LegendService,
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            'ciclo': ['1', Validators.required],
            'modalidad': ['1', Validators.required],
            'catalogo': ['generico', Validators.required],
            'anio': ['2016', Validators.required],
            'estado': [0, Validators.required],
            'distrito': [0, Validators.required],
            'municipio': [0, Validators.required],
        });

        this.panCompleteSubscription = this.extentService.extentComplete.subscribe(() => {
            this.appWindow.handleClickMaximize(null);
        });

        this.appAnio.fetch();
    }

    /**
     * Funcion callback llamada cuando cambia la seleccion del estado.
     *  - Cambia el extent del componente EsriMapComponent
     *  - Actualiza la información del componente DistritoComponent
     *
     * @param item objeto con las propiedades id y name del estado seleccionado
     */
    onChangeEstadoItem(item) {
        if (item != undefined && item.id != undefined) {
            console.log('entra');
            this.appDistrito.fetch(item.id);
            if (item.id == 0) {
                this.extentService.fetchExtentAll();
            } else {
                this.extentService.fetchExtentEstado(item.id);
            }
            this.appWindow.handleClickMinimize(null);
        }
    }

    onChangeDistritoItem(item) {
        if (item !== undefined && item.id != undefined) {
            this.appMunicipio.fetch(this.form.get('estado').value, item.id);
            this.extentService.fetchExtentDistrito(item.id);
            this.appWindow.handleClickMinimize(null);
        }
    }

    onChangeMunicipioItem(item) {
        if (item !== undefined && item.id != undefined) {
            this.extentService.fetchExtentMunicipio(this.form.get('estado').value, item.id);
            this.appWindow.handleClickMinimize(null);
        }
    }

    onSubmitForm(event) {
        this.showTable = true;
        this.rowData = [];

        let datosConsulta = this.form.value;
        let estado = this.appEstado.getEstado();
        let distrito = this.appDistrito.getDistrito();
        let municipio = this.appMunicipio.getMunicipio();
        this.legendService.addLegendConsultaCultivo(datosConsulta, estado, distrito, municipio);
        this.consulta.getAnuarioByCultivo(datosConsulta).subscribe(response => {
            this.columnDefs = this.columns.parseConsultaForProduccionCultivo(datosConsulta)
            this.rowData = response;
        });
    }

    onSelectionChanged(event) {
        let selectedRow = event.api.getSelectedRows();
        let anuario = this.form.value;
        anuario['cultivo'] = parseInt(selectedRow[selectedRow.length - 1].id);
        anuario['variedad'] = selectedRow[selectedRow.length - 1].idvariedad != undefined ? parseInt(selectedRow[selectedRow.length - 1].idvariedad) : 0;

        this.consulta.getEstados(anuario).subscribe((response: any) => {

            let obj = {
                query: anuario,
                regions: response,
                color: this.colorPicker.getSelectedColor(),
            }

            this.geometryService.cleanMap();
            this.geometryService.getGeometry(obj);
            this.legendService.addLegend();
            this.appWindow.handleClickMinimize(null);
        });
    }

    onGridReady(event) {
        event.api.sizeColumnsToFit();
    }

    onHandleClose() {
        this.legendService.removeLegend();
    }

}
