import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() { }

    public queryTaskWhere(field: string, start: number, end: number, lenght: number) {
        let where = `${field} IN (`;
        let array = [];

        for (let i = start; i <= end; i++) {
            array.push(i);
        }

        where += this.getStringFromArray(array, lenght);
        where += ')';

        return where;
    }

    public getCVEString(cve: number, length: number): string {
        let format = '';
        for (let i = format.length; i < length - cve.toString().length; i++) {
            format += '0';
        }
        return format + cve.toString();
    }


    public getStringFromArray(array: number[], lenght: number): string {
        let format = '';
        let integer;

        for (let i = 0; i < array.length - 1; i++) {
            integer = this.getCVEString(array[i], lenght);
            format += `'${integer}',`;
        }

        integer = this.getCVEString(array[array.length - 1], lenght);
        format += `'${integer}'`;

        return format;
    }

}
