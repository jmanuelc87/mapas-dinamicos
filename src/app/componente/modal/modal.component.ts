import { Component, OnInit } from '@angular/core';
import { PicoEvent } from 'picoevent';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  private basic: boolean;

  private channel: Subscription;

  constructor(
    private pico: PicoEvent
  ) { }

  ngOnInit() {
    this.channel = this.pico.listen({
      type: Boolean,
      targets: ['show-modal']
    }, msg => {
      console.log(msg);
      this.basic = !msg
    });
  }

}
