import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Estado } from '../../../models/Estado';
import { MunicipioService } from '../../../services/municipio.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit {

  private municipios: Estado[] = [
    { id: 0, name: "Todos" }
  ];

  @Input()
  private id;

  @Input()
  private group: FormGroup;

  @Input()
  private name: string;

  @Output()
  private selected: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private municipioService: MunicipioService
  ) { }

  ngOnInit() {
  }

  private onChange(event) {
    this.selected.emit(event);
  }

  public fetch(estadoid: number, distritoid: number) {
    this.municipioService
      .getMunicipioByEstadoAndDistrito(estadoid, distritoid)
      .subscribe(municipios => municipios.forEach(value => this.municipios.push(value)));
  }

}
