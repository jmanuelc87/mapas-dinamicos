import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Anuario } from '../dominio/anuario';
import { Territorio } from '../dominio/territorio';
import { Cultivo } from '../dominio/cultivo';

const years = [
    { year: 2016 },
    { year: 2015 },
    { year: 2014 },
    { year: 2013 },
    { year: 2012 }
];

const states = [
    { id: 0, name: 'Resumen Nacional' },
    { id: 1, name: 'Aguascalientes' },
    { id: 2, name: 'Baja California' },
    { id: 3, name: 'Baja California Sur' },
    { id: 4, name: 'Campeche' }
];

const districts = [
    { id: 0, name: 'Todos' },
    { id: 1, name: 'Aguascalientes' },
];

const municipios = [
    { id: 0, name: 'Todos' },
    { id: 1, name: 'Aguascalientes' },
    { id: 2, name: 'Asientos' },
    { id: 3, name: 'Calvillo' },
    { id: 4, name: 'Cosio' },
];

const cultivos = [
    { id: 0, name: 'Resumen Nacional', variedades: [] },
    { id: 1, name: 'Aceituna', variedades: [{ id: 1, nombre: 'manzanilla' }, { id: 2, nombre: 'negra' }] },
    { id: 2, name: 'Agave', variedades: [{ id: 1, nombre: 'tequilero' }, { id: 2, nombre: 'tequilero weber' }] },
    { id: 3, name: 'Aguacate', variedades: [{ id: 1, nombre: 'hass' }, { id: 2, nombre: 'organico' }, { id: 3, nombre: 'criollo' }] }
]

@Injectable()
export class AnuarioAgricolaService {

    private url = '';

    constructor(
        private http: HttpClient
    ) { }


    public getAllYears(): Observable<Array<Anuario>> {
        const all = years.map(item => {
            return new Anuario(item.year);
        });
        return of(all);
    }

    public getAllStates(): Observable<Array<Territorio>> {
        const all = states.map(item => {
            return new Territorio(item.id, item.name);
        });

        return of(all);
    }

    public getDistrictByState(state: number): Observable<Array<Territorio>> {
        const all = districts.map(item => {
            return new Territorio(item.id, item.name);
        });

        return of(all);
    }

    public getMunicipioByDistrict(district: number): Observable<Array<Territorio>> {
        const all = municipios.map(item => {
            return new Territorio(item.id, item.name);
        });

        return of(all);
    }

    public getAllCultivo(): Observable<Array<Cultivo>> {
        const all = cultivos.map(item => {
            return new Cultivo(item.id, item.name);
        });

        return of(all);
    }

    public getVariedadByCultivo(id: number): Observable<Cultivo> {
        let a = cultivos[id];
        return of(a);
    }
}
