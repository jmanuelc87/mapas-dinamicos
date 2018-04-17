import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Anuario } from '../dominio/anuario';
import { Territorio } from '../dominio/territorio';
import { Cultivo } from '../dominio/cultivo';
import { AnuarioAgricola } from '../dominio/anuario-agricola';
import { reject } from 'q';
import { resolve } from 'url';
import { Ddr } from '../dominio/ddr';
import { Municipio } from '../dominio/municipio';
import { Estado } from '../dominio/estado';
import { Variedad } from '../dominio/variedad';
import { promise } from 'selenium-webdriver';

const years = [
    { year: 2016 },
    { year: 2015 },
    { year: 2014 },
    { year: 2013 },
    { year: 2012 }
];

const states = [
    { id: 1, name: 'Aguascalientes' },
    { id: 2, name: 'Baja California' },
    { id: 3, name: 'Baja California Sur' },
    { id: 4, name: 'Campeche' }
];

const districts = [
    { id: 1, name: 'Aguascalientes' },
];

const municipios = [
    { id: 1, name: 'Aguascalientes' },
    { id: 2, name: 'Asientos' },
    { id: 3, name: 'Calvillo' },
    { id: 4, name: 'Cosío' },
    { id: 6, name: 'Pabellón de Arteaga' },
    { id: 7, name: 'Rincón de Romos' },
    { id: 8, name: 'San José de Gracia' },
    { id: 9, name: 'Tepezalá' },
];

const cultivos = [
    { id: 1, name: 'Aceituna', variedades: [{ id: 1, nombre: 'manzanilla' }, { id: 2, nombre: 'negra' }] },
    { id: 2, name: 'Agave', variedades: [{ id: 1, nombre: 'tequilero' }, { id: 2, nombre: 'tequilero weber' }] },
    { id: 3, name: 'Aguacate', variedades: [{ id: 1, nombre: 'hass' }, { id: 2, nombre: 'organico' }, { id: 3, nombre: 'criollo' }] }
]

const anuarioAgricolaXCultivo = [
    { nombre: "Cacahuate", sembrada: 4432.50, cosechada: 4432.50, produccion: 7963.75, rendimiento: 1.797, pmr: 8539.80, valor: 68008847.63 },
    { nombre: "Frijol", sembrada: 8031.50, cosechada: 8031.50, produccion: 2882.55, rendimiento: 0.359, pmr: 12386.33, valor: 35704204.00 },
    { nombre: "Maíz grano", sembrada: 120945.00, cosechada: 120945.00, produccion: 311968.18, rendimiento: 2.579, pmr: 3193.03, valor: 996125280.72 },
    { nombre: "Cacahuate", sembrada: 4432.50, cosechada: 4432.50, produccion: 7963.75, rendimiento: 1.797, pmr: 8539.80, valor: 68008847.63 },
    { nombre: "Frijol", sembrada: 8031.50, cosechada: 8031.50, produccion: 2882.55, rendimiento: 0.359, pmr: 12386.33, valor: 35704204.00 },
    { nombre: "Maíz grano", sembrada: 120945.00, cosechada: 120945.00, produccion: 311968.18, rendimiento: 2.579, pmr: 3193.03, valor: 996125280.72 },
    { nombre: "Cacahuate", sembrada: 4432.50, cosechada: 4432.50, produccion: 7963.75, rendimiento: 1.797, pmr: 8539.80, valor: 68008847.63 },
    { nombre: "Frijol", sembrada: 8031.50, cosechada: 8031.50, produccion: 2882.55, rendimiento: 0.359, pmr: 12386.33, valor: 35704204.00 },
    { nombre: "Maíz grano", sembrada: 120945.00, cosechada: 120945.00, produccion: 311968.18, rendimiento: 2.579, pmr: 3193.03, valor: 996125280.72 },
    { nombre: "Cacahuate", sembrada: 4432.50, cosechada: 4432.50, produccion: 7963.75, rendimiento: 1.797, pmr: 8539.80, valor: 68008847.63 },
    { nombre: "Frijol", sembrada: 8031.50, cosechada: 8031.50, produccion: 2882.55, rendimiento: 0.359, pmr: 12386.33, valor: 35704204.00 },
    { nombre: "Maíz grano", sembrada: 120945.00, cosechada: 120945.00, produccion: 311968.18, rendimiento: 2.579, pmr: 3193.03, valor: 996125280.72 },
    { nombre: "Cacahuate", sembrada: 4432.50, cosechada: 4432.50, produccion: 7963.75, rendimiento: 1.797, pmr: 8539.80, valor: 68008847.63 },
    { nombre: "Frijol", sembrada: 8031.50, cosechada: 8031.50, produccion: 2882.55, rendimiento: 0.359, pmr: 12386.33, valor: 35704204.00 },
    { nombre: "Maíz grano", sembrada: 120945.00, cosechada: 120945.00, produccion: 311968.18, rendimiento: 2.579, pmr: 3193.03, valor: 996125280.72 },
    { nombre: "Cacahuate", sembrada: 4432.50, cosechada: 4432.50, produccion: 7963.75, rendimiento: 1.797, pmr: 8539.80, valor: 68008847.63 },
    { nombre: "Frijol", sembrada: 8031.50, cosechada: 8031.50, produccion: 2882.55, rendimiento: 0.359, pmr: 12386.33, valor: 35704204.00 },
    { nombre: "Maíz grano", sembrada: 120945.00, cosechada: 120945.00, produccion: 311968.18, rendimiento: 2.579, pmr: 3193.03, valor: 996125280.72 },
    { nombre: "Cacahuate", sembrada: 4432.50, cosechada: 4432.50, produccion: 7963.75, rendimiento: 1.797, pmr: 8539.80, valor: 68008847.63 },
    { nombre: "Frijol", sembrada: 8031.50, cosechada: 8031.50, produccion: 2882.55, rendimiento: 0.359, pmr: 12386.33, valor: 35704204.00 },
    { nombre: "Maíz grano", sembrada: 120945.00, cosechada: 120945.00, produccion: 311968.18, rendimiento: 2.579, pmr: 3193.03, valor: 996125280.72 },
    { nombre: "Cacahuate", sembrada: 4432.50, cosechada: 4432.50, produccion: 7963.75, rendimiento: 1.797, pmr: 8539.80, valor: 68008847.63 },
    { nombre: "Frijol", sembrada: 8031.50, cosechada: 8031.50, produccion: 2882.55, rendimiento: 0.359, pmr: 12386.33, valor: 35704204.00 },
    { nombre: "Maíz grano", sembrada: 120945.00, cosechada: 120945.00, produccion: 311968.18, rendimiento: 2.579, pmr: 3193.03, valor: 996125280.72 },
]

const municipiosByAnuarioAndCultivo = {
    estado: 1,
    municipios: [
        { municipio: 1, nombre: 'Aguascalientes' },
        { municipio: 5, nombre: 'Jesús María' },
        { municipio: 10, nombre: 'El Llano' },
        { municipio: 11, nombre: 'San Francisco de los Romo' },
        { municipio: 4, nombre: 'Cosío' },
        { municipio: 6, nombre: 'Pabellón de Arteaga' },
        { municipio: 8, nombre: 'San José de Gracia' },
        { municipio: 9, nombre: 'Tepezalá' },
    ]
};


const estadosByAnuarioAndCultivo = {
    territorios: [
        { estado: 5, nombre: 'Coahuila de Zaragoza' },
        { estado: 8, nombre: 'Chihuahua' },
        { estado: 13, nombre: 'Hidalgo' },
        { estado: 14, nombre: 'Jalisco' },
        { estado: 15, nombre: 'México' },
        { estado: 16, nombre: 'Michoacán' },
        { estado: 21, nombre: 'Puebla' },
        { estado: 24, nombre: 'San Luis Potosí' },
        { estado: 30, nombre: 'Veracruz' },
        { estado: 30, nombre: 'Zacatecas' },
        { estado: 1, nombre: 'Aguascalientes' },
        { estado: 9, nombre: 'Distrito Federal' },
        { estado: 10, nombre: 'Durango' },
        { estado: 11, nombre: 'Guanajuato' },
        { estado: 12, nombre: 'Guerrero' },
        { estado: 17, nombre: 'Morelos' },
        { estado: 19, nombre: 'Nuevo León' },
        { estado: 20, nombre: 'Oaxaca' },
        { estado: 28, nombre: 'Tamaulipas' },
        { estado: 29, nombre: 'Tlaxcala' }
    ]
};

@Injectable()
export class AnuarioAgricolaService {

    private url = '';

    constructor(
        private http: HttpClient
    ) { }


    public getAllYears(): Promise<Array<Anuario>> {
        return new Promise((resolve, reject) => {
            let all = years.map(item => {
                return new Anuario(item.year);
            });

            resolve(all);
        });
    }

    public getAllStates(): Promise<Array<Territorio>> {
        return new Promise((resolve, reject) => {
            let all = states.map(item => {
                return new Estado(item.id, item.name);
            });

            resolve(all);
        });
    }

    public getDistrictByState(state: number): Promise<Array<Territorio>> {
        return new Promise((resolve, reject) => {
            let all = districts.map(item => {
                return new Ddr(item.id, item.name);
            });

            resolve(all);
        });
    }

    public getMunicipioByDistrict(district: number): Promise<Array<Territorio>> {
        return new Promise((resolve, reject) => {
            let all = municipios.map(item => {
                return new Municipio(item.id, item.name);
            });

            resolve(all);
        });
    }

    public getAllCultivo(): Promise<Array<Cultivo>> {
        return new Promise((resolve, reject) => {
            let all = cultivos.map(item => {
                return new Cultivo(item.id, item.name);
            });

            resolve(all);
        });
    }

    public getVariedadByCultivo(id: number): Promise<Array<Variedad>> {
        return new Promise((resolve, reject) => {
            let cultivo = cultivos[id];
            resolve(cultivo.variedades as Array<Variedad>);
        });
    }

    public consultaAnuarioPorCultivo(anuario: AnuarioAgricola): Promise<Cultivo[]> {
        return new Promise((resolve, reject) => {
            let all = anuarioAgricolaXCultivo.map(item => {
                return new Cultivo(0, item.nombre, item.sembrada, item.cosechada, item.produccion, item.rendimiento, item.pmr, item.valor);
            });

            resolve(all);
        });
    }

    public getMunicipiosByAnuarioAndCultivo(anuario: AnuarioAgricola, cultivo: Cultivo): Promise<any> {
        return new Promise((resolve, reject) => {

            let estado = new Estado(municipiosByAnuarioAndCultivo.estado);

            let municipios = municipiosByAnuarioAndCultivo.municipios.map(item => {
                return new Municipio(item.municipio, item.nombre)
            });

            resolve({
                estado: estado,
                municipios: municipios
            })
        });
    }

    public getEstadosByAnuariondCultivo(anuario: AnuarioAgricola, cultivo: Cultivo): Promise<Municipio[]> {

        return new Promise((resolve, reject) => {

            let municipios = estadosByAnuarioAndCultivo.territorios.map(item => {
                return new Estado(item.estado, item.nombre);
            });

            resolve(municipios);
        });
    }

}
