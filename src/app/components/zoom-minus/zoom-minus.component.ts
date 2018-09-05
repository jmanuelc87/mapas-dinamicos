import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';

@Component({
    selector: 'app-zoom-minus',
    templateUrl: './zoom-minus.component.html',
    styleUrls: ['./zoom-minus.component.css']
})
export class ZoomMinusComponent implements OnInit {

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

    onZoomMinus($event) {
        this.service.changeZoom(-1);
    }

}
