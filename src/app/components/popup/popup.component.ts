import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PopupService } from '../../services/popup.service';


@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {

    private subs1: Subscription;

    private subs2: Subscription;

    private consulta: any;

    private value: any = {
        cultivo: '',
        estado: '',
        distrito: '',
        municipio: '',
        sembrada: '',
        cosechada: '',
        produccion: '',
        valor: '',
    };

    @ViewChild('popup')
    private el: ElementRef;

    constructor(
        private mapService: EsriMapService,
        private popupService: PopupService,
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        this.subs1 = this.mapService.popupSubject.pipe(debounceTime(350)).subscribe((point) => {

            if (!point.show) {
                this.renderer.addClass(this.el.nativeElement, 'hidden');
                return;
            } else {
                this.consulta.attributes = point.graphic.attributes;

                // search for values in db to fill the popup
                this.popupService.getCierreByAnuario(this.consulta).subscribe((values) => {
                    console.log(values);
                    this.value = values.pop();
                    this.renderer.removeClass(this.el.nativeElement, 'hidden');
                }, err => console.error(err));
            }

            let top = this.el.nativeElement.offsetTop;
            let left = this.el.nativeElement.offsetLeft;

            let diffy = this.el.nativeElement.offsetTop - point.y;
            let diffx = this.el.nativeElement.offsetLeft - point.x;

            this.renderer.setStyle(this.el.nativeElement, 'top', `${top - diffy - 150}px`);
            this.renderer.setStyle(this.el.nativeElement, 'left', `${left - diffx}px`);
        });

        this.subs2 = this.popupService.queryConsultaSubject.subscribe((consulta) => {
            this.consulta = consulta;
        });
    }

    ngOnDestroy(): void {
        this.subs1.unsubscribe();
        this.subs2.unsubscribe();
    }

}
