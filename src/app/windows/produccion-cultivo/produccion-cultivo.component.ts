import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistritoComponent, MunicipioComponent, WindowComponent } from '../../components';
import { ConsultaService } from '../../services/consulta.service';
import { EsriExtentService } from '../../services/esri-extent.service';
import { FormatterService } from '../../services/formatter.service';
import { GeometryService } from '../../services/geometry.service';

@Component({
    selector: 'app-produccion-cultivo',
    templateUrl: './produccion-cultivo.component.html',
    styleUrls: ['./produccion-cultivo.component.css']
})
export class ProduccionCultivoComponent implements OnInit {

    componentRef: any;

    form: FormGroup;

    gridColumnApi;

    showTable: boolean;

    panCompleteSubscription;

    columnDefs = [
        {
            headerName: "Cultivo",
            field: "cultivo",
            width: 150,
        },
        {
            headerName: "Variedad",
            field: "variedad",
            width: 150,
        },
        {
            headerName: "Sup. Sembrada(Ha)",
            field: "sembrada",
            width: 150,
            valueFormatter: this.formatterService.formatNumber,
        },
        {
            headerName: "Sup. Cosechada(Ha)",
            field: "cosechada",
            width: 150,
            valueFormatter: this.formatterService.formatNumber,
        },
        {
            headerName: "Produción(Ton)",
            field: "produccion",
            width: 150,
            valueFormatter: this.formatterService.formatNumber,
        },
        {
            headerName: "Rendimiento(Ton/Ha)",
            field: "rendimiento",
            width: 150,
            valueFormatter: this.formatterService.formatNumber,
        },
        {
            headerName: "PMR($/Ton)",
            field: "pmr",
            width: 150,
            valueFormatter: this.formatterService.formatNumber,
        },
        {
            headerName: "Valor(Miles de Pesos)",
            field: "valor",
            width: 150,
            valueFormatter: this.formatterService.formatNumberDivideThousands,
        }
    ];

    rowData;

    @ViewChild(DistritoComponent)
    appDistrito: DistritoComponent;

    @ViewChild(MunicipioComponent)
    appMunicipio: MunicipioComponent;

    @ViewChild(WindowComponent)
    appWindow: WindowComponent;

    constructor(
        private fb: FormBuilder,
        private consulta: ConsultaService,
        private extentService: EsriExtentService,
        private formatterService: FormatterService,
        private geometryService: GeometryService,
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
        })
    }

    onChangeEstadoItem(item) {
        if (item !== undefined) {
            this.appDistrito.fetch(item.id);
            console.log(item.id);
            if (item.id == 0) {
                this.extentService.fetchExtentAll();
            } else {
                this.extentService.fetchExtentEstado(item.id);
            }
            this.appWindow.handleClickMinimize(null);
        }
    }

    onChangeDistritoItem(item) {
        if (item !== undefined) {
            this.appMunicipio.fetch(this.form.get('estado').value, item.id);
            this.extentService.fetchExtentDistrito(item.id);
            this.appWindow.handleClickMinimize(null);
        }
    }

    onChangeMunicipioItem(item) {
        if (item !== undefined) {
            this.extentService.fetchExtentMunicipio(this.form.get('estado').value, item.id);
            this.appWindow.handleClickMinimize(null);
        }
    }

    onSubmitForm(event) {
        this.showTable = true;
        let catalogo = this.form.get('catalogo').value;

        this.consulta.getAnuario(this.form.value).subscribe(response => this.rowData = response);
    }

    onSelectionChanged(event) {
        let selectedRow = event.api.getSelectedRows();
        let anuario = this.form.value;
        anuario['cultivo'] = parseInt(selectedRow[selectedRow.length - 1].id);
        anuario['variedad'] = selectedRow[selectedRow.length - 1].idvariedad != undefined ? parseInt(selectedRow[selectedRow.length - 1].idvariedad) : 0;

        this.consulta.getEstados(anuario).subscribe((response: any) => {
            let obj = {
                regions: response,
                color: [0, 255, 0]
            }
            this.geometryService.cleanMap();
            this.geometryService.getGeometry(obj);
            this.appWindow.handleClickMinimize(null);
        });
    }

    onGridReady(event) {
        this.gridColumnApi = event.columnApi;
        this.gridColumnApi.setColumnVisible('variedad', false);
    }

    onSelectedChanged(event) {
        if (this.gridColumnApi != null && event === 'detalle') {
            this.gridColumnApi.setColumnVisible('variedad', true);
        } else if (this.gridColumnApi != null && event === 'generico') {
            this.gridColumnApi.setColumnVisible('variedad', false);
        }
    }
}
