import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Cultivo } from '../../dominio/cultivo';
import { ClrDatagrid } from '@clr/angular';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  private show: boolean;

  private data: Array<Cultivo>;

  private selectedCultivo: Cultivo;

  @ViewChild(ClrDatagrid)
  private dataGridView: ClrDatagrid;

  constructor() { }

  ngOnInit() {

  }


  ngAfterViewInit() {
    this.dataGridView.singleSelectedChanged.subscribe(event => {
      // works selection!
    });
  }

  public setData(data) {
    // manejar el procesamiento de la informacion del payload 'data'
    // guardar datos en servicio local
    this.data = data;
    this.show = true;
  }

}
