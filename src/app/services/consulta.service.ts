import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import * as basepath from "./url";


@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    private url = basepath.default.baseUrl;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Obtiene las los cultivos con las siguietes variables:
     *  - Cultivo
     *  - Sup. Sembrada
     *  - Sup. Cosechada
     *  - Producción
     *  - Rendimiento
     *  - PMR (Precio medio rural)
     *  - Valor
     *
     * @param consulta ver la definicion en las pruebas
     * @returns ver la defincion en las pruebas
     */
    getAnuarioByCultivo(consulta) {

        consulta.estado = consulta.estado.id;
        consulta.distrito = consulta.distrito.id;
        consulta.municipio = consulta.municipio.id;

        console.log(consulta);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + '/consultas/prod-cultivo', JSON.stringify(consulta), {
            headers: headers
        });
    }

    /**
     * Obtiene los estados por cultivo especificio, ajustando el nivel de granularidad
     * por Estado / Distrito (DDR) / Municipio de acuerdo a los parametros seleccionados
     *
     * @param consulta ver la definicion en las pruebas
     * @returns ver la defincion de en las pruebas
     */
    getEstados(consulta) {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + '/consultas/estados', JSON.stringify(consulta), {
            headers: headers,
        });
    }


    /**
     * Obtiene los estados por cultivo especifico, ajustando el nivel de granularidad
     * por Estado / Distrito (DDR) / Municipio de acuerdo a los parametros seleccionados
     * con las variables:
     *  - Cultivo
     *  - Sup. Sembrada
     *  - Sup. Cosechada
     *  - Producción
     *  - Rendimiento
     *  - PMR (Precio medio rural)
     *  - Valor
     *
     * @param consulta ver la defincion en las pruebas
     * @returns ver la defincion en las pruebas
     */
    getAnuarioByEstado(consulta) {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + '/consultas/prod-estado', JSON.stringify(consulta), {
            headers: headers,
        });
    }
}
