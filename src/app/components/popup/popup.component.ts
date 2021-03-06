import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';
import { debounceTime } from 'rxjs/operators';
import { PopupService } from '../../services/popup.service';


@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

    consulta: any;

    value: any = {
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
    el: ElementRef;

    constructor(
        private mapService: EsriMapService,
        private popupService: PopupService,
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        this.mapService.popupSubject.pipe(debounceTime(350)).subscribe((point) => {

            if (!point.show) {
                this.renderer.addClass(this.el.nativeElement, 'hidden');
                return;
            } else {
                this.consulta.attributes = point.graphic.attributes;

                // search for values in db to fill the popup
                this.popupService.getCierreByAnuario(this.consulta).subscribe((values) => {
                    this.value = values.pop();
                    this.renderer.removeClass(this.el.nativeElement, 'hidden');
                }, err => console.error(err));
            }

            let top = this.el.nativeElement.offsetTop;
            let left = this.el.nativeElement.offsetLeft;

            let diffy = this.el.nativeElement.offsetTop - point.y;
            let diffx = this.el.nativeElement.offsetLeft - point.x;

            this.renderer.setStyle(this.el.nativeElement, 'top', `${top - diffy - 100}px`);
            this.renderer.setStyle(this.el.nativeElement, 'left', `${left - diffx}px`);
        });

        this.popupService.queryConsultaSubject.subscribe((consulta) => {
            this.consulta = consulta;
        });
    }


    hasEstado() {
        return this.consulta && this.consulta.hasOwnProperty('attributes') && this.consulta.attributes.hasOwnProperty('CVE_ENT');
    }

    hasDistrito() {
        return this.consulta && this.consulta.hasOwnProperty('attributes') && this.consulta.attributes.hasOwnProperty('CVE_DDR');
    }

    hasMunicipio() {
        return this.consulta && this.consulta.hasOwnProperty('attributes') && this.consulta.attributes.hasOwnProperty('CVE_MUN');
    }

}
