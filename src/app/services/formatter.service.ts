import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormatterService {

    constructor() { }

    formatNumber(params) {
        let value = (params.value * 1);
        return value
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    formatNumberDivideThousands(params) {
        let value = (params.value / 1000);
        return '$ ' + value
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

}
