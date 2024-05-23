import { HttpClient } from '@angular/common/http';
//import { Token } from '@angular/compiler';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly verifyAuthUrl = 'http://localhost:3000/api/verify-auth';
  //public $refreshToken = new Subject<boolean>;

  signalToken: any;

  private router = inject(Router);

  private http = inject(HttpClient);

  constructor() {
    this.loggedUser = '';
  }

  // login(user: { email: string, password: string }) {
  //   return this.http.post('http://localhost:3000/login', user, { withCredentials: true })
  // }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/login', user).pipe(
      tap((tokens: any) => this.doLoginUser(user.email, JSON.stringify(tokens)))
    )
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  storeJwtToken(jwt: string) {
    this.signalToken = jwt;
  }

  getCurrentAuthUser() {
    return this.http.get('http://localhost:3000/api/userinfo', this.signalToken);

  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }


  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(this.verifyAuthUrl, { withCredentials: true })
      .pipe(
        catchError(err => {
          console.error('Error verifying authentication:', err);
          // Handle error appropriately (e.g., redirect to login)
          return of(false); // Return false to indicate not authenticated
        })
      );
  }

  refreshToken() {
    // let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    // if (!tokens) return;
    // tokens = JSON.parse(tokens);
    // let refreshToken = tokens.refreshToken;

    // return this.http.post<any>('http://localhost:3000/auth/refresh-token', {
    //   refreshToken,
    // })
    //   .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
  }
}
