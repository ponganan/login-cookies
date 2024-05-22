import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'cookies-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  authService = inject(AuthService);
  user: any;

  constructor() {
    this.authService.getCurrentAuthUser().subscribe((r) => {
      console.log(r);
      this.user = r;
    })
  }

  // logout() {
  //   this.authService.logout();
  // }

  // refreshToken() {
  //   this.authService.refreshToken()?.subscribe(() => { });
  // }

  // isAccessTokenExpired() {
  //   this.authService.isAccessTokenExpired();
  // }

  // isRefreshTokenExpired() {
  //   this.authService.isRefreshTokenExpired();
  // }

}
