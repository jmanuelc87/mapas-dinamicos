import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdrComponent } from './ddr.component';

describe('DdrComponent', () => {
    let component: DdrComponent;
    let fixture: ComponentFixture<DdrComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DdrComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DdrComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
