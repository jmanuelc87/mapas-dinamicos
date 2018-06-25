import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DistritoComponent } from './distrito.component';
import { DistritoService } from '../../../services/distrito.service';
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

describe('DistritoComponent', () => {
    let component: DistritoComponent;
    let fixture: ComponentFixture<DistritoComponent>;
    let service: DistritoService;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DistritoComponent],
            imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
            providers: [DistritoService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DistritoComponent);
        service = TestBed.get(DistritoService);
        de = fixture.debugElement;
        component = fixture.componentInstance;
        component.group = new FormGroup({
            'distrito': new FormControl('0', Validators.required)
        });
        component.name = 'distrito';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default option', () => {
        let option = de.query(By.css('select[id=distritos] > option'));
        expect(option).toBeTruthy();
        expect(option.nativeElement.textContent).toContain('Todos');
        expect(option.nativeElement.value).toContain('0');
    });

    it('should show all elements in the markup', fakeAsync(() => {
        spyOn(service, 'getDistritoByEstado').and.returnValue(of([{ id: 1, name: 'Aguascalientes' }]));
        component.fetch(1);
        tick();
        fixture.detectChanges();
        let option = de.queryAll(By.css('select[id=distritos] > option'));
        expect(option.length).toBeGreaterThan(0);
        expect(option[0].nativeElement.textContent).toContain('Todos');
        expect(option[1].nativeElement.textContent).toContain('Aguascalientes');
    }));

    it('should emit change event on selection', fakeAsync(() => {
        spyOn(service, 'getDistritoByEstado').and.returnValue(of([{ id: 1, name: 'Aguascalientes' }]));
        component.fetch(1);
        tick();
        fixture.detectChanges();

        component.selected.subscribe(value => {
            expect(value).toEqual({ id: 1, name: 'Aguascalientes' });
        });

        let select = de.query(By.css('select[id=distritos]'));
        let option = de.queryAll(By.css('option'));

        select.triggerEventHandler('change', {
            target: option[1].nativeElement
        });
    }));
});
