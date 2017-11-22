import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  authState$: Observable<fromAuth.State>;

  constructor(public authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  onLogout() {
    this.authService.logout();
  }

}
