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
        this.rendererData(this.start, this.start + this.step);
    }

    @Input()
    public set filas(v: any[][]) {
        this._filas = v;
        this.numrows = v.length;

        this.totalPages = Math.ceil(this.numrows / this.step);
        for (let i = 0; i < this.totalPages; i++) {
            this.pages.push(i + 1);
        }

        this.setTotals(this._filas);
    }

    public next($event) {
        if (this.start + this.step < this.numrows) {
            this.start = this.start + this.step;
            this.rendererData(this.start, this.start + this.step);
        }
    }

    public previous($event) {
        if (this.start > 0) {
            this.start = this.start - this.step;
            this.rendererData(this.start, this.start + this.step);
        }
    }


    private setTotals(v: any[][]) {
        for (let i = 0; i < v[0].length; i++) {
            this.totals[i] = 0;
        }

        for (let i = 0; i < v.length; i++) {
            for (let j = 0; j < v[i].length; j++) {
                this.totals[j] += +v[i][j];
            }
        }

        this.totals[0] = "Total";

        for (let i = 0; i < v.length; i++) {
            if (this.totals[i] == NaN) {
                this.totals[i] = "";
            }
        }
    }

    private rendererData(start, end) {
        this._renderer = [];
        for (let i = start, m = 0; i < end; i++ , m++) {
            let row = this._filas[i];
            if (row != undefined) {
                this._renderer[m] = [];
                for (let j = 0; j < row.length; j++) {
                    this._renderer[m].push(row[j])
                }
            }
        }
    }

    public showPage(page: number) {
        this.start = (page - 1) * this.step;
        let end = this.start + this.step;
        this.rendererData(this.start, end);
    }

    public filterData(columna: Columna) {
        // order data asc
        if (this.filter == "ASC") {
            this._filas = this.orderDataByColumnAsc(this._filas, columna);
            let start = (this.actualpage - 1) * this.step;
            let end = start + this.step;
            this.rendererData(start, end);
            this.filter = "DESC";
        } else { // order data desc
            this._filas = this.orderDataByColumnDesc(this._filas, columna);
            let start = (this.actualpage - 1) * this.step;
            let end = start + this.step;
            this.rendererData(start, end);
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
                for (j = i; j >= h && k[columna.index - 1] < a[j - h][columna.index - 1]; j -= h)
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
                for (j = i; j >= h && k[columna.index - 1] > a[j - h][columna.index - 1]; j -= h)
                    a[j] = a[j - h];
                a[j] = k;
            }
        }
        return a;
    }
}
