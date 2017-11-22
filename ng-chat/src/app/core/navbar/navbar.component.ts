import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  authState$: Observable<fromAuth.State>;

  constructor(public authService: AuthService, private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/signin']);
    // this.authService.logout();
  }

}
