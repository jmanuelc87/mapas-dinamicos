import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, Renderer2, ComponentRef, Input } from '@angular/core';
import { DraggableDirective } from "../../directives/draggable.directive";
import { v4 as uuid } from "uuid";

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

    id: any;

    @ViewChild("window2")
    el: ElementRef;

    @Input()
    componentRef: ComponentRef<WindowComponent>;

    @Output()
    close: EventEmitter<void> = new EventEmitter();

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.id = uuid();
    }

    handleClickClose(event) {
        this.close.emit();
        this.componentRef.destroy();
    }

    handleClickMinimize(event) {
        this.renderer.addClass(this.el.nativeElement, 'minimize');
    }

    handleClickMaximize(event) {
        this.renderer.removeClass(this.el.nativeElement, 'minimize');
    }

    set position(pos: any) {
        this.renderer.setStyle(this.el.nativeElement, 'top', `${pos.top}px`);
        this.renderer.setStyle(this.el.nativeElement, 'left', `${pos.left}px`);
    }

    get position() {
        let pos = {
            top: +this.el.nativeElement.offsetTop,
            left: +this.el.nativeElement.offsetLeft,
            height: +this.el.nativeElement.offsetHeight,
            width: + this.el.nativeElement.offsetWidth,
        };

        return pos;
    }

}
