import { Component, OnInit, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    @Output()
    public menuClicked: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    private open(event): void {
        const html = event.target.innerHTML;
        this.menuClicked.emit(html.trim());
    }

}
