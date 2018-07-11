import { Component, OnInit, Renderer2, EventEmitter, Output } from '@angular/core';
import { v4 as uuid } from "uuid";

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

    private id: any;

    constructor(
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        this.id = uuid();
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

    getId() {
        return this.id;
    }
}
