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

  onChat(index: number) {
    this.store.dispatch(new ChatActions.SetCurrentChat(index));
    this.router.navigate(['chat/chat']);
  }

}
