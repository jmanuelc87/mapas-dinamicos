import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[setDraggable]'
})
export class DraggableDirective {

    pos1: number = 0;
    pos2: number = 0;
    pos3: number = 0;
    pos4: number = 0;
    removeMouseDownListener;
    removeMouseDownListener2;
    removeMouseMoveListener;
    removeMouseUpListener;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit() {
        let target = this.el.nativeElement.querySelector('div.window-caption');
        this.removeMouseDownListener = this.renderer.listen(target, 'mousedown', (e) => this.windowStart(e));
        this.removeMouseDownListener2 = this.renderer.listen(target, 'mousedown', (e) => { e.stopPropagation(); });
    }

    windowStart(e) {
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        this.removeMouseUpListener = this.renderer.listen(document, 'mouseup', () => this.windowCloseDragElement());
        this.removeMouseMoveListener = this.renderer.listen(document, 'mousemove', (e2) => this.windowOnDrag(e2));
    }

    windowOnDrag(e2) {
        e2.stopPropagation();
        this.pos1 = this.pos3 - e2.clientX;
        this.pos2 = this.pos4 - e2.clientY;

        this.pos3 = e2.clientX;
        this.pos4 = e2.clientY;

        let top = this.el.nativeElement.offsetTop - this.pos2;
        let left = this.el.nativeElement.offsetLeft - this.pos1;

        if (top < 0 || top >= screen.height) {
            return;
        }

        if (left < 0 || left >= screen.width) {
            return;
        }

        this.renderer.setStyle(this.el.nativeElement, 'top', `${top}px`);
        this.renderer.setStyle(this.el.nativeElement, 'left', `${left}px`);
    }

    windowCloseDragElement() {
        this.removeMouseUpListener();
        this.removeMouseMoveListener();
        this.removeMouseDownListener2();
    }
}
