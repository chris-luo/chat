import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { Message } from '../message.model';
import { Store } from '@ngrx/store';
import * as fromChat from '../store/chat.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../../auth/store/auth.reducers'

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  authState$: Observable<fromAuth.State>

  constructor(private store:Store<fromChat.FeatureState>) { }

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

}
