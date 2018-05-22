define([
    'require',
    'dojo/_base/declare',
    'dojo/dom',

    'app/service/GeometryService',

    'esri/Map',
    'esri/views/MapView',
    'esri/geometry/Extent'
], function (require, declare, dom, GeometryService, Map, MapView, Extent) {
    'use strict';

    var geometryService = null;

    return declare('app.widgets.LayoutApp', [], {

        constructor: function () {
            console.log("geometry", GeometryService);
            //geometryService = new GeometryService();
        },

        start: function () {
            this.esriMap = new Map({
                basemap: 'satellite'
            });

            this.esriMapView = new MapView({
                region: 'center',
                map: this.esriMap,
            });

            this.esriMapView.extent = new Extent({
                xmin: -1.3181079254E7,
                ymin: 1635334.4664000012,
                xmax: -9652558.1611,
                ymax: 3858021.4844999984,
                spatialReference: {
                    wkid: 102100
                }
            });

            //this.esriMap.then(function () {
                //var promise = geometryService.getEntidadesGeometryAll();
            //});
        },
    });
});
