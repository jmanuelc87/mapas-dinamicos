import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { AnuarioAgricolaService } from '../../servicio/anuario-agricola.service';
import { ClrDatagrid, ClrDatagridComparatorInterface } from '@clr/angular';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { Cultivo } from '../../dominio/cultivo';
import { DialogService } from 'ng2-bootstrap-modal';
import { Estado } from '../../dominio/estado';
import { isNull, isUndefined } from 'util';
import { ModalComponent } from '../modal-color/modal.component';
import { PicoEvent } from 'picoevent';
import { Subscription } from 'rxjs/Subscription';
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

    private modal: boolean;

    private color: Array<number> = [0, 100, 0];

    private msg: Map<string, any> = new Map();

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

    private setData(msg) {
        this.msg = msg;
        this.show = true;
    }

    private showDataInWebmap(cultivo: Cultivo) {
        this.pico.publish(true, ['show-overlay']);

        let consulta = this.msg.get('anuario');
        let estado = consulta.estado;
        let ddr = consulta.distrito;
        let mun = consulta.municipio;

        // si estado es igual a cero
        // entonces mostrar los estado con el determinado cultivo
        if (estado == 0) {
            this.service.getEstadosByAnuarioAndCultivo(consulta, cultivo).then(value => {

                let map = new Map<string, any>();
                map.set('anuario', consulta);
                map.set('cultivo.id', cultivo.idcultivo);
                map.set('variedad.id', cultivo.idvariedad);
                map.set('estados', value);
                map.set('color', this.color);


                console.log('showDataInWebmap', map);

                this.pico.publish(map, ['show-query-map-estados'])
                this.show = false;
            }).catch(err => console.log(err));
        }

        // TODO: Seleccionar cuando los municipios estan dentro de un distrito y cuando estan dentro del estado

        // si estado esta seleccionado con una entidad y municipios todos
        // buscar todos los municipios dentro del estado
        if (estado != 0 && ddr == 0 && mun == 0) {
            this.service.getMunicipiosByAnuarioAndCultivo(consulta, cultivo).then(value => {
                let estado = value.territorio;
                let mpios = value.municipios;

                let map = new Map<string, any>();
                map.set('anuario', consulta);
                map.set('cultivo.id', cultivo.idcultivo);
                map.set('variedad.id', cultivo.idvariedad);
                map.set('estado.id', estado.id);
                map.set('municipios', mpios);
                map.set('color', this.color);



                this.pico.publish(map, ['show-query-map-municipios']);
                this.show = false;
            }).catch(err => console.log(err));
        }


        // si estado esta seleccionado con una entidad y hay algún distrito especifico seleccionado
        // buscar todos los municipios dentro del distrito
        if (estado != 0 && ddr != 0 && mun == 0) {
            this.service.getMunicipiosByAnuarioAndCultivo(consulta, cultivo).then(value => {
                let estado = value.territorio;
                let mpios = value.municipios;

                let map = new Map<string, any>();
                map.set('anuario', consulta);
                map.set('cultivo.id', cultivo.idcultivo);
                map.set('variedad.id', cultivo.idvariedad);
                map.set('estado.id', estado.id);
                map.set('municipios', mpios);
                map.set('color', this.color);

                console.log(map);

                this.pico.publish(map, ['show-query-map-municipios']);
                this.show = false;
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

    private isString(value) {
        return typeof (value) === 'string';
    }

    private isNumber(value) {
        return typeof (value) === 'number';
    }

}


class StringComparator implements ClrDatagridComparatorInterface<string> {

    compare(a: string, b: string): number {
        return a.localeCompare(b);
    }
}
