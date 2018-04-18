import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { ClrDatagrid } from '@clr/angular';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { Cultivo } from '../../dominio/cultivo';
import { DatatableMensaje } from '../../dominio/datatable-mensaje';
import { DialogService } from 'ng2-bootstrap-modal';
import { isNull, isUndefined } from 'util';
import { ModalComponent } from '../modal/modal.component';
import { PicoEvent } from 'picoevent';
import { Subscription } from 'rxjs/Subscription';
import { Territorio } from '../../dominio/territorio';
import { WebmapMensaje } from '../../dominio/webmap-mensaje';

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

    private modal: boolean;

    private color: Array<number>;

    private msg: DatatableMensaje = new DatatableMensaje();

    @ViewChild(ClrDatagrid)
    private dataGridView: ClrDatagrid;

    private channels: Subscription[] = new Array<Subscription>();

    constructor(
        private pico: PicoEvent,
        private service: AnuarioAgricolaService,
        private dialogService: DialogService
    ) { }

    ngOnInit() {
        this.channels.push(this.pico.listen({
            type: DatatableMensaje,
            targets: ['update-table']
        }, msg01 => this.setData(msg01)));
    }

    public setData(msg) {
        this.msg = msg;
        this.show = true;
    }

    public showDataInWebmap(cultivo) {
        let estado = this.msg.consulta.estado;
        let ddr = this.msg.consulta.distrito;
        let mun = this.msg.consulta.municipio;

        if (estado == 0) {
            this.service.getEstadosByAnuariondCultivo(this.msg.consulta, cultivo).then(value => {
                this.pico.publish(new WebmapMensaje(value, null, isUndefined(this.color) ? [0, 100, 0] : this.color), ['show-query-map-estados'])
            });
        }

        if (estado != 0 && mun == 0) {
            this.service.getMunicipiosByAnuarioAndCultivo(this.msg.consulta, cultivo).then(value => {

                let estado = value.territorio;
                let mpios = value.municipios;

                this.pico.publish(new WebmapMensaje([estado], mpios, isUndefined(this.color) ? [0, 100, 0] : this.color), ['show-query-map-municipios']);
            });
        }
    }

    private showColorModal() {
        let disposable = this.dialogService
            .addDialog(ModalComponent, {})
            .subscribe(value => {
                let r = value.substr(0, 2);
                let g = value.substr(2, 2);
                let b = value.substr(4, 2);

                let rgb = [];

                rgb.push(Number.parseInt(r, 16))
                rgb.push(Number.parseInt(g, 16))
                rgb.push(Number.parseInt(b, 16))

                this.color = rgb;
            });
    }

}