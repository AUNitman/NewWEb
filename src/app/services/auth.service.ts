import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_URL } from '../../constants';
import { catchError, throwError } from 'rxjs';
import { IAuthForm, IRegisterForm } from './interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuth = signal<boolean | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(userData: IAuthForm) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${API_URL}/login/`, userData, {
        headers,
        withCredentials: true,
      })
      .pipe()
      .subscribe((data) => {
        this.isAuth.set(true);
        this.router.navigate(['/']);
      });
  }

  register(userData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${API_URL}/register/`, userData, {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          // Обработка ошибок
          console.error('An error occurred:', error);
          return throwError(error);
        })
      )
      .subscribe((data) => {
        console.log('registration succesful', data);
        this.isAuth.set(true);
      });
  }

  refreshToken() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${API_URL}/token/refresh/`, null, {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          // Обработка ошибок
          console.error('An error occurred:', error);
          return throwError(error);
        })
      )
      .subscribe((data) => {
        console.log('refresh', data);
        this.isAuth.set(true);
      });
  }

  logout() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<any>(`${API_URL}/logout/`, null, {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          // Обработка ошибок
          console.error('An error occurred:', error);
          return throwError(error);
        })
      )
      .subscribe((data) => {
        console.log('logout', data);
        this.isAuth.set(false);
      });
  }
}
