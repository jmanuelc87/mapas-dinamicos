import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormatterService } from '../../services/formatter.service';

@Component({
    selector: 'app-produccion-estado',
    templateUrl: './produccion-estado.component.html',
    styleUrls: ['./produccion-estado.component.css']
})
export class ProduccionEstadoComponent implements OnInit {

    public windowRef: any;

    private form: FormGroup;

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
            headerName: "Sup. Siniestrada(Ha)",
            field: "siniestrada",
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
    ) { }

    ngOnInit() {

    }

    onHandleClose() {

    }

    onSubmitForm(event) {

    }

}
