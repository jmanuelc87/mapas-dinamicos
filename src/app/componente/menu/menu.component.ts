import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],

    providers: [
        AppComponent
    ]
})
export class HeaderMenuComponent implements OnInit {

    constructor(
        private open: AppComponent
    ) { }

    ngOnInit() {  }

    private onOpenMenu(event): void {
        const menu = event.target.attributes['value'].value;
        this.open.openLateralComponent(menu);
    }

}
