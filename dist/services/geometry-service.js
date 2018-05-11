define(["require", "exports", "esri/tasks/support/Query", "esri/tasks/QueryTask"], function (require, exports, Query, QueryTask) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GeometryService = (function () {
        function GeometryService() {
            this.url = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';
        }
        GeometryService.prototype.getGeometryEntidadesAll = function () {
            var query = new QueryTask({
                url: this.url + '/6'
            });
            var params = new Query({
                returnGeometry: true,
                outFields: ['CVE_ENT', 'NOM_ENT']
            });
            console.log(params);
            return new Promise(function (resolve, reject) {
                query.execute(params).then(function (response) {
                    console.log(response);
                    resolve(response);
                }).catch(function (err) { return reject(err); });
            });
        };
        return GeometryService;
    }());
    exports.GeometryService = GeometryService;
});
//# sourceMappingURL=geometry-service.js.map