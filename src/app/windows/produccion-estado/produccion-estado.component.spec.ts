import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionEstadoComponent } from './produccion-estado.component';
import { WindowComponent, EstadoComponent, FiltroEstadoComponent, CicloComponent, ModalidadComponent, CatalogoComponent, AnioComponent } from '../../components';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CultivoComponent } from '../../components/form/cultivo/cultivo.component';
import { ColorPickerComponent } from '../../components/color-picker/color-picker.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { query } from '@angular/core/src/render3/query';
import { By } from '@angular/platform-browser';
import { Estado } from '../../models/Estado';

describe('ProduccionEstadoComponent', () => {
    let component: ProduccionEstadoComponent;
    let fixture: ComponentFixture<ProduccionEstadoComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProduccionEstadoComponent, WindowComponent, EstadoComponent, FiltroEstadoComponent, CicloComponent, ModalidadComponent, CatalogoComponent, AnioComponent, CultivoComponent, ColorPickerComponent],
            imports: [ReactiveFormsModule, AgGridModule.withComponents([]), HttpClientModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProduccionEstadoComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change filtros on change estado', () => {
        component.onHandleSelectedEstado({ id: 1, name: 'Aguascalientes' });
        expect(component.appFiltroComponent.show).toBeTruthy();

        component.onHandleSelectedEstado({ id: 0, name: 'Resumen Nacional' });
        expect(component.appFiltroComponent.show).toBeFalsy();
    });

    it('should submit', () => {

    });

});
