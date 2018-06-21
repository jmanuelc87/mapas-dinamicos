import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormatterService } from '../../services/formatter.service';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-produccion-estado',
    templateUrl: './produccion-estado.component.html',
    styleUrls: ['./produccion-estado.component.css']
})
export class ProduccionEstadoComponent implements OnInit {

    public windowRef: any;

    private catalogo: string = 'generico';

    private form: FormGroup;

    private rowData = [];

    private columnDefs = [
        {
            headerName: "Estado",
            field: "estado",
            width: 100,
        },
        {
            headerName: "Distrito",
            field: "distrito",
            width: 100,
        },
        {
            headerName: "Municipio",
            field: "municipio",
            width: 100,
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

    constructor(
        private formatterService: FormatterService,
        private fb: FormBuilder,
        private consultaService: ConsultaService,
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            'ciclo': ['1', Validators.required],
            'modalidad': ['1', Validators.required],
            'catalogo': ['generico', Validators.required],
            'anio': ['2016', Validators.required],
            'estado': [0, Validators.required],
            'cultivo': [0, Validators.required],
            'variedad': [0, Validators.required],
            'filtro-estado': ['estado', Validators.required],
        });
    }

    onHandleClose() {
        // Eliminar leyenda del mapa
    }

    onSelectedChanged(event) {
        this.catalogo = event;
    }

    onSubmitForm(event) {
        this.rowData = [];
        let datosConsulta = this.form.value;

        this.consultaService
            .getAnuarioByEstado(datosConsulta)
            .subscribe((response: any) => this.rowData = response);
    }

}
