import { Component, ViewChild } from '@angular/core';
import { DdrComponent } from './shared/components/ddr/ddr.component';
import { StatesComponent } from './shared/components/states/states.component';
import { MunicipioComponent } from './shared/components/municipio/municipio.component';
import { State } from './shared/models/states';
import { DistrictSandbox } from './shared/components/ddr/ddr.sandbox';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    @ViewChild(StatesComponent)
    selectEstado: StatesComponent;

    @ViewChild(DdrComponent)
    selectDistrict: DdrComponent;

    @ViewChild(MunicipioComponent)
    selectMunicipio: MunicipioComponent;

    constructor() { }

    handleSelect($event) {
        if ($event) {
            this.selectDistrict.clear();
            this.selectMunicipio.clear();
            this.selectDistrict.loadDistrictsByState($event.id);
        } else {
            this.selectDistrict.clear();
            this.selectMunicipio.clear();
        }
    }

    handleSelectDistricts($event) {
        if ($event) {
            this.selectMunicipio.clear();
            let estado: State = this.selectEstado.getSelectedItem();
            let distritoid = $event.id;
            this.selectMunicipio.loadMunicipiosByIds(estado.id, distritoid);
        } else {
            this.selectMunicipio.clear();
        }
    }

}
