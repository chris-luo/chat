import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromChat from '../store/chat.reducers';
import * as ChatActions from '../store/chat.actions';

import { Chat } from '../chat.model';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsComponent implements OnInit {
  chatState$: Observable<fromChat.State>;

  constructor(private store: Store<fromChat.FeatureState>, private router: Router) { }

  ngOnInit() {
    this.chatState$ = this.store.select('chat');
    this.store.dispatch(new ChatActions.GetChats());
  }

  onChat(chat: Chat, index: number) {
    this.store.dispatch(new ChatActions.SetCurrentChat(index));
    this.store.dispatch(new ChatActions.GetChatMessages({
      chat_id: chat.id,
      message_id: chat.messages[0].id
    }));
    // this.store.dispatch(new ChatActions.JoinRoom(chat.id));
    this.router.navigate(['chat/chat']);
  }

}
