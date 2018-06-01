import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistritoComponent, MunicipioComponent } from '../../components';

@Component({
    selector: 'app-produccion-cultivo',
    templateUrl: './produccion-cultivo.component.html',
    styleUrls: ['./produccion-cultivo.component.css']
})
export class ProduccionCultivoComponent implements OnInit {

    componentRef: any;

    form: FormGroup;

    @ViewChild(DistritoComponent)
    appDistrito: DistritoComponent;

    @ViewChild(MunicipioComponent)
    appMunicipio: MunicipioComponent;

    constructor(
        private fb: FormBuilder
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
        this.appDistrito.fetch(item.id);
    }

    onChangeDistritoItem(item) {
        this.appMunicipio.fetch(this.form.get('estado').value, item.id);
    }

    onSubmitForm(event) {
        console.log(this.form.value);
    }

}
