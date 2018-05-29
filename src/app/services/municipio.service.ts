import { Injectable } from '@angular/core';
import { Estado } from '../models/Estado';

import * as basepath from "./url";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private url = basepath.default + '?r=estados';

  constructor(
    private http: HttpClient
  ) { }

  public getMunicipioByEstadoAndDistrito(estadoid, distritoid) {

    const params = new HttpParams({
      fromObject: {
        estadoid: estadoid,
        distritoid: distritoid,
      }
    });

    return this.http.get<Estado[]>(this.url, { params: params });
  }
}
