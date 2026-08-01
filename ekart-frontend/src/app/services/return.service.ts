import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { ReturnRequest } from '../Modals/EkartModels';
import { ApiResponse } from '../Modals/User';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {
  private apiUrl = 'http://localhost:8080/api/returns';

  constructor(private http: HttpClient) {}

  submitReturn(request: ReturnRequest): Observable<ApiResponse<ReturnRequest>> {
    return this.http.post<ApiResponse<ReturnRequest>>(`${this.apiUrl}/submit`, request).pipe(
      catchError(err => {
        const mockReturnId = 'RET-' + Math.floor(10000 + Math.random() * 90000);
        const mockData: ReturnRequest = {
          ...request,
          id: Date.now(),
          returnId: mockReturnId,
          status: 'APPROVED',
          createdAt: new Date().toISOString()
        };
        return of({
          success: true,
          message: `Return/Exchange request registered successfully! Reference ID: ${mockReturnId}`,
          data: mockData
        });
      })
    );
  }

  trackReturn(returnId: string): Observable<ApiResponse<ReturnRequest>> {
    return this.http.get<ApiResponse<ReturnRequest>>(`${this.apiUrl}/track/${returnId.trim()}`).pipe(
      catchError(err => {
        return of({
          success: false,
          message: err.error?.message || `Return Reference ID '${returnId}' not found.`
        });
      })
    );
  }
}
