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
            'filtro': new FormControl('')
        }, Validators.required);
        component.name = 'filtro'
        component.show = false;
        fixture.detectChanges();
    });

    it('should create', () => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    });

    it('should hide or show the respective inputs', (done) => {
        fixture.whenRenderingDone().then(() => {
            const id = component.id;
            const filtroElement: HTMLElement = fixture.nativeElement;

            let input = filtroElement.querySelector(`input[id=${id}]`);
            expect(input).not.toBe(jasmine.any(null));
            expect(input).not.toBe(jasmine.any(undefined));

            done();
        });
    });
});
