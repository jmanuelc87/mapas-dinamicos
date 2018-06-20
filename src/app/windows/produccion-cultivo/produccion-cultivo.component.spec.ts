import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionCultivoComponent } from './produccion-cultivo.component';
import { WindowComponent, CicloComponent, ModalidadComponent, CatalogoComponent, AnioComponent, EstadoComponent, DistritoComponent, MunicipioComponent } from '../../components';
import { ColorPickerComponent } from '../../components/color-picker/color-picker.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

describe('ProduccionCultivoComponent', () => {
    let component: ProduccionCultivoComponent;
    let fixture: ComponentFixture<ProduccionCultivoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProduccionCultivoComponent, WindowComponent, CicloComponent, ModalidadComponent, CatalogoComponent, AnioComponent, EstadoComponent, DistritoComponent, MunicipioComponent, ColorPickerComponent],
            imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule, AgGridModule.withComponents([])]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProduccionCultivoComponent);
        component = fixture.componentInstance;

        component.form = new FormGroup({
            'ciclo': new FormControl('1', Validators.required),
            'modalidad': new FormControl('1', Validators.required),
            'catalogo': new FormControl('generico', Validators.required),
            'anio': new FormControl('2016', Validators.required),
            'estado': new FormControl(0, Validators.required),
            'distrito': new FormControl(0, Validators.required),
            'municipio': new FormControl(0, Validators.required),
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update distritos upon estado change selection', () => {
        component.onChangeEstadoItem({ id: 1, name: 'Aguascalientes' });
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            setTimeout(() => {
                let size = component.appDistrito.distritos.length;
                expect(size).toBe(2);
            }, 250);
        });
    });
});
