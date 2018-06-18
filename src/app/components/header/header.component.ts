import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);

    private leftMenu = {
        'marginLeft': '0',
    };

    @Output()
    private menuClick: EventEmitter<string> = new EventEmitter();

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit() {

        console.log(this.isIEOrEdge);

        if (this.isIEOrEdge) {
            this.leftMenu = {
                'marginLeft': '-110px',
            };
        }
    }

    private onClick(event) {
        this.menuClick.emit(event.target.innerText);
    }
}
