import {
    Component,
    ComponentRef,
    EventEmitter,
    Input,
    OnInit,
    Output
    } from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    @Output()
    public closed: EventEmitter<any> = new EventEmitter();

    @Input()
    public title = 'Dialogo...';

    private ref: ComponentRef<DialogComponent>;

    public set ComponentRef(v: ComponentRef<DialogComponent>) {
        this.ref = v;
    }

    constructor() { }

    ngOnInit() { }

    private close(event) {
        this.ref.destroy();
        this.closed.emit(null);
    }

}
