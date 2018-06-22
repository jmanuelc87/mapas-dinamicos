import { Component, OnInit, EventEmitter, Output, Renderer2, OnDestroy } from '@angular/core';
import { ScannerService } from '../../services/scanner.service';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit, OnDestroy {

    private defaultColor = [0, 176, 80];

    private background_color = '#00B050';

    private visibility = false;

    private showed = false;

    private listener;

    @Output()
    colorSelect: EventEmitter<any> = new EventEmitter();

    constructor(
        private renderer: Renderer2,
        private scanner: ScannerService,
    ) { }

    ngOnInit() {
        this.listener = this.renderer.listen(document, 'click', (ev) => {
            if (!(ev.target.classList.contains('button') || ev.target.classList.contains('color-picker'))) {
                ev.stopPropagation();
                this.hide();
                this.showed = false;
            }
        })
    }

    ngOnDestroy(): void {
        if (this.listener) {
            this.listener();
        }
    }

    onColorSelect(event) {
        this.defaultColor = this.background_color = event.target.style.backgroundColor;
        let RGBColor = this.convertColorStringToArray(this.defaultColor);
        this.colorSelect.emit(RGBColor);
        this.showed = false;
        this.hide();
    }

    getSelectedColor() {
        return this.defaultColor;
    }

    show() {
        return this.visibility = !this.visibility;
    }

    hide() {
        return this.visibility = false;
    }

    convertColorStringToArray(color) {
        this.scanner.addContent(color);
        let r = this.scanner.parseNext();
        let g = this.scanner.parseNext();
        let b = this.scanner.parseNext();

        return [r, g, b];
    }

    onHandleClick() {
        if (!this.showed) {
            this.show();
        } else {
            this.hide();
        }
        this.showed = !this.showed;
    }

}
