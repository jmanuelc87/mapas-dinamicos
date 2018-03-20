import { Component, OnInit, ElementRef, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, EventEmitter, Output } from '@angular/core';

import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { MenuDirective } from './menu.directive';
import { DialogComponent } from './dialog/dialog.component';
import { DialogDirective } from './dialog.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],

    entryComponents: [
        MainMenuComponent,
        DialogComponent
    ]
})
export class AppComponent implements OnInit {

    @ViewChild('map')
    private mapViewEl: ElementRef;

    @ViewChild(MenuDirective)
    private menuAnchor: MenuDirective;

    @ViewChild(DialogDirective)
    private dialogComponent: DialogDirective;

    @Output()
    private opened: EventEmitter<boolean> = new EventEmitter();

    private isOpened: boolean;

    private menuComponentRef:  ComponentRef<MainMenuComponent>;

    private dialogComponentRef: ComponentRef<DialogComponent>;

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
            this.menuComponentRef = this.menuAnchor.createMenu(MainMenuComponent);

            this.menuComponentRef.instance.menuClicked.subscribe((opened) => {

                switch (opened) {
                    case 'Producción por Cultivo':
                    this.dialogComponentRef = this.dialogComponent.createDialog(DialogComponent);

                    this.dialogComponentRef.instance.close.subscribe((target) => {
                        if (target === 'close') {
                            this.dialogComponentRef.destroy();
                        }
                    });

                    break;
                }
            });

        } else {
            this.menuAnchor.removeMenu();
        }
    }
}
