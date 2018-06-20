import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionEstadoComponent } from './produccion-estado.component';
import { WindowComponent } from '../../components';

describe('ProduccionEstadoComponent', () => {
    let component: ProduccionEstadoComponent;
    let fixture: ComponentFixture<ProduccionEstadoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProduccionEstadoComponent, WindowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProduccionEstadoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
