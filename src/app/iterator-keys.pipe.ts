import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'iteratorKeys'
})
export class IteratorKeysPipe implements PipeTransform {

    transform(value: string[], args?: any): any {
        let keys = [];
        let printableFields = [];
        printableFields = args
        if (value !== undefined) {
            for (let key in value) {
                if (printableFields.includes(key)) {
                    keys.push(key);
                }
            }
        }
        return keys;
    }
}