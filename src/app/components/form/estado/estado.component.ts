import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/estado.service';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  private estados: Estado[];

  @Input()
  private id;

  @Input()
  private group: FormGroup;

  @Input()
  private name: string;

  constructor(
    private estadoService: EstadoService,
  ) { }

  ngOnInit() {
    this.estadoService
      .getAllEstados()
      .subscribe((estados: Estado[]) => this.estados = estados,
        err => console.error(err),
        () => console.debug('get all states completed'));
  }

}
