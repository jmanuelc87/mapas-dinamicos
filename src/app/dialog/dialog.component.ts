import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    @Output()
    public close: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    private _close(event) {
        this.close.emit('close');
    }

}
