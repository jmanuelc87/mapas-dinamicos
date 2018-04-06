import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef,
    Directive
} from '@angular/core';

import { ConsultaCultivoComponent } from './componente/consulta-cultivo/consulta-cultivo.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }

    openLateralComponent(selected: string): void {
        console.log(selected);
    }

}
