import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

    position = '';

    @ViewChild('info')
    private elementRef: ElementRef;

    constructor(
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        let width = window.innerWidth;
        let center = (width / 2) - 270;
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', center + 'px');

        setTimeout(() => {
            this.renderer.removeClass(this.elementRef.nativeElement, 'hidden');
        }, 2000);
    }

}
