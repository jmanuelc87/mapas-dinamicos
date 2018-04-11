import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'iteratorKeys'
})
export class IteratorKeysPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let keys = [];
        if (value !== undefined && value.length > 0) {
            for (let key in value[0]) {
                if (key !== 'id' && key !== 'variedades') {
                    keys.push({ key: key, value: value[key] });
                }
            }
        }
        return keys;
    }
}