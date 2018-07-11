import { Component, OnInit, Renderer2, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {

    @Output()
    public closed: EventEmitter<any> = new EventEmitter();

    @Output()
    public minimized: EventEmitter<any> = new EventEmitter();

    @Output()
    public maximized: EventEmitter<any> = new EventEmitter();

    constructor(
        private renderer: Renderer2,
    ) { }

    ngOnInit() {

    }

    handleClickMinimize() {
        this.minimized.emit();
    }

    handleClickMaximize() {
        this.maximized.emit();
    }

    handleClickClose() {
        this.closed.emit();
    }

}
