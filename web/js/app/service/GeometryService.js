define([
    'require',
    'dojo/_base/declare',
    'app/service/Util',
    'esri/tasks/QueryTask',
    'esri/tasks/support/Query'
], function (require, declare, Util, QueryTask, Query) {
    'use strict';

    const baseUrl = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';

    var util = new Util();

    return declare('app.service.GeometryService', [], {
        getEntidadesGeometryAll: function () {

            var queryTask = new QueryTask({
                url: baseUrl + '/6',
            });

            const params = new Query({
                returnGeometry: true,
                outFields: ['CVE_ENT', 'NOM_ENT']
            });

            params.where = util.queryTaskWhere('CVE_ENT', 1, 32, 2);

            return queryTask.execute(params);
        },

        getEntidadesById: function (id) {
            console.log(id);
        }
    });
});