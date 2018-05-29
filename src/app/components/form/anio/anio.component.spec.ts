import { AnioComponent } from './anio.component';
import { AnioService } from '../../../services/anio.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { Estado } from '../../../models/Estado';
import { Anio } from '../../../models/Anio';

describe('AnioComponent', () => {
    let component: AnioComponent;
    let fixture: ComponentFixture<AnioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnioComponent],
            imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
            providers: [AnioService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnioComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({
            'anio': new FormControl('', Validators.required)
        })
        component.name = 'anio'
        fixture.detectChanges();
    });

    it('should create', async(() => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        })
    }));

    it('should fetch all year from network', (done) => {
        fixture.whenStable().then(() => {
            expect(component.anios.length).toBeGreaterThan(0);
        });
    })
});
