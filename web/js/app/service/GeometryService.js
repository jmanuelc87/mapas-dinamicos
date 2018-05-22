define('js/GeometryService', [
    'require',
    'exports',
    'module',
    'app/service/Util',
    'esri/tasks/QueryTask',
    'esri/tasks/support/Query'
], function (require, exports, module, Util, QueryTask, Query) {
    'use strict';

    const baseUrl = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';

    var GeometryService = declare('app.service.GeometryService', [], {
        getEntidadesGeometryAll: function () {
            var queryTask = new QueryTask({
                url: baseUrl + '/6',
            });

            const params = new Query({
                returnGeometry: true,
                outFields: ['CVE_ENT', 'NOM_ENT']
            });

            params.where = Util.queryTaskWhere('CVE_ENT', 1, 32, 2);

            return queryTask.execute(params);
        }
    });
    console.log(GeometryService);
    return GeometryService;
});