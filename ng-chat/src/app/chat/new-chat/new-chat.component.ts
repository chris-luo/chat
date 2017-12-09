import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromChat from '../store/chat.reducers';
import * as ChatActions from '../store/chat.actions';
import { Chat } from '../chat.model';
import { ChatService } from '../chat.service';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewChatComponent implements OnInit {
  form: FormGroup;

  constructor(
    private apiService: ApiService, 
    private store: Store<fromChat.FeatureState>, 
    private chatService: ChatService, 
    private router: Router,
    private snakeBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      to: new FormControl(null, {updateOn: 'blur', asyncValidators: [this.checkUser.bind(this)]})
    });
  }

  checkUser(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (control.value===null) {
        resolve({'user': true});
      } else {
        this.apiService.findUser(control.value).subscribe(res => {
          resolve(null);
              }, error => {
                this.snakeBar.open(error.error, 'X', {duration: 3000});
                resolve({'user': true});
              });
      }
    });
    return promise;
  }

  onMessage(message: string) {
    if (!this.form.valid) {
      return;
    }
    const newChat = {
      user: this.form.value.to,
      message: message
    }
    this.store.dispatch(new ChatActions.TryNewChat(newChat));
    // this.router.navigate(['chat/chat']);
  }

}
