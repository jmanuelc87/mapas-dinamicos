import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    @Output()
    public menuSelected: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    private onOpen(event): void {
        let innerHTML = event.target.innerHTML;
        innerHTML = innerHTML.trim().toLowerCase();
        switch (innerHTML) {
            case 'producción por cultivo':
                this.menuSelected.emit('produccion_cultivo');
                break;

            case 'producción por estado':
                this.menuSelected.emit('produccion_estado');
                break;

            case 'capas geográficas':
                this.menuSelected.emit('capas_geograficas');
                break;
        }
    }
}
