import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { visitSiblingRenderNodes } from '@angular/core/src/view/util';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    @Output()
    private menuClick: EventEmitter<string> = new EventEmitter();

    private unsubcriber = [];

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.hideAllMenus();

        let elements = document.getElementsByClassName('dropdown-toggle');

        for (let i = 0; i < elements.length; i++) {
            this.unsubcriber.push(this.renderer.listen(elements[i], 'click', (event) => {
                event.stopPropagation();
                let sibling = this.renderer.nextSibling(event.target);

                if (sibling.style.display == 'none') {
                    this.renderer.setStyle(sibling, 'display', 'inherit');
                } else {
                    this.renderer.setStyle(sibling, 'display', 'none');
                }
            }));
        }

        this.renderer.listen(document, 'click', (event) => {
            event.stopPropagation();
            this.hideAllMenus();
        });
    }

    hideAllMenus() {
        let elements = document.getElementsByClassName('d-menu');
        for (let i = 0; i < elements.length; i++) {
            this.renderer.setStyle(elements[i], 'display', 'none');
        }
    }

    ngOnDestroy(): void {
        for (let i = 0; i < this.unsubcriber.length; i++) {
            this.unsubcriber[i]();
        }
    }
}
