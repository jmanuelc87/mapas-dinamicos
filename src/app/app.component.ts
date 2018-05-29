import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    /*
    private group: FormGroup = this.fb.group({
        anio: ['', Validators.required]
    });

    constructor(
        private fb: FormBuilder
    ) { }
    */
}
