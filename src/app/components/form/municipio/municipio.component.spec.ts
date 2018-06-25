import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MunicipioComponent } from './municipio.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { MunicipioService } from '../../../services/municipio.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('MunicipioComponent', () => {
    let component: MunicipioComponent;
    let fixture: ComponentFixture<MunicipioComponent>;
    let de: DebugElement;
    let service: MunicipioService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MunicipioComponent],
            imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
            providers: [MunicipioService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MunicipioComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        service = TestBed.get(MunicipioService);
        component.group = new FormGroup({
            'municipio': new FormControl('0', Validators.required)
        });
        component.name = 'municipio'
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default value', () => {
        let option = de.query(By.css('select[id=municipios] > option'));
        expect(option).toBeTruthy();
        expect(option.nativeElement.selected).toBeTruthy();
        expect(option.nativeElement.textContent).toContain('Todos');
        expect(option.nativeElement.value).toContain('0');
    });

    it('should show all elements in the markup', fakeAsync(() => {
        spyOn(service, 'getMunicipioByEstadoAndDistrito').and.returnValue(of([{ id: 1, name: 'Aguascalientes' }]));
        component.fetch(1, 1);
        tick();
        fixture.detectChanges();
        let option = de.queryAll(By.css('select[id=municipios] > option'));
        expect(option.length).toBeGreaterThan(0);
        expect(option[0].nativeElement.textContent).toContain('Todos');
        expect(option[1].nativeElement.textContent).toContain('Aguascalientes');
    }));
});
