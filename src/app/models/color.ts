export class Color {

    public nombre: string;

    public value: any;

    public hex: string;

    private i: number;

    constructor(value: any) {
        this.value = value;
    }

    public toArray() {
        this.i = 0;
        const r = this.parseNext();
        const g = this.parseNext();
        const b = this.parseNext();

        return [r, g, b];
    }

    public toHex() {
        const rgb = this.value[2] | (this.value[1] << 8) | (this.value[0] << 16);
        const strRGB = rgb.toString(16).toUpperCase();
        return strRGB.length >= 6 ? '#' + strRGB : '#00' + strRGB;
    }

    private parseNext() {
        let concat = '';
        let state = 'continue';
        while (state === 'continue') {
            const element = this.value[this.i++];

            switch (element) {
                case null:
                    state = 'end';
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
                    state = 'continue';
                    break;

                case ',':
                    state = 'end';
                    break;

                case ')':
                    state = 'end';
                    break;
            }
        }


        return parseInt(concat, 10);
    }

}
