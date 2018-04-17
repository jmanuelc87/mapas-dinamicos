import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { ClrDatagrid } from '@clr/angular';
import { Cultivo } from '../../dominio/cultivo';
import { PicoEvent } from 'picoevent';
import { Subscription } from 'rxjs/Subscription';
import { DatatableMensaje } from '../../dominio/datatable-mensaje';
import { WebmapMensaje } from '../../dominio/webmap-mensaje';
import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { isNull, isUndefined } from 'util';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    providers: [
        AnuarioAgricolaService
    ]
})
export class TableComponent implements OnInit, AfterViewInit {

    private show: boolean;

    private msg: DatatableMensaje = new DatatableMensaje();

    private selectedCultivo: Cultivo;

    @ViewChild(ClrDatagrid)
    private dataGridView: ClrDatagrid;

    private channels: Subscription[] = new Array<Subscription>();

    constructor(
        private pico: PicoEvent,
        private service: AnuarioAgricolaService
    ) { }

    ngOnInit() {
        this.channels.push(this.pico.listen({
            type: DatatableMensaje,
            targets: ['update-table']
        }, msg01 => this.setData(msg01)));
    }


    ngAfterViewInit() {
        this.dataGridView.singleSelectedChanged.subscribe(event => this.showDataInWebmap(event));
    }

    public setData(msg) {
        // manejar el procesamiento de la informacion del payload 'data'
        // guardar datos en servicio local
        this.msg = msg;
        this.show = true;
    }

    public showDataInWebmap(event) {
        if (!isNull(event)) {

            console.log(typeof (this.msg.consulta.municipio));
            console.log(this.msg.consulta.municipio);

            if (this.msg.consulta.municipio === '0') {
                this.service.getMunicipiosByAnuarioAndCultivo(this.msg.consulta, event).then(value => {

                    let estado = value.estado;
                    let mpios = value.municipios;

                    this.pico.publish(new WebmapMensaje(estado, mpios), ['show-query-map']);
                });
            }
        }
    }

}
