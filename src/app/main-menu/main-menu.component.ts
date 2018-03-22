import { Component, OnInit, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    public menuClicked: EventEmitter<string> = new EventEmitter();

    @Output()
    public prodCultivo: EventEmitter<any> = new EventEmitter();

    public prodEstado: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.menuClicked.subscribe((menu) => this.selector(menu));
    }

    private open(selectable): void {
        let html = selectable;
        html = html.trim();
        html = html.toLowerCase();

        this.menuClicked.emit(html);
    }

    private selector(menu) {

        switch (menu) {
            case 'produccion_cultivo':
                this.prodCultivo.emit(null);
                break;

            case 'produccion_estado':
                this.prodEstado.emit(null);
                break;
        }
    }
}
