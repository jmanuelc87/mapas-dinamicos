import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';

@Component({
    selector: 'app-home-tool',
    templateUrl: './home-tool.component.html',
    styleUrls: ['./home-tool.component.css']
})
export class HomeToolComponent implements OnInit {

    position = 'top-right';

    private _extent: any = {
        xmin: -1.3181079254E7,
        ymin: 1635334.4664000012,
        xmax: -9652558.1611,
        ymax: 3558021.4844999984,
        spatialReference: {
            wkid: 102100
        }
    };

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

    onHomeClick($event) {
        this.service.moveToExentParams(this._extent);
    }
}
