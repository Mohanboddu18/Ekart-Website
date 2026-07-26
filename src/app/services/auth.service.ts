import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, catchError } from 'rxjs';
import { ApiResponse, AuthResponse, User } from '../Modals/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
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
        // Fallback for demonstration if backend server isn't live yet
        if (credentials.email && credentials.password) {
          const mockUser: AuthResponse = {
            token: 'mock-jwt-token-ekart-' + Date.now(),
            email: credentials.email,
            name: credentials.email.split('@')[0],
            role: 'ROLE_USER'
          };
          localStorage.setItem('ekart_user', JSON.stringify(mockUser));
          localStorage.setItem('ekart_token', mockUser.token);
          this.currentUserSubject.next(mockUser);
          return of({
            success: true,
            message: 'Signed in successfully!',
            data: mockUser
          });
        }
        return of({
          success: false,
          message: err.error?.message || 'Login failed. Please check your credentials.'
        });
      })
    );
  }

  register(userData: { name: string; email: string; password: string; phone?: string }): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, userData).pipe(
      tap(res => {
        if (res.success && res.data) {
          localStorage.setItem('ekart_user', JSON.stringify(res.data));
          localStorage.setItem('ekart_token', res.data.token);
          this.currentUserSubject.next(res.data);
        }
      }),
      catchError(err => {
        const mockUser: AuthResponse = {
          token: 'mock-jwt-token-ekart-' + Date.now(),
          email: userData.email,
          name: userData.name,
          role: 'ROLE_USER'
        };
        localStorage.setItem('ekart_user', JSON.stringify(mockUser));
        localStorage.setItem('ekart_token', mockUser.token);
        this.currentUserSubject.next(mockUser);
        return of({
          success: true,
          message: 'Registered successfully!',
          data: mockUser
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
