import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, catchError } from 'rxjs';
import { ApiResponse, AuthResponse, User } from '../Modals/User';
import { getApiBaseUrl } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private get apiUrl(): string {
    return `${getApiBaseUrl()}/api/auth`;
  }
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getStoredUser(): AuthResponse | null {
    const userStr = localStorage.getItem('ekart_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUserValue && !!this.currentUserValue.token;
  }

  public get isAdmin(): boolean {
    return !!this.currentUserValue && this.currentUserValue.role === 'ROLE_ADMIN';
  }

  public get isDeliveryBoy(): boolean {
    return !!this.currentUserValue && (this.currentUserValue.role === 'ROLE_DELIVERY' || this.currentUserValue.role === 'ROLE_DELIVERY_BOY');
  }

  login(credentials: { email: string; password: string }): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res.success && res.data) {
          localStorage.setItem('ekart_user', JSON.stringify(res.data));
          localStorage.setItem('ekart_token', res.data.token);
          this.currentUserSubject.next(res.data);
        }
      }),
      catchError(err => {
        // Handle unauthorized or bad credentials cleanly without fake mock logins
        const errMsg = err.error?.message || (err.status === 401 ? 'Invalid email or password. Please try again.' : 'Login failed.');
        return of({
          success: false,
          message: errMsg
        });
      })
    );
  }

  register(userData: { name: string; email: string; password: string; phone?: string; role?: string }): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, userData).pipe(
      tap(res => {
        if (res.success && res.data) {
          localStorage.setItem('ekart_user', JSON.stringify(res.data));
          localStorage.setItem('ekart_token', res.data.token);
          this.currentUserSubject.next(res.data);
        }
      }),
      catchError(err => {
        const errMsg = err.error?.message || 'Registration failed. Please check your details.';
        return of({
          success: false,
          message: errMsg
        });
      })
    );
  }

  logout() {
    localStorage.removeItem('ekart_user');
    localStorage.removeItem('ekart_token');
    this.currentUserSubject.next(null);
  }
}
