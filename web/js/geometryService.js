define('js/GeometryService', [
    'require',
    'exports',
    'module',
    'esri/tasks/QueryTask',
    'esri/tasks/support/Query'
], function (require, exports, module, QueryTask, Query) {
    'use strict';

    const baseUrl = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';

    var GeometryService = {
        getEntidadesGeometryAll: function () {
            var queryTask = new QueryTask({
                url: baseUrl + '/6',
            });

            const params = new Query({
                returnGeometry: true,
                outFields: ['CVE_ENT', 'NOM_ENT']
            });

            params.where = 'CVE_ENT IN (\'01\', \'02\')';

            return queryTask.execute(params);
        }
    }

    return GeometryService;
});