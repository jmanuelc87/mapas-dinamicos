import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    @ViewChild('map')
    private mapViewEl: ElementRef;

    ngOnInit(): void {
        const map: __esri.Map = new Map({
            basemap: 'oceans'
        });

        const view: __esri.MapView = new MapView({
            map: map,
            container: this.mapViewEl.nativeElement,
            center: [-112, 38],
            zoom: 6
        });
    }
}
