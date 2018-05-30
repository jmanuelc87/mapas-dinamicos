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

    @ViewChild('toogle')
    private elementViewEl: ElementRef;

    @Output()
    private menuClick: EventEmitter<string> = new EventEmitter();

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit() {

    }

    private show(event) {
        event.stopPropagation();
        this.renderer.setStyle(this.elementViewEl.nativeElement, 'display', 'block');
    }

    @HostListener('document:click', ['$event'])
    private hide(event) {
        this.renderer.setStyle(this.elementViewEl.nativeElement, 'display', 'none');
    }

    private onClick(event) {
        this.menuClick.emit(event.target.innerText);
    }
}
