import { Component, OnInit, EventEmitter, Output, Renderer2, Input } from '@angular/core';
import { ScannerService } from '../../services/scanner.service';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

    private defaultColor = [0, 176, 80];

    visibility = false;

    @Output()
    colorSelect: EventEmitter<any> = new EventEmitter();

    constructor(
        private renderer: Renderer2,
        private scanner: ScannerService,
    ) { }

    ngOnInit() {
    }

    onColorSelect(event) {
        this.defaultColor = event.target.style.backgroundColor;
        let RGBColor = this.convertColorStringToArray(this.defaultColor);
        this.colorSelect.emit(RGBColor);
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

}
