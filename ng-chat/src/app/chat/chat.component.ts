import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  messages = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.newMessage.subscribe(data => {
      console.log(data);
      this.messages.push(data);
    });
  }

  onSendMessage(f: NgForm) {
    this.chatService.sendMessage(f.value.message);
    f.reset();
  }

}
