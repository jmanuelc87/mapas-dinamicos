import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';

@Component({
    selector: 'app-zoom-plus-component',
    templateUrl: './zoom-plus-component.component.html',
    styleUrls: ['./zoom-plus-component.component.css']
})
export class ZoomPlusComponentComponent implements OnInit {

    position = 'top-right';

    @ViewChild('root')
    root: ElementRef;

    constructor(
        private service: EsriMapService,
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.renderer.removeClass(this.root.nativeElement, 'hidden');
        }, 2000);
    }

    onZoomPlus($event) {
        this.service.changeZoom(1);
    }
}
