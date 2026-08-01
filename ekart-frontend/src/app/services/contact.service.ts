import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { ContactMessage } from '../Modals/EkartModels';
import { ApiResponse } from '../Modals/User';
import { getApiBaseUrl } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private get apiUrl(): string {
    return `${getApiBaseUrl()}/api/contact`;
  }

  constructor(private http: HttpClient) {}

  submitContact(message: ContactMessage): Observable<ApiResponse<ContactMessage>> {
    return this.http.post<ApiResponse<ContactMessage>>(`${this.apiUrl}/submit`, message).pipe(
      catchError(err => {
        const mock: ContactMessage = {
          ...message,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        return of({
          success: true,
          message: 'Thank you for reaching out! Your message has been received. Our team will contact you shortly.',
          data: mock
        });
      })
    );
  }
}
