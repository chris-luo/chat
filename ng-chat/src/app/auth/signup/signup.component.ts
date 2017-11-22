import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.initalizeForm();
  }

  initalizeForm() {
    this.signupForm = new FormGroup({
      "username": new FormControl(null, Validators.required),
      "email": new FormControl(null, [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]),
      "password": new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
    })
  }

  onSignUp() {
    let user = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    }
    this.store.dispatch(new AuthActions.TrySignup(user));
    // this.authService.signup(user)
    //   .subscribe(res => {
        
    //     this.store.dispatch(new AuthActions.Signup());
    //     this.store.dispatch(new AuthActions.SetToken(res['data']));
    //     // this.authService.setToken(res['data']);
    //     this.router.navigate(['/chat']);
    //   },
    //   error => {
    //     console.error(error.error)
    //   });
  }

}
