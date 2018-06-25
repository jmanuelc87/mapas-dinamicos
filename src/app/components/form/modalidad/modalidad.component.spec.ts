import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadComponent } from './modalidad.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ModalidadComponent', () => {
    let component: ModalidadComponent;
    let fixture: ComponentFixture<ModalidadComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalidadComponent],
            imports: [ReactiveFormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalidadComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        component.group = new FormGroup({
            'modalidad': new FormControl('', Validators.required)
        })
        component.name = 'modalidad'
        fixture.detectChanges();
    });

    it('should create', () => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        })
    });

    it('should be riego checked when clicked', () => {
        const id = component.id;
        let label = de.query(By.css(`input[id=riego-${id}]`));
        expect(label).toBeTruthy();
        label.nativeElement.click();

        fixture.detectChanges();

        label = de.query(By.css(`input[id=riego-${id}]`));
        expect(label.nativeElement.checked).toBeTruthy();
    });

    it('should be temporal checked when clicked', () => {
        const id = component.id;
        let label = de.query(By.css(`input[id=temporal-${id}]`));
        expect(label).toBeTruthy();
        label.nativeElement.click();

        fixture.detectChanges();

        label = de.query(By.css(`input[id=temporal-${id}]`));
        expect(label.nativeElement.checked).toBeTruthy();
    });

    it('should be riego-temporal checked when clicked', () => {
        const id = component.id;
        let label = de.query(By.css(`input[id=riego-temporal-${id}]`));
        expect(label).toBeTruthy();
        label.nativeElement.click();

        fixture.detectChanges();

        label = de.query(By.css(`input[id=riego-temporal-${id}]`));
        expect(label.nativeElement.checked).toBeTruthy();
    });

});
