import { Injectable } from '@angular/core';
import { loadModules } from "esri-loader";


@Injectable({
    providedIn: 'root'
})
export class EsriProviderService {

    constructor() { }


    require(dependencies: string[]) {
        return loadModules(dependencies, {
            css: 'https://js.arcgis.com/4.7/esri/css/main.css',
            url: 'https://js.arcgis.com/4.7/'
        });
    }
}
