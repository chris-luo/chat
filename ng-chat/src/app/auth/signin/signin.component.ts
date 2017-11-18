import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private router: Router
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
        this.authService.setToken(res['data']);
        this.router.navigate(['/chat']);
      },
      error => {
        console.error(error.error);
      });
  }

}
