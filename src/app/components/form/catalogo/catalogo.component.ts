import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  @Input()
  private id;

  @Input()
  private group: FormGroup;

  @Input()
  private name: string;


  constructor() { }

  ngOnInit() {
  }

}
