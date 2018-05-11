require(
    ['esri/Map', 'esri/views/MapView', 'esri/geometry/Extent', 'esri/layers/GraphicsLayer', 'js/GeometryService', 'dojo/domReady!'],
    function (EsriMap, MapView, Extent, GraphicsLayer, GeometryService) {

        var map = null;
        var view = null;
        var layerEntidades = null;

        var App = {
            start: function () {

                layerEntidades = new GraphicsLayer();

                // Crear mapa base
                map = new EsriMap({
                    basemap: 'satellite'
                });

                map.add(layerEntidades);

                // Crear visualizacion del mapa
                view = new MapView({
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
                view.extent = new Extent({
                    xmin: -1.3181079254E7,
                    ymin: 1635334.4664000012,
                    xmax: -9652558.1611,
                    ymax: 3858021.4844999984,
                    spatialReference: 102100,
                });
            },

            createInitialLayer: function () {
                var promise = GeometryService.getEntidadesGeometryAll();

                promise.then(function (response) {
                    var features = response.features;

                    features.map(function (value, index) {
                        value.symbol = {
                            type: 'simple-fill',
                            color: [250, 250, 210, 0.3],
                            style: 'solid',
                            outline: {
                                color: [139, 0, 0, 1.0],
                                width: '1px'
                            }
                        };

                        layerEntidades.add(value);
                    });
                });
            }
        };


        App.start();
        App.createInitialLayer();
    });