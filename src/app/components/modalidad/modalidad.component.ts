import { Component, OnInit, Input } from '@angular/core';
import { v4 as uuid } from "uuid";

@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.component.html',
  styleUrls: ['./modalidad.component.css']
})
export class ModalidadComponent implements OnInit {

  @Input()
  private id;

  constructor() { }

  ngOnInit() {
    this.id = uuid();
  }

}
