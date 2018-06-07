import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { EsriMapService } from '../services/esri-map.service';

@Directive({
    selector: '[appEsriWidget]'
})
export class EsriWidgetDirective implements OnInit {

    @Input()
    private position: string;

    constructor(
        private el: ElementRef,
        private mapService: EsriMapService,
    ) { }

    ngOnInit(): void {
        this.mapService.mapLoaded.subscribe(() => {
            this.mapService.addWidget(this.el.nativeElement, this.position);
        });
    }

}
