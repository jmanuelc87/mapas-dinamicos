import { Component, OnInit, EventEmitter, Output, Renderer2, OnDestroy } from '@angular/core';
import { Color } from '../../models/color';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit, OnDestroy {

    defaultColor: Color = new Color([0, 176, 80]);

    background_color = this.defaultColor.toHex();

    visibility = false;

    showed = false;

    listener;

    @Output()
    colorSelect: EventEmitter<Color> = new EventEmitter();

    constructor(
        private renderer: Renderer2,
    ) { }

    ngOnInit() {

        this.defaultColor = new Color([0, 176, 80]);
        this.background_color = this.defaultColor.toHex();


        this.listener = this.renderer.listen(document, 'click', (ev) => {
            if (!(ev.target.classList.contains('btn') || ev.target.classList.contains('color-picker'))) {
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
        console.log("color seleccionado")
        this.background_color = event.target.style.backgroundColor;

        let color = new Color(this.background_color).toArray();

        this.colorSelect.emit(new Color(color));
        this.defaultColor = new Color(color);
        this.showed = false;
        this.hide();
    }

    getSelectedColor(): Color {
        return this.defaultColor;
    }

    show() {
        return this.visibility = !this.visibility;
    }

    hide() {
        return this.visibility = false;
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
