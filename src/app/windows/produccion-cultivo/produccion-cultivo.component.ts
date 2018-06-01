import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistritoComponent, MunicipioComponent } from '../../components';
import { ConsultaService } from '../../services/consulta.service';

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

    columnDefs = [
        {
            headerName: "Cultivo",
            field: "cultivo",
            width: 100,
        },
        {
            headerName: "Variedad",
            field: "variedad",
            width: 100,
        },
        {
            headerName: "Sup. Sembrada",
            field: "sembrada",
            width: 100,
        },
        {
            headerName: "Sup. Cosechada",
            field: "cosechada",
            width: 100,
        },
        {
            headerName: "Produción",
            field: "produccion",
            width: 100,
        },
        {
            headerName: "Rendimiento",
            field: "rendimiento",
            width: 100,
        },
        {
            headerName: "PMR",
            field: "pmr",
            width: 100,
        },
        {
            headerName: "Valor",
            field: "valor",
            width: 100,
        }
    ];

    rowData;

    @ViewChild(DistritoComponent)
    appDistrito: DistritoComponent;

    @ViewChild(MunicipioComponent)
    appMunicipio: MunicipioComponent;

    constructor(
        private fb: FormBuilder,
        private consulta: ConsultaService,
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
    }

    onChangeEstadoItem(item) {
        if (item !== undefined) {
            this.appDistrito.fetch(item.id);
        }
    }

    onChangeDistritoItem(item) {
        if (item !== undefined) {
            this.appMunicipio.fetch(this.form.get('estado').value, item.id);
        }
    }

    onSubmitForm(event) {
        this.showTable = true;
        let catalogo = this.form.get('catalogo').value;

        this.consulta.getAnuario(this.form.value).subscribe(response => this.rowData = response);
    }

    onSelectionChanged(event) {
        let selectedRow = event.api.getSelectedRows();
    }

    onGridReady(event) {
        this.gridColumnApi = event.columnApi;
        this.gridColumnApi.setColumnVisible('variedad', false);
    }

    onSelectedChanged(event) {
        if (this.gridColumnApi != null && event === 'detalle') {
            console.log('show column variedad');
            this.gridColumnApi.setColumnVisible('variedad', true);
        } else if (this.gridColumnApi != null && event === 'generico') {
            console.log('hide column variedad');
            this.gridColumnApi.setColumnVisible('variedad', false);
        }
    }
}
