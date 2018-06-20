import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CultivoComponent } from './cultivo.component';
import { CultivoService } from '../../../services/cultivo.service';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';


describe('CultivoComponent', () => {
    let component: CultivoComponent;
    let fixture: ComponentFixture<CultivoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CultivoComponent],
            imports: [ReactiveFormsModule, NgSelectModule, HttpClientModule],
            providers: [CultivoService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CultivoComponent);
        component = fixture.componentInstance;

        component.group = new FormGroup({
            'cultivo': new FormControl(0, Validators.required),
            'variedad': new FormControl(0, Validators.required),
        });

        component.nameFormCultivo = 'cultivo';
        component.nameFormVariedad = 'variedad';

        fixture.detectChanges();
    });

    it('should create', () => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    });

    it('should fetch cultivos from network', () => {
        component.fetchCultivo('generico');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.cultivos.length).toBe(461);
        });

        component.fetchCultivo('detalle');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.cultivos.length).toBe(493);
        });
    });
});
