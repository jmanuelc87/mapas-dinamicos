import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

    private position = 'top-left';

    @ViewChild('info')
    private elementRef: ElementRef;

    constructor(
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        let width = window.innerHeight
        let center = (width) - 400;
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', center + 'px');
    }

}
