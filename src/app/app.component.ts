import { Component, OnInit, ElementRef, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';


import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';
import { MainMenuComponent } from './main-menu/main-menu.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    @ViewChild('map')
    private mapViewEl: ElementRef;

    @ViewChild('menu', { read: ViewContainerRef})
    private menuViewContainer: ViewContainerRef;

    private menuOpened: boolean;

    private menuComponent: ComponentRef<MainMenuComponent>;

    constructor(private cfr: ComponentFactoryResolver) {}

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
    }


    public openMenuEstadisticas(event) {

        if (!this.menuOpened) {
            const factory = this.cfr.resolveComponentFactory(MainMenuComponent);
            this.menuComponent = this.menuViewContainer.createComponent(factory);
            this.menuViewContainer.insert(this.menuComponent.hostView);

            this.menuComponent.instance.menuClicked.subscribe((menu) => {
                console.log(menu);
            });
        } else {
            this.menuViewContainer.clear();
        }

        this.menuOpened = !this.menuOpened;
    }
}
