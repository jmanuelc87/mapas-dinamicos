import { Component, OnInit, EventEmitter, Output, ComponentRef } from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    @Output()
    public closed: EventEmitter<any> = new EventEmitter();

    private ref: ComponentRef<DialogComponent>;

    public set ComponentRef(v: ComponentRef<DialogComponent>) {
        this.ref = v;
    }

    constructor() { }

    ngOnInit() { }

    private _close(event) {
        this.ref.destroy();
        this.closed.emit(null);
    }

}
