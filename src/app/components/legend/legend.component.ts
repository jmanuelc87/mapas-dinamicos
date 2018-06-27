import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { LegendService } from '../../services/legend.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit {

    position = "bottom-right";

    @ViewChild('root')
    root: ElementRef;

    legendServiceSubscription: Subscription;

    removeLegendServiceSubscription: Subscription;

    title: string;

    query: string;

    props: Array<any>;

    constructor(
        private renderer: Renderer2,
        private legendService: LegendService,
    ) { }

    ngOnInit() {
        this.legendServiceSubscription = this.legendService.legendRequest.subscribe((legend) => {
            console.log('added properties');
            this.title = legend.title;
            this.query = legend.query;
            this.props = legend.props;
            this.renderer.removeClass(this.root.nativeElement, 'hidden');
        });

        this.removeLegendServiceSubscription = this.legendService.removeLegendRequest.subscribe(() => {
            this.renderer.addClass(this.root.nativeElement, 'hidden');
        });
    }

    ngOnDestroy(): void {
        if (this.legendServiceSubscription != null) {
            this.legendServiceSubscription.unsubscribe();
        }
    }

}
