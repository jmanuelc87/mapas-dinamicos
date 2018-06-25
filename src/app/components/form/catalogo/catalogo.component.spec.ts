import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CatalogoComponent } from './catalogo.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CatalogoComponent', () => {
    let component: CatalogoComponent;
    let fixture: ComponentFixture<CatalogoComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CatalogoComponent],
            imports: [ReactiveFormsModule],
            providers: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CatalogoComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        component.group = new FormGroup({
            'catalogo': new FormControl('generico', Validators.required)
        }, Validators.required)
        component.name = 'catalogo';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the value generico when clicked', () => {
        let content;
        const id = component.id;
        let label = de.query(By.css(`input[id=generico-${id}]`));

        expect(label).toBeTruthy();

        component.selected.subscribe(value => {
            content = value;
        });

        label.nativeElement.click();

        expect(content).toBe('generico');

    });

    it('should have the value detalle when clicked', () => {
        let content;
        const id = component.id;
        let label = de.query(By.css(`input[id=detalle-${id}]`));

        expect(label).toBeTruthy();

        component.selected.subscribe(value => content = value);

        label.nativeElement.click();

        expect(content).toBe('detalle');
    });
});
