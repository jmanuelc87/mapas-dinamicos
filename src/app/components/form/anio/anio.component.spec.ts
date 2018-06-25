import { AnioComponent } from './anio.component';
import { AnioService } from '../../../services/anio.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AnioComponent', () => {
    let component: AnioComponent;
    let fixture: ComponentFixture<AnioComponent>;
    let service: AnioService;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnioComponent],
            imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
            providers: [AnioService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnioComponent);

        service = TestBed.get(AnioService);

        component = fixture.componentInstance;
        component.group = new FormGroup({
            'anio': new FormControl('', Validators.required)
        })
        component.name = 'anio'
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the years from the service', fakeAsync(() => {
        spyOn(service, 'getAllAnios').and.returnValue(of([{ anio: 2016 }]));
        let span = de.query(By.css('option'));
        expect(span).toBeNull();
        component.fetch();
        tick();
        fixture.detectChanges();
        span = de.query(By.css('option'));
        expect(span).toBeTruthy();
        expect(span.nativeElement.textContent).toContain('2016');
    }));

});
