import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  onSendMessage(f: NgForm) {
    this.chatService.sendMessage(f.value.message);
    f.reset();
  }

}
