import { Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ChatService } from './chat.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private chatService: ChatService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.chatService.newMessage
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      this.messages = [...this.messages, ...data];
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.chatService.disconnect();
  }
}
