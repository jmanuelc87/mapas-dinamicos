define([
    'require',
    'esri/tasks/support/FeatureSet',
    'services/geometry-service'
], function (require, FeatureSet, GeometryService) {
    'use strict';

    describe('Geometry Service definition', function () {
        var service;
        beforeEach(function () {
            service = new GeometryService.GeometryService();
        });

        it("should return attributes for states", function (done) {

            var spy = spyOn(service, 'getGeometryEntidadesAll').and.returnValue(Promise.resolve(FeatureSet));

            spy.calls.mostRecent().returnValue.then(function (response) {
                console.log(response.features);
            });

            /*service.getGeometryEntidadesAll().then(function (response) {

                console.log(response.features);

                var lenght = response.features.lenght;
                var cve_ent = response.features[0].attributes['CVE_ENT'];
                var nom_ent = response.features[0].attributes['NOM_ENT'];

                expect(cve_ent).toBe('01');
                expect(nom_ent).toBe('Aguascalientes');
                expect(lenght).toBe(31);

                done();
            }).catch(function (err) {

                console.log(err);

                fail(err);
            });*/
        }, 5000);
    });

});