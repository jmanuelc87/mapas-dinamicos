import { Component, OnInit, Input } from '@angular/core';
import { v4 as uuid } from "uuid";
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit {

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
