import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ChatService } from './chat.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.newMessage
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      console.log(data);
      this.messages.push(data);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSendMessage(f: NgForm) {
    this.chatService.sendMessage(f.value.message);
    f.reset();
  }

}
