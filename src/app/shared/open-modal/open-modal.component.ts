import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-open-modal',
  templateUrl: './open-modal.component.html',
  styleUrls: ['./open-modal.component.scss']
})
export class OpenModalComponent {
  @Output() public closeModal: EventEmitter<Event> = new EventEmitter<Event>();
}
