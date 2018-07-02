import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CultivoComponent } from './cultivo.component';
import { CultivoService } from '../../../services/cultivo.service';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';


describe('CultivoComponent', () => {
    let component: CultivoComponent;
    let fixture: ComponentFixture<CultivoComponent>;
    let service: CultivoService;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CultivoComponent],
            imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
            providers: [CultivoService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CultivoComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        service = TestBed.get(CultivoService);

        component.group = new FormGroup({
            'cultivo': new FormControl(0, Validators.required),
            'variedad': new FormControl(0, Validators.required),
        });

        component.nameFormCultivo = 'cultivo';
        component.nameFormVariedad = 'variedad';

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be disabled variedad when selected catalago generico', () => {
        component.catalogo = 'generico';
        fixture.detectChanges();
        let html = de.query(By.css('select[id=variedades]'));
        expect(html.nativeElement.disabled).toBeTruthy();
    });

    it('should be enabled variedad when selected catalago detalle', () => {
        component.catalogo = 'detalle';
        fixture.detectChanges();
        let html = de.query(By.css('select[id=variedades]'));
        expect(html.nativeElement.disabled).toBeFalsy();
    });

    fit('should have default option Resumen Cultivos', () => {
        let option = de.query(By.css('select[id=cultivos] > option'));
        expect(option).toBeTruthy();
        expect(option.nativeElement.textContent).toContain('Resumen Cultivos');
    });

    it('should show all cultivos in the markup', fakeAsync(() => {
        spyOn(service, 'getCultivos').and.returnValue(of([{ id: 0, nombre: 'Aguacate' }]));
        component.fetchCultivo('generico');
        tick();
        fixture.detectChanges();
        let option = de.queryAll(By.css('select[id=cultivos] > option'));
        expect(option).toBeTruthy();
        expect(option[0].nativeElement.textContent).toContain('Resumen Cultivos');
        expect(option[1].nativeElement.textContent).toContain('Aguacate');
    }));

    it('should show all variedades in the markup', fakeAsync(() => {
        spyOn(service, 'getVariedadesByCultivo').and.returnValue(of([{ id: 1, variedad: 'Negra' }, { id: 2, variedad: 'Manzanilla' }]));
        let option = de.queryAll(By.css('select[id=variedades] > option'));
        expect(option.length).toBe(1);
        component.fetchVariedad(1);
        tick();
        fixture.detectChanges();
        option = de.queryAll(By.css('select[id=variedades] > option'));
        expect(option.length).toBeGreaterThan(0);
        expect(option[0].nativeElement.textContent).toContain('Resumen Variedades');
        expect(option[1].nativeElement.textContent).toContain('Negra');
        expect(option[2].nativeElement.textContent).toContain('Manzanilla');
    }));
});
