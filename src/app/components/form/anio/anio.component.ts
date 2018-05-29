import { Component, OnInit, Input } from '@angular/core';
import { Anio } from '../../../models/Anio';
import { AnioService } from '../../../services/anio.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anio',
  templateUrl: './anio.component.html',
  styleUrls: ['./anio.component.css']
})
export class AnioComponent implements OnInit {

  private anios: Anio[];

  @Input()
  private id;

  @Input()
  private group: FormGroup;

  @Input()
  private name: string;

  constructor(
    private anioService: AnioService,
  ) { }

  ngOnInit() {
    this.anioService
      .getAllAnios()
      .subscribe((anios: Anio[]) => {
        this.anios = anios;
      }, err => console.error(err), () => console.debug('get all years completed'));
  }

}
