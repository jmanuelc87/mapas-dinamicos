import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { AnuarioAgricola } from '../../dominio/anuario-agricola';
import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { ClrDatagrid, ClrDatagridComparatorInterface } from '@clr/angular';
import { Cultivo } from '../../dominio/cultivo';
import { DialogService } from 'ng2-bootstrap-modal';
import { Estado } from '../../dominio/estado';
import { isNull, isUndefined } from 'util';
import { ModalComponent } from '../modal-color/modal.component';
import { ModalRangosComponent } from '../modal-rangos/modal-rangos.component';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { PicoEvent } from 'picoevent';
import { Subscription } from 'rxjs/Subscription';
import { Territorio } from '../../dominio/territorio';
import { TerritorioUtil } from '../../util/territorio-util';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';



@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    providers: [
        AnuarioAgricolaService
    ]
})
export class TableComponent implements OnInit, OnDestroy {

    private show: boolean;

    private modal: boolean;

    private color: Array<number> = [0, 100, 0];

    private msg: Map<string, any> = new Map();

    private disposable: Array<Subscription> = new Array<Subscription>();

    @ViewChild(ClrDatagrid)
    private dataGridView: ClrDatagrid;

    private channels: Subscription[] = new Array<Subscription>();

    constructor(
        private pico: PicoEvent,
        private service: AnuarioAgricolaService,
        private dialogService: DialogService,
    ) { }

    ngOnInit() {
        this.channels.push(this.pico.listen({
            type: Map,
            targets: ['update-table']
        }, msg01 => this.setData(msg01)));
    }

    ngOnDestroy(): void {
        for (let d of this.disposable) {
            d.unsubscribe();
        }
    }

    private setData(msg) {
        this.msg = msg;
        this.show = true;
    }

    private showDataInWebmap(item: any) {
        this.pico.publish(true, ['show-overlay']);


        let id = this.msg.get('id');

        // si estado es igual a cero
        // entonces mostrar los estado con el determinado cultivo
        if (id == 'produccion-cultivo') {

            let consulta = this.msg.get('anuario');
            let estado = consulta.estado;
            let ddr = consulta.distrito;
            let mun = consulta.municipio;

            if (estado == 0) {
                this.service.getEstadosByAnuarioAndCultivo(consulta, item).then(value => {

                    let map = new Map<string, any>();
                    map.set('anuario', consulta);
                    map.set('cultivo.id', item.idcultivo);
                    map.set('variedad.id', item.idvariedad);
                    map.set('estados', value);
                    map.set('color', this.color);

                    this.pico.publish(map, ['show-query-map-estados'])
                    this.show = false;
                }).catch(err => console.log(err));
            }

            if (estado != 0 && ddr == 0 && mun == 0) {
                this.service.getMunicipiosByAnuarioAndCultivo(consulta, item).then(value => {
                    let estado = value.territorio;
                    let mpios = value.municipios;

                    let map = new Map<string, any>();
                    map.set('anuario', consulta);
                    map.set('cultivo.id', item.idcultivo);
                    map.set('variedad.id', item.idvariedad);
                    map.set('estado.id', estado.id);
                    map.set('municipios', mpios);
                    map.set('color', this.color);

                    this.pico.publish(map, ['show-query-map-municipios']);
                    this.show = false;
                }).catch(err => console.log(err));
            }

            if (estado != 0 && ddr != 0 && mun == 0) {
                this.service.getMunicipiosByAnuarioAndCultivo(consulta, item).then(value => {
                    let estado = value.territorio;
                    let mpios = value.municipios;

                    let map = new Map<string, any>();
                    map.set('anuario', consulta);
                    map.set('cultivo.id', item.idcultivo);
                    map.set('variedad.id', item.idvariedad);
                    map.set('estado.id', estado.id);
                    map.set('municipios', mpios);
                    map.set('color', this.color);

                    this.pico.publish(map, ['show-query-map-municipios']);
                    this.show = false;
                });
            }
        }


        if (id == 'produccion-estado') {

            // do nothing...
        }
    }

    private showColorModal() {
        this.disposable.push(this.dialogService
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
            }));
    }

    private showRangosModal() {
        this.disposable.push(this.dialogService
            .addDialog(ModalRangosComponent, {
                data: this.msg.get('data'),
                fields: this.msg.get('fields'),
                color: this.color,
            })
            .subscribe(value => {
                if (value !== null && value !== undefined) {
                    let obj = JSON.parse(value);
                    let data = this.msg.get('data');

                    let classBreaks = TerritorioUtil.createClassBreaks(obj, data);

                    let filtroTerritorio = this.msg.get('filtro-territorio');

                    console.log('table-id', filtroTerritorio);

                    let map = new Map();
                    map.set('filtro-territorio', filtroTerritorio);
                    map.set('data', data);
                    map.set('classBreak', classBreaks);

                    this.pico.publish(map, ['show-query-ranges']);
                }
            }));
    }

    private isNumber(value) {
        return /[0-9]+/.test(value);
    }

}

class StringComparator implements ClrDatagridComparatorInterface<string> {

    compare(a: string, b: string): number {
        return a.localeCompare(b);
    }
}
