import './config';

import './css/main.scss';

import * as Map from "esri/Map";
import * as MapView from "esri/views/MapView";

import 'dojo/domReady';

let map: Map = new Map({
    basemap: 'streets'
});

let view: MapView = new MapView({
    map: map,
    container: document.getElementById('webmap') as HTMLDivElement,
});