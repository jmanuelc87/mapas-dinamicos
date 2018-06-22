import { Component, OnInit, ComponentRef, Renderer2, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { WindowComponent } from '../../components';

@Component({
    selector: 'app-rangos',
    templateUrl: './rangos.component.html',
    styleUrls: ['./rangos.component.css']
})
export class RangosComponent {

    componentRef: ComponentRef<any>;

    @ViewChild(WindowComponent)
    private window: WindowComponent;

    private countRows = [1, 2, 3];

    constructor(
        private renderer: Renderer2,
    ) { }

    @Input()
    set location(position) {
        let thisWindowPosition = this.window.position;
        let parentWindowPosition = position;

        let top = (parentWindowPosition.top + parentWindowPosition.height / 2) - (thisWindowPosition.height / 2);
        let left = (parentWindowPosition.left + parentWindowPosition.width / 2) - (thisWindowPosition.width / 2);

        this.window.position = { top: top, left: left };
    }

    onSelecteRange($event) {
        this.countRows = [];
        for (let i = 1; i <= $event.target.value; i++) {
            this.countRows.push(i);
        }
    }

    onHandleClick($event) {

    }

}
