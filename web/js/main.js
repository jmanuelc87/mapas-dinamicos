require(
    ['esri/Map',
        'esri/views/MapView',
        'esri/geometry/Extent',
        'esri/layers/GraphicsLayer',
        'js/GeometryService',
        'bootstrap/Collapse',
        'bootstrap/Dropdown',
        'calcite-maps/calcitemaps-v0.7',
        'calcite-maps/calcitemaps-arcgis-support-v0.7',
        'https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.0.1/js/calcite-web.min.js',
        'dojo/domReady!'],
    function (EsriMap, MapView, Extent, GraphicsLayer, GeometryService, Collapse, Dropdown, CalciteMaps, CalciteMapArcGISSupport, calcite) {

        var map = null;
        var mapView = null;
        var layerEntidades = null;
        var layerEntidadesText = null;

        var App = {
            start: function () {

                layerEntidades = new GraphicsLayer();
                layerEntidadesText = new GraphicsLayer();

                // Crear mapa base
                map = new EsriMap({
                    basemap: 'satellite'
                });

                map.add(layerEntidades);
                map.add(layerEntidadesText);

                // Crear visualizacion del mapa
                mapView = new MapView({
                    map: map,
                    container: 'mapViewDiv',
                    padding: {
                        top: 50,
                        bottom: 0,
                    },
                    ui: {
                        components: []
                    },
                });

                // colocar el extent del mapa
                mapView.extent = new Extent({
                    xmin: -1.3181079254E7,
                    ymin: 1635334.4664000012,
                    xmax: -9652558.1611,
                    ymax: 3858021.4844999984,
                    spatialReference: 102100,
                });

                CalciteMapArcGISSupport.setPopupPanelSync(mapView);
            },

            createInitialLayer: function () {
                var promise = GeometryService.getEntidadesGeometryAll();

                promise.then(function (response) {
                    var features = response.features;

                    features.map(function (value, index) {
                        var cloned = value.clone();
                        cloned.symbol = {
                            type: 'simple-fill',
                            color: [250, 250, 210, 0.3],
                            style: 'solid',
                            outline: {
                                color: [139, 0, 0, 1.0],
                                width: '1px'
                            }
                        };

                        layerEntidades.add(cloned);
                    });
                });

                promise.then(function (response) {
                    var features = response.features;

                    features.map(function (item, index) {
                        var cloned = item.clone();
                        cloned.symbol = {
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

                        layerEntidadesText.add(cloned);
                    })
                });
            }
        };


        App.start();
        App.createInitialLayer();
    });