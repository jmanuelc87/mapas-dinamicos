import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel { }

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends DialogComponent<ConfirmModel, string> implements OnInit, ConfirmModel {

  title: string;
  message: string;

  constructor(
    dialogService: DialogService
  ) {
    super(dialogService)
  }

  ngOnInit() {
  }


  closed() {
    this.close();
  }

  confirm(color) {
    this.result = color;
    this.close();
  }
}
