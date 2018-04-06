import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

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

@Injectable()
export class AnuarioAgricolaService {

  private url = '';

  constructor(
    private http: HttpClient
  ) { }


  public getAllYears(): Observable<{}> {
    return of(years);
  }

  public getAllStates(): Observable<{}> {
    return of(states);
  }

  public getDistrictByState(state: number): Observable<{}> {
    return of(districts);
  }

  public getMunicipioByDistrict(district: number): Observable<{}> {
    return of(municipios);
  }
}
