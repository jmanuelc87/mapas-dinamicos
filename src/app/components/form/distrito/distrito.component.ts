import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Estado } from '../../../models/Estado';
import { FormGroup } from '@angular/forms';
import { DistritoService } from '../../../services/distrito.service';

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.css']
})
export class DistritoComponent implements OnInit {

  private distritos: Estado[] = [
    { id: 0, name: 'Todos' }
  ];

  @Input()
  id;

  @Input()
  group: FormGroup;

  @Input()
  name: string;

  @Output()
  selected: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private distritoService: DistritoService
  ) { }

  ngOnInit() {
  }

  private onChange(event) {
    this.selected.emit(event);
  }

  public fetch(estadoid) {
    this.distritoService.getDistritoByEstado(estadoid)
      .subscribe(distritos => distritos.forEach(value => this.distritos.push(value)));
  }

}
