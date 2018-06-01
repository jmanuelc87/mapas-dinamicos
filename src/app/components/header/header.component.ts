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

    @Output()
    private menuClick: EventEmitter<string> = new EventEmitter();

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit() {

    }

    private onClick(event) {
        this.menuClick.emit(event.target.innerText);
    }
}
