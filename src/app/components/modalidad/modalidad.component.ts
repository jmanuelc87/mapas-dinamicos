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
  private id;

  @Input()
  private group: FormGroup;

  @Input()
  private name: string;

  constructor() { }

  ngOnInit() {
    this.id = uuid();
  }

}
