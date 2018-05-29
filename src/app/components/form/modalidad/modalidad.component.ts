import { Component, OnInit, Input } from '@angular/core';
import { v4 as uuid } from "uuid";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.component.html',
  styleUrls: ['./modalidad.component.css']
})
export class ModalidadComponent implements OnInit {

  @Input()
  id;

  @Input()
  group: FormGroup;

  @Input()
  name: string;

  constructor() { }

  ngOnInit() {
    this.id = uuid();
  }

}
