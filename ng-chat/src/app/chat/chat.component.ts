import { Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ChatService } from './chat.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromChat from './store/chat.reducers';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  chatState$: Observable<fromChat.State>

  constructor(private chatService: ChatService, private store: Store<fromChat.FeatureState>) { }

  ngOnInit() {
    this.chatState$ = this.store.select('chat');
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  onMessage(message: string) {
    this.chatService.sendMessage(message);
  }
}
