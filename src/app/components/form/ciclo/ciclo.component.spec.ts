import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloComponent } from './ciclo.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CicloComponent', () => {
    let component: CicloComponent;
    let fixture: ComponentFixture<CicloComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CicloComponent],
            imports: [ReactiveFormsModule],
            providers: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CicloComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({
            'ciclo': new FormControl('', Validators.required)
        });
        component.name = 'ciclo';
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        })
    });


    it('should be oto-inv checked when clicked', () => {
        const id = component.id;
        let label = de.query(By.css(`input[id=oto-inv-${id}]`));
        expect(label).toBeTruthy();
        label.nativeElement.click();

        fixture.detectChanges();

        label = de.query(By.css(`input[id=oto-inv-${id}]`));
        expect(label.nativeElement.checked).toBeTruthy();
    });

    it('should be pri-ver checked when clicked', () => {
        const id = component.id;
        let label = de.query(By.css(`input[id=pri-ver-${id}]`));
        expect(label).toBeTruthy();
        label.nativeElement.click();

        fixture.detectChanges();

        label = de.query(By.css(`input[id=pri-ver-${id}]`));
        expect(label.nativeElement.checked).toBeTruthy();
    });

    it('should be perennes checked when clicked', () => {
        const id = component.id;
        let label = de.query(By.css(`input[id=perennes-${id}]`));
        expect(label).toBeTruthy();
        label.nativeElement.click();

        fixture.detectChanges();

        label = de.query(By.css(`input[id=perennes-${id}]`));
        expect(label.nativeElement.checked).toBeTruthy();
    });

    it('should be Año agricola checked when clicked', () => {
        const id = component.id;
        let label = de.query(By.css(`input[id=anio-agricola-${id}]`));
        expect(label).toBeTruthy();
        label.nativeElement.click();

        fixture.detectChanges();

        label = de.query(By.css(`input[id=anio-agricola-${id}]`));
        expect(label.nativeElement.checked).toBeTruthy();
    });

    it('should be Ciclos and Perennes checked when clicked', () => {
        const id = component.id;
        let label = de.query(By.css(`input[id=ciclos-perennes-${id}]`));
        expect(label).toBeTruthy();
        label.nativeElement.click();

        fixture.detectChanges();

        label = de.query(By.css(`input[id=ciclos-perennes-${id}]`));
        expect(label.nativeElement.checked).toBeTruthy();
    });
});
