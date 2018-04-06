import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';

@Component({
  selector: 'app-webmap',
  templateUrl: './web-map.component.html',
  styleUrls: ['./web-map.component.css']
})
export class WebMapComponent implements OnInit {

  @ViewChild('webmap')
  private mapViewEl: ElementRef;

  constructor() { }

  ngOnInit() {

    const map = new Map({
      basemap: 'satellite'
    });

    const view = new MapView({
      map: map,
      container: this.mapViewEl.nativeElement
    });

    console.log('maps started...');
  }

}
