define([
    'require',
    'dojo/_base/declare',
    'dojo/dom',

    'esri/Map',
    'esri/views/MapView',
    'esri/geometry/Extent',

    'esri/layers/GraphicsLayer',

    'app/service/GeometryService'
], function (require, declare, dom, Map, MapView, Extent, GraphicsLayer, GeometryService) {
    'use strict';


    var geometryService = new GeometryService();
    var esriMap = null;
    var esriMapView;
    var layer01 = new GraphicsLayer();
    var layer02 = new GraphicsLayer();

    return declare('app.widgets.LayoutApp', [], {

        constructor: function () {
            this.start();
        },

        start: function () {
            esriMap = new Map({
                basemap: 'satellite'
            });

            esriMapView = new MapView({
                map: esriMap,
            });

            esriMap.layers.add(layer01);
            esriMap.layers.add(layer02);

            esriMapView.extent = new Extent({
                xmin: -1.3181079254E7,
                ymin: 1635334.4664000012,
                xmax: -9652558.1611,
                ymax: 3858021.4844999984,
                spatialReference: {
                    wkid: 102100
                }
            });

            esriMapView.when(function () {
                var promise = geometryService.getEntidadesGeometryAll();

                promise.then(function (response) {

                    response.features.forEach(graphic => {
                        var item = graphic.clone();

                        item.symbol = {
                            type: 'simple-fill',
                            color: [250, 250, 210, 0.3],
                            style: 'solid',
                            outline: {
                                color: [139, 0, 0, 1.0],
                                width: '1px'
                            }
                        };

                        layer01.add(item);
                    });
                });

                promise.then(function (response) {

                    response.features.forEach(graphic => {
                        var item = graphic.clone();

                        item.symbol = {
                            type: 'text',
                            color: 'black',
                            haloColor: 'white',
                            haloSize: '2px',
                            text: item.attributes['NOM_ENT'],
                            font: {
                                size: 8,
                                family: 'sans-serif'
                            }
                        };

                        layer02.add(item);
                    });
                });

                promise.catch(function (err) {
                    console.log(err);
                });
            });

        },

        getMapView: function () {
            return esriMapView;
        },
    });
});
