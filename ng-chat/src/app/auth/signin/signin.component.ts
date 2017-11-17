import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private authService: AuthService
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
    this.authService.signIn({email: this.signInForm.value.email, password: this.signInForm.value.password})
      .subscribe(res => {
        console.log(res);
      },
      error => {
        console.log(error);
      });
  }

}
