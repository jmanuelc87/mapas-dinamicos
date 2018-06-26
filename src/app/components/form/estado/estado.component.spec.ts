import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EstadoComponent } from './estado.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { EstadoService } from '../../../services/estado.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('EstadoComponent', () => {
    let component: EstadoComponent;
    let fixture: ComponentFixture<EstadoComponent>;
    let de: DebugElement;
    let service: EstadoService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EstadoComponent],
            imports: [FormsModule, ReactiveFormsModule, NgSelectModule, HttpClientModule],
            providers: [EstadoService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EstadoComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        service = TestBed.get(EstadoService);

        component.group = new FormGroup({
            'estado': new FormControl({ id: 0 }, Validators.required)
        });
        component.name = 'estado';

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default option', () => {
        let option = de.query(By.css('select[id=estados] > option'));
        expect(option).toBeTruthy();
        expect(option.nativeElement.selected).toBeTruthy();
        expect(option.nativeElement.textContent).toContain('Resumen Nacional');
        expect(option.nativeElement.value).toContain('0');
    });

    it('should show all elements in the markup', fakeAsync(() => {
        spyOn(service, 'getAllEstados').and.returnValue(of([{ id: 0, name: 'Resumen Nacional' }, { id: 1, name: 'Aguascalientes' }]));
        component.fetch();
        tick();
        fixture.detectChanges();
        let option = de.queryAll(By.css('select[id=estados] > option'));
        expect(option.length).toBeGreaterThan(0);
        expect(option[0].nativeElement.textContent).toContain('Resumen Nacional');
        expect(option[1].nativeElement.textContent).toContain('Aguascalientes');
    }));

    it('should emit change event on selection', fakeAsync(() => {
        spyOn(service, 'getAllEstados').and.returnValue(of([{ id: 1, name: 'Aguascalientes' }]));
        component.fetch();
        tick();
        fixture.detectChanges();

        component.selected.subscribe(value => {
            expect(value).toEqual({ id: 1, name: 'Aguascalientes' });
        });

        let select = de.query(By.css('select[id=estados]'));

        select.triggerEventHandler('change', select);
    }));

});
