import { Anuario } from './anuario';
import { Extent } from 'esri/geometry';
import * as FeatureSet from "esri/tasks/support/FeatureSet";

export class Territorio {
    constructor(
        public id?: number,
        public nombre?: string,
        public extent?: Extent,
        public features?: any[],
    ) { }
}
