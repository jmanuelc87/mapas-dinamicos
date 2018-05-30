import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoComponent } from './estado.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { EstadoService } from '../../../services/estado.service';

describe('EstadoComponent', () => {
    let component: EstadoComponent;
    let fixture: ComponentFixture<EstadoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EstadoComponent],
            imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
            providers: [EstadoService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EstadoComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({
            'estado': new FormControl('', Validators.required)
        })
        component.name = 'estado';
        fixture.detectChanges();
    });

    it('should create', () => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    });

    xit('should fetch states from network', (done) => {
        fixture.whenStable().then(() => {
            expect(component.estados.length).toBe(33);
        });
    });

    it('should have default state', () => {
        fixture.whenStable().then(() => {
            expect(component.estados[0].id).toBe(0);
            expect(component.estados[0].name).toBe('Resumen Nacional');
        });
    });

    it('should emit selected event', (done) => {
        fixture.whenStable().then(() => {
            const event = component.estados[0];
            component.selected.subscribe(data => {
                expect(data).toBe(event);
                done();
            });
            component.onChange(event);
        })
    });
});
