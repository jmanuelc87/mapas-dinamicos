import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';
import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef
    } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { DialogDirective } from './dialog.directive';
import { MainMenuComponent } from './main-menu/main-menu.component';



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


    @ViewChild(DialogDirective)
    private dialogComponent: DialogDirective;

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
    }

    private openMenuProdCultivo() {
        const dialogComponentRef = this.dialogComponent.createDialog();
        dialogComponentRef.instance.close.subscribe((target) => {
            dialogComponentRef.destroy();
        });
     }

    private openMenuProdEstado() { }
}
