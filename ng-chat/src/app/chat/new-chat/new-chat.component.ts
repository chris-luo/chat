import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromChat from '../store/chat.reducers';
import * as ChatActions from '../store/chat.actions';
import { Chat } from '../chat.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewChatComponent implements OnInit {

  constructor(private store: Store<fromChat.FeatureState>, private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }

  onMessage(message: string, form:NgForm) {
    console.log(message);
    console.log(form.value);
    const newChat: Chat = {
      id: 0,
      users: [{id: 9, username: form.value.to, email: 'something@gmail.com'}],
      messages: []
    }
    this.store.dispatch(new ChatActions.NewChat(newChat));
    this.chatService.sendMessage(message);
    this.router.navigate(['chat/chat']);
  }

}
