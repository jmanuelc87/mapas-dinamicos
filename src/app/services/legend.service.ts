import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LegendService {

    public legendRequest: Subject<any> = new Subject<any>();

    public removeLegendRequest: Subject<void> = new Subject<void>();

    private legend: any = {
        title: '',
        query: '',
        props: [],
    };

    constructor() { }

    public addTitle(title: string) {
        this.legend.title = title;
    }

    public addQuery(query: string) {
        this.legend.query = query;
    }

    public addProp(prop: string) {
        this.legend.props.push(prop);
    }

    addLegendConsultaCultivo(datosConsulta, estado, distrito, municipio) {
        this.legend = {
            title: '',
            query: '',
            props: [],
        };
        this.addTitle('Consulta anuario agrícola por cultivo');
        this.addQuery2(datosConsulta, estado, distrito, municipio);
        this.addProps(datosConsulta);
    }

    addQuery2(datosConsulta, estado, distrito, municipio) {
        if (datosConsulta.estado == 0) {
            this.addQuery('Resumen Nacional');
        } else {
            if (datosConsulta.distrito == 0) {
                this.addQuery('Estado: ' + estado.name);
            } else {
                if (datosConsulta.municipio == 0) {
                    this.addQuery('Distrito: ' + distrito.name);
                } else {
                    this.addQuery('Municipio: ' + municipio.name);
                }
            }
        }
    }

    addProps(datosConsulta) {
        for (let item in datosConsulta) {
            let label;
            switch (item) {
                case 'ciclo':
                    label = this.addPropCiclo(datosConsulta);
                    break;

                case 'modalidad':
                    label = this.addPropModalidad(datosConsulta);
                    break;

                case 'catalogo':
                    label = this.addPropCatalogo(datosConsulta);
                    break;
            }

            this.addProp(label);
        }
    }

    addPropCiclo(datosConsulta) {
        let ciclo = datosConsulta.ciclo;
        let label = 'Ciclo: ';
        switch (ciclo) {
            case '1':
                label += 'Otoño - Invierno';
                break;

            case '2':
                label += 'Primavera - Verano';
                break;

            case '3':
                label += 'Perennes';
                break;

            case '4':
                label += 'Año Agrícola (OI-PV)';
                break;

            case '5':
                label += 'Cíclos - Perennes';
                break;
        }

        label += ' ' + datosConsulta.anio;
        return label;
    }

    addPropModalidad(datosConsulta) {
        let modalidad = datosConsulta.modalidad;
        let label = 'Modalidad: ';
        switch (modalidad) {
            case '1':
                label += 'Riego';
                break;

            case '2':
                label += 'Temporal';
                break;

            case '3':
                label += 'Riego + Temporal';
                break;
        }
        return label;
    }

    addPropCatalogo(datosConsulta) {
        let catalogo = datosConsulta.catalogo;
        let label = 'Catálogo: ';

        if (catalogo == 'generico') {
            label += 'Genérico';
        } else {
            label += 'Detalle';
        }

        return label;
    }

    public addLegend() {
        this.legendRequest.next(this.legend);
        this.legend = {
            title: '',
            query: '',
            props: [],
        };
    }

    public removeLegend() {
        this.removeLegendRequest.next();
    }
}
