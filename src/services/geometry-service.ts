//import * as constants from '../constants';
import * as Query from 'esri/tasks/support/Query';
import * as QueryTask from 'esri/tasks/QueryTask';
import * as FeatureSet from "esri/tasks/support/FeatureSet";


export class GeometryService {

    //private url: string = constants.default.ESRI_SERVICE_URL;
    private url = 'http://cmgs.gob.mx/gis/rest/services/Infraestructura/InfraestSsector/MapServer';


    public getGeometryEntidadesAll(): Promise<FeatureSet> {


        let query = new QueryTask({
            url: this.url + '/6'
        });

        let params = new Query({
            returnGeometry: true,
            outFields: ['CVE_ENT', 'NOM_ENT']
        });

        console.log(params);

        return new Promise((resolve, reject) => {
            query.execute(params).then(response => {
                console.log(response);
                resolve(response);
            }).catch((err) => reject(err));
        });
    }

}