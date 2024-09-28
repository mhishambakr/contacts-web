import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private authSecretKey = 'access_token';
  private users: User[] = [
    { username: 'user1', password: 'user1' },
    { username: 'user2', password: 'user2' }
  ];

  constructor() {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  login({ username, password }: User): Observable<boolean> {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (!user) {
      return throwError(new Error('Invalid username or password'));
    }
    localStorage.setItem(this.authSecretKey, 'token');
    this.isAuthenticated = true;
    return of(true);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): Observable<void> {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    return of(undefined);
  }
}
