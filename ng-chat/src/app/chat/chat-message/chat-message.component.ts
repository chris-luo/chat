import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnInit {
  @Input() message;

  constructor() { }

  ngOnInit() {
  }

}
