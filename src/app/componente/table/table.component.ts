import { Component, OnInit } from '@angular/core';
import { Cultivo } from '../../dominio/cultivo';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  private show: boolean;

  private data: Array<Cultivo>;

  

  constructor() { }

  ngOnInit() {

  }

  public setData(data) {
    this.data = data;
    this.show = true;
  }
}
