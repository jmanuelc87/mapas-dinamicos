import { Anio } from '../models/Anio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as basepath from "./url";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnioService {

  private url = basepath.default.baseUrl + '/catalogo/years';

  constructor(
    private http: HttpClient
  ) { }

  public getAllAnios(): Observable<Anio[]> {
    return this.http.get<Anio[]>(this.url);
  }
}
