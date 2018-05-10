import { Anuario } from '../dominio/anuario';
import { AnuarioAgricola } from '../dominio/anuario-agricola';
import { Cultivo } from '../dominio/cultivo';
import { Ddr } from '../dominio/ddr';
import { Estadistica } from '../dominio/estadistica';
import { Estado } from '../dominio/estado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Municipio } from '../dominio/municipio';
import { reject } from 'q';
import { RequestOptionsArgs } from '@angular/http';
import { Territorio } from '../dominio/territorio';
import { Variedad } from '../dominio/variedad';
import 'rxjs/Rx';

@Injectable()
export class AnuarioAgricolaService {

    private url = 'http://localhost:8080/backend';

    constructor(
        private http: HttpClient
    ) { }


    public getAllYears(): Promise<Array<Anuario>> {
        return new Promise((resolve, reject) => {
            let path = `${this.url}/catalogo/years`;

            this.http.get<Anuario[]>(path).subscribe(response => {
                resolve(response);
            })
        });
    }

    public getAllStates(): Promise<Array<Territorio>> {
        let promise = new Promise<Estado[]>((resolve, reject) => {
            let path = `${this.url}/catalogo/estados`;

            this.http.get<Estado[]>(path).subscribe(response => {
                resolve(response);
            });
        });

        return promise;
    }

    public getDistrictByState(state: number): Promise<Array<Territorio>> {
        return new Promise((resolve, reject) => {
            let path = `${this.url}/catalogo/distritos/${state}`;

            this.http.get<Ddr[]>(path).subscribe(response => {
                resolve(response);
            });
        });
    }

    public getMunicipioByDistrict(district: number): Promise<Array<Territorio>> {
        return new Promise((resolve, reject) => {
            let path = `${this.url}/catalogo/municipios/${district}`;

            this.http.get<Ddr[]>(path).subscribe(response => {
                resolve(response);
            });
        });
    }

    public getAllCultivo(catalogo: string): Promise<Array<Cultivo>> {
        return new Promise((resolve, reject) => {
            let path = `${this.url}/catalogo/cultivos/${catalogo}`;

            this.http.get<Cultivo[]>(path).subscribe(response => {
                resolve(response);
            });
        });
    }

    public getVariedadByCultivo(id: number): Promise<Array<Variedad>> {
        return new Promise((resolve, reject) => {
            let path = `${this.url}/catalogo/variedades/${id}`;

            this.http.get<Ddr[]>(path).subscribe(response => {
                resolve(response);
            });
        });
    }

    public consultaAnuarioPorCultivo(anuario: AnuarioAgricola): Promise<Cultivo[]> {
        return new Promise((resolve, reject) => {
            let path = `${this.url}/consultas/prod-cultivo`;
            let params = `anuario=${JSON.stringify(anuario)}`;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

            this.http.post<Cultivo[]>(path, params, { headers: headers }).subscribe(response => {
                resolve(response);
            });
        });
    }

    public getMunicipiosByAnuarioAndCultivo(anuario: AnuarioAgricola, cultivo: Cultivo): Promise<any> {
        return new Promise((resolve, reject) => {
            let path = `${this.url}/consultas/municipios-anuario-cultivo`;
            let params = `anuario=${JSON.stringify(anuario)}`;
            params += `&cultivo=${JSON.stringify(cultivo)}`;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');


            this.http.post<any>(path, params, { headers: headers }).subscribe(response => {

                console.log(response);

                let estado = new Estado(response[0].estado);

                let municipios = response.map(item => {
                    return new Municipio(item.id, item.municipio);
                });

                let obj = {
                    territorio: estado,
                    municipios: municipios
                };

                resolve(obj);
            });
        });
    }

    public getEstadosByAnuarioAndCultivo(anuario: AnuarioAgricola, cultivo: Cultivo): Promise<Estado[]> {

        return new Promise((resolve, reject) => {
            let path = `${this.url}/consultas/estados-anuario-cultivo`;
            let params = `anuario=${JSON.stringify(anuario)}`;
            params += `&cultivo=${JSON.stringify(cultivo)}`;

            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

            this.http.post<any>(path, params, { headers: headers }).subscribe(response => {
                let estados = response.map(item => {
                    return new Estado(item.id, item.nombre);
                });

                resolve(estados);
            });
        });
    }

    public getEstadisticaByEstado(year, ciclo, moda, estado, cultivo, variedad, catalogo): Promise<Estadistica> {
        return new Promise<Estadistica>((resolve, reject) => {
            let path = `${this.url}/consultas/estadistica-estado`;
            let params = `year=${year}`;
            params += `&ciclo=${ciclo}`;
            params += `&moda=${moda}`;
            params += `&estado=${estado}`;
            params += `&cultivo=${cultivo}`;
            params += `&variedad=${variedad}`;
            params += `&catalogo=${catalogo}`;

            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

            this.http.post<Estadistica>(path, params, { headers: headers })
                .subscribe(response => {

                    console.log(response);


                    resolve(response);
                }, error => {
                    reject(error);
                });
        });
    }

    public getEstadisticaByMunicipio(year, ciclo, moda, estado, municipio, cultivo, variedad, catalogo): Promise<Estadistica> {
        return new Promise<Estadistica>((resolve, reject) => {
            let path = `${this.url}/consultas/estadistica-municipio`;
            let params = `year=${year}`;
            params += `&ciclo=${ciclo}`;
            params += `&moda=${moda}`;
            params += `&estado=${estado}`;
            params += `&municipio=${municipio}`;
            params += `&cultivo=${cultivo}`;
            params += `&variedad=${variedad}`;
            params += `&catalogo=${catalogo}`;

            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

            this.http.post<Estadistica>(path, params, { headers: headers })
                .subscribe(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                });
        });
    }


    public consultaProduccionPorEstado(year, ciclo, modalidad, catalogo, cultivo, variedad, estado, filtroTerritorio, distrito) {
        let path = `${this.url}/consultas/estados`;

        let params = `year=${year}`;
        params += `&ciclo=${ciclo}`;
        params += `&modalidad=${modalidad}`;
        params += `&estado=${estado}`;
        params += `&cultivo=${cultivo}`;
        params += `&variedad=${variedad}`;
        params += `&catalogo=${catalogo}`;
        params += `&filtroTerritorio=${filtroTerritorio}`;
        params += `&distrito=${distrito}`;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(path, params, { headers: headers })
                .subscribe(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                });
        });
    }

}
