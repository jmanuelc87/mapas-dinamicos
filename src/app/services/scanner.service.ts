import { Injectable } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class ScannerService {

    private content: string;

    private index: number = 0;

    constructor() { }

    addContent(content) {
        this.content = content;
        this.index = 0;
    }

    private next() {
        if (this.index >= this.content.length) {
            return null;
        } else {
            return this.content[this.index++];
        }
    }

    parseNext(): number {
        let concat = '';
        let state = "continue";
        while (state == "continue") {
            let element = this.next();

            switch (element) {
                case null:
                    state = "end";
                    break;

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    concat += element;
                    state = "continue";
                    break;

                case ',':
                    state = 'end';
                    break;

                case ')':
                    state = 'end';
                    break;
            }
        }

        return parseInt(concat);
    }

    rgbToHex(color) {
        const rgb = color[2] | (color[1] << 8) | (color[0] << 16);
        const strRGB = rgb.toString(16).toUpperCase();
        return strRGB.length >= 6 ? '#' + strRGB : '#00' + strRGB;
    }
}
