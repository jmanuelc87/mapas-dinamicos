import { Component, OnInit } from '@angular/core';
import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { ProduccionCultivo } from '../../dominio/ProduccionCultivo';

@Component({
    selector: 'app-consulta-cultivo',
    templateUrl: './consulta-cultivo.component.html',
    styleUrls: ['./consulta-cultivo.component.css'],
    providers: [
        AnuarioAgricolaService
    ]
})
export class ConsultaCultivoComponent implements OnInit {

    private years: {};

    private states: {};

    private districts: {};

    private municipio: {};

    private disabled = true;

    private prodCultivo: ProduccionCultivo;

    private showOverlay: boolean;

    constructor(
        private service: AnuarioAgricolaService
    ) { }

    ngOnInit() {
        this.getAllYears();
        this.getAllStates();
        this.prodCultivo = new ProduccionCultivo('all', 'all', 'generico', '2016', 0, 0, 0);
    }

    private getAllYears(): void {
        this.service.getAllYears().subscribe(years => this.years = years);
    }

    private getAllStates(): void {
        this.service.getAllStates().subscribe(states => this.states = states);
    }

    private stateChanged() {
        this.service.getDistrictByState(this.prodCultivo.state).subscribe(districts => this.districts = districts);
    }

    private districtChanged() {
        this.service.getMunicipioByDistrict(this.prodCultivo.district).subscribe(municipio => this.municipio = municipio);
    }

    /**
     * Terminar el submit al servicio web
     */
    private onFormSubmit(event) {
        this.toggle();
        setTimeout(() => {
            this.toggle();
        }, 7000);
    }

    private toggle() {
        this.showOverlay = !this.showOverlay;
    }

}
