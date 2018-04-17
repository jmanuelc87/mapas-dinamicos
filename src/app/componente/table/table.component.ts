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
import { Territorio } from '../../dominio/territorio';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    providers: [
        AnuarioAgricolaService
    ]
})
export class TableComponent implements OnInit {

    private show: boolean;

    private msg: DatatableMensaje = new DatatableMensaje();

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

    public setData(msg) {
        // manejar el procesamiento de la informacion del payload 'data'
        // guardar datos en servicio local
        this.msg = msg;
        this.show = true;
    }

    public showDataInWebmap(cultivo) {

        console.log(cultivo);

        console.log(typeof (this.msg.consulta.estado));
        console.log(this.msg.consulta.estado);

        if (this.msg.consulta.estado === 0) {
            console.log('consulta estado x resumen nacional');
            this.service.getEstadosByAnuariondCultivo(this.msg.consulta, cultivo).then(value => {
                this.pico.publish(new WebmapMensaje(value, null, 'green'), ['show-query-map-estados'])
            });
        }

        if (this.msg.consulta.estado !== '0' && this.msg.consulta.municipio === '0') {
            this.service.getMunicipiosByAnuarioAndCultivo(this.msg.consulta, cultivo).then(value => {

                let estado = value.territorio;
                let mpios = value.municipios;

                this.pico.publish(new WebmapMensaje([estado], mpios, 'green'), ['show-query-map-municipios']);
            });
        }
    }

    private showModal() {
        this.pico.publish(false, ['show-modal']);
    }
}
