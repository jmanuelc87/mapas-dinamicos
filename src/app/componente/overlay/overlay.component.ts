import { Component, OnInit, Input } from '@angular/core';
import { PicoEvent } from 'picoevent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  private channel: Subscription;

  private modalShow: boolean;

  constructor(
    private pico: PicoEvent
  ) { }

  ngOnInit() {

    this.channel = this.pico.listen({
      type: Boolean,
      targets: ['show-overlay']
    }, value => this.show(value));
  }

  stop(event) {
    event.stoppropagation();
  }

  show(value) {
    this.modalShow = value;
  }

}
