import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {

    private subs: Subscription;

    @ViewChild('popup')
    private el: ElementRef;

    constructor(
        private mapService: EsriMapService,
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        this.subs = this.mapService.popupSubject.pipe(debounceTime(350)).subscribe((point) => {
            if (!point.show) {
                this.renderer.addClass(this.el.nativeElement, 'hidden');
                return;
            } else {
                this.renderer.removeClass(this.el.nativeElement, 'hidden');
            }

            let top = this.el.nativeElement.offsetTop;
            let left = this.el.nativeElement.offsetLeft;

            let diffy = this.el.nativeElement.offsetTop - point.y;
            let diffx = this.el.nativeElement.offsetLeft - point.x;

            this.renderer.setStyle(this.el.nativeElement, 'top', `${top - diffy - 150}px`);
            this.renderer.setStyle(this.el.nativeElement, 'left', `${left - diffx}px`);
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

}
