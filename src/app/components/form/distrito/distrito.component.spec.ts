import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('DistritoComponent', () => {
    let component: DistritoComponent;
    let fixture: ComponentFixture<DistritoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DistritoComponent],
            imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
            providers: [DistritoService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DistritoComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({
            'distrito': new FormControl('', Validators.required)
        })
        component.name = 'distrito'
        component.fetch(1);
        fixture.detectChanges();
    });

    it('should create', () => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        })
    });

    xit('should fetch states from network', (done) => {
        fixture.whenStable().then(() => {
            expect(component.distritos.length).toBe(2);
            done();
        });
    });

    it('should have default state', (done) => {
        fixture.whenStable().then(() => {
            expect(component.distritos[0].id).toBe(0);
            expect(component.distritos[0].name).toBe('Todos');
            done();
        });
    });

    it('should emit selected event', done => {
        fixture.whenStable().then(() => {
            const event = component.distritos[0];
            component.selected.subscribe(data => {
                expect(data).toBe(event);
                done();
            });
            component.onChange(event);
        })
    });
});
