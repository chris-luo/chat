import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.signInForm = new FormGroup({
      "email": new FormControl(null),
      "password": new FormControl(null)
    });
  }

  onSignIn() {
    this.store.dispatch(new AuthActions.TrySignin({email: this.signInForm.value.email, password: this.signInForm.value.password}));
    // this.authService.signIn({email: this.signInForm.value.email, password: this.signInForm.value.password})
    //   .subscribe(res => {
    //     this.store.dispatch(new AuthActions.Signup());
    //     this.store.dispatch(new AuthActions.SetToken(res['data']));
    //     // this.authService.setToken(res['data']);
    //     this.router.navigate(['/chat']);
    //   },
    //   error => {
    //     console.error(error.error);
    //   });
  }

}
