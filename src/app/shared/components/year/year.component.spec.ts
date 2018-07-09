import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearComponent } from './year.component';

describe('YearComponent', () => {
    let component: YearComponent;
    let fixture: ComponentFixture<YearComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YearComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YearComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
