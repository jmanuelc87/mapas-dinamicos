import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';
import { LegendService } from '../../services/legend.service';

@Component({
    selector: 'app-clean-tool',
    templateUrl: './clean-tool.component.html',
    styleUrls: ['./clean-tool.component.css']
})
export class CleanToolComponent implements OnInit {

    position = 'top-right';

    @ViewChild('root')
    root: ElementRef;

    constructor(
        private service: EsriMapService,
        private legend: LegendService,
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.renderer.removeClass(this.root.nativeElement, 'hidden');
        }, 2000);
    }

    onCleanMap($event) {
        this.service.cleanMap();
        this.legend.removeLegend();
    }

}
