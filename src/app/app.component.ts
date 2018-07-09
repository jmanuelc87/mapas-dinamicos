import { Component, ViewChild } from '@angular/core';
import { DdrComponent } from './shared/components/ddr/ddr.component';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @ViewChild(DdrComponent)
    selectDistrict: DdrComponent;

    handleSelect($event) {
        this.selectDistrict.selectItem(0);
        this.selectDistrict.loadDistrictsByState($event.id);
    }

}
