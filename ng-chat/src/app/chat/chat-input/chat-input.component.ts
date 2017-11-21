import { Component, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent {
  @Output() message: EventEmitter<string> = new EventEmitter<string>()

  onSendMessage(f: NgForm) {
    this.message.emit(f.value.message);
    f.reset();
  }

}
