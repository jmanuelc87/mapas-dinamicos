import { Component, OnInit, Input } from '@angular/core';
import { Columna } from './columna';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

    @Input()
    public columnas: Columna[];

    @Input()
    public step: number = 10;

    public totalPages: number;

    private pages: number[] = [];

    private _filas: any[][];

    private _renderer: any[][] = [];

    private totals: any[] = [];

    private start: number = 0;

    private numrows: number;

    private actualpage: number = 1;

    private filter: string = "ASC";

    constructor() { }

    ngOnInit() {
        this._renderer = this.rendererData(this.start, this.start + this.step);
    }

    @Input()
    public set filas(v: any[][]) {
        if (!v || v.length == 0) {
            this._filas = [];
            this.numrows = 0;
            this.pages = [];
        } else {
            this._filas = v;
            this.numrows = v.length;
            this.pages = [];

            this.totalPages = Math.ceil(this.numrows / this.step);
            for (let i = 0; i < this.totalPages; i++) {
                this.pages.push(i + 1);
            }

            this.setTotals(this._filas);
            this._renderer = this.rendererData(0, this.step);
        }
    }

    public next($event) {
        if (this.start + this.step < this.numrows) {
            this.start = this.start + this.step;
            this._renderer = this.rendererData(this.start, this.start + this.step);
        }
    }

    public previous($event) {
        if (this.start > 0) {
            this.start = this.start - this.step;
            this._renderer = this.rendererData(this.start, this.start + this.step);
        }
    }

    private setTotals(v: any[][]) {
        for (let i = 0; i < Object.keys(this.columnas).length; i++) {
            this.totals[i] = 0;
        }

        for (let i = 0; i < v.length; i++) {

            for (let j = 0; j < Object.keys(this.columnas).length; j++) {
                let col = this.columnas[j];
                this.totals[j] += (+v[i][col.campo]);
            }
        }
    }

    private rendererData(start, end) {
        let toRenderer = [];
        for (let i = start, m = 0; i < end; i++ , m++) {
            let row = this._filas[i];
            if (row != undefined) {
                toRenderer[m] = [];
                for (let col of this.columnas) {
                    toRenderer[m][col.campo] = row[col.campo];
                }
            }
        }

        return toRenderer;
    }

    public showPage(page: number) {
        this.start = (page - 1) * this.step;
        let end = this.start + this.step;
        this._renderer = this.rendererData(this.start, end);
    }

    public filterData(columna: Columna) {
        // order data asc
        if (this.filter == "ASC") {
            this._filas = this.orderDataByColumnAsc(this._filas, columna);
            let start = (this.actualpage - 1) * this.step;
            let end = start + this.step;
            this._renderer = this.rendererData(start, end);
            this.filter = "DESC";
        } else { // order data desc
            this._filas = this.orderDataByColumnDesc(this._filas, columna);
            let start = (this.actualpage - 1) * this.step;
            let end = start + this.step;
            this._renderer = this.rendererData(start, end);
            this.filter = "ASC";
        }
    }

    /**
     * Orders the data with respect to a especific column in ASC
     *
     * @param data the data to be ordered
     * @param columna the column with respect the data has to be filtered
     */
    private orderDataByColumnAsc(data: any[][], columna: Columna) {
        let a = Object.assign([], data);
        let order;

        for (let h = a.length; h > 0; h = Math.floor(h / 2)) {
            for (let i = h; i < a.length; i++) {
                var k = a[i];
                let j;
                for (j = i; j >= h && k[columna.campo] < a[j - h][columna.campo]; j -= h)
                    a[j] = a[j - h];
                a[j] = k;
            }
        }
        return a;
    }

    /**
     * Orders the data with respect to a especific column in ASC
     *
     * @param data the data to be ordered
     * @param columna the column with respect the data has to be filtered
     */
    private orderDataByColumnDesc(data: any[][], columna: Columna) {
        let a = Object.assign([], data);
        let order;

        for (let h = a.length; h > 0; h = Math.floor(h / 2)) {
            for (let i = h; i < a.length; i++) {
                var k = a[i];
                let j;
                for (j = i; j >= h && k[columna.campo] > a[j - h][columna.campo]; j -= h)
                    a[j] = a[j - h];
                a[j] = k;
            }
        }
        return a;
    }
}
