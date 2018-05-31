import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-produccion-cultivo',
    templateUrl: './produccion-cultivo.component.html',
    styleUrls: ['./produccion-cultivo.component.css']
})
export class ProduccionCultivoComponent implements OnInit {

    componentRef: any;

    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            'ciclo': ['1', Validators.required],
            'modalidad': ['1', Validators.required],
            'catalogo': ['generico', Validators.required],
            'anio': ['2016', Validators.required],
            'estado': ['Resumen Nacional', Validators.required],
            'distrito': ['Todos', Validators.required],
            'municipio': ['Todos', Validators.required],
        });
    }

}
