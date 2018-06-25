import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroEstadoComponent } from './filtro-estado.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

describe('FiltroEstadoComponent', () => {
    let component: FiltroEstadoComponent;
    let fixture: ComponentFixture<FiltroEstadoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FiltroEstadoComponent],
            imports: [ReactiveFormsModule],
            providers: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FiltroEstadoComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({
            'filtro-estado': new FormControl('estado', Validators.required),
        }, Validators.required);
        component.name = 'filtro-estado'
        component.show = false;
        fixture.detectChanges();
    });

    it('should create', () => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    });

    it('should show the respective inputs', () => {
        component.show = false;
        fixture.detectChanges();
        const id = component.id;
        const filtroElement: HTMLElement = fixture.nativeElement;

        let input = filtroElement.querySelector(`input[id=estado-${id}]`);
        expect(input).toBeTruthy();

        input = filtroElement.querySelector(`input[id=ddr-mun-${id}]`);
        expect(input).toBeTruthy();
    });

    it('should hide the respective inputs', () => {
        component.show = true;
        fixture.detectChanges();
        const id = component.id;
        const filtroElement: HTMLElement = fixture.nativeElement;

        let input = filtroElement.querySelector(`input[id=estado-${id}]`);
        expect(input).toBeFalsy();

        input = filtroElement.querySelector(`input[id=ddr-mun-${id}]`);
        expect(input).toBeFalsy();
    });
});
