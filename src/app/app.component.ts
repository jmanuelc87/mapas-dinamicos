import { Component, OnInit, ElementRef, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, EventEmitter, Output } from '@angular/core';

import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { MenuDirective } from './menu.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],

    entryComponents: [
        MainMenuComponent
    ]
})
export class AppComponent implements OnInit {

    @ViewChild('map')
    private mapViewEl: ElementRef;

    @ViewChild(MenuDirective)
    private menuAnchor: MenuDirective;

    @Output()
    private opened: EventEmitter<boolean> = new EventEmitter();

    private isOpened: boolean;

    constructor() { }

    ngOnInit(): void {
        /*const map: __esri.Map = new Map({
            basemap: 'oceans'
        });

        const view: __esri.MapView = new MapView({
            map: map,
            container: this.mapViewEl.nativeElement,
            center: [-112, 38],
            zoom: 6
        });*/

        this.opened.subscribe((isOpened) => this._opened(isOpened));
    }


    private open(event) {
        this.isOpened = !this.isOpened;
        this.opened.emit(this.isOpened);
    }

    private _opened(isOpened): void {
        if (isOpened) {
            const menuElementRef = this.menuAnchor.createMenu(MainMenuComponent);
        } else {
            this.menuAnchor.removeMenu();
        }
    }
}
