import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, catchError } from 'rxjs';
import { OrderNotification } from '../Modals/EkartModels';
import { ApiResponse } from '../Modals/User';
import { getApiBaseUrl } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private get apiUrl(): string {
    return `${getApiBaseUrl()}/api/orders`;
  }

  private notificationsSubject = new BehaviorSubject<OrderNotification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchNotifications(role?: string, email?: string): Observable<ApiResponse<OrderNotification[]>> {
    let url = `${this.apiUrl}/notifications`;
    const params: string[] = [];
    if (role) params.push(`role=${encodeURIComponent(role)}`);
    if (email) params.push(`email=${encodeURIComponent(email)}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    return this.http.get<ApiResponse<OrderNotification[]>>(url).pipe(
      catchError(() => {
        return of({ success: true, message: 'Notifications retrieved', data: this.notificationsSubject.value });
      })
    );
  }

  getOrderHistory(orderId: string): Observable<ApiResponse<OrderNotification[]>> {
    return this.http.get<ApiResponse<OrderNotification[]>>(`${this.apiUrl}/notifications/${orderId.trim()}`).pipe(
      catchError(() => {
        const local = this.notificationsSubject.value.filter(n => n.orderId?.toLowerCase() === orderId.toLowerCase());
        return of({ success: true, message: 'Order history retrieved', data: local });
      })
    );
  }

  addNotificationLocal(notification: OrderNotification) {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([notification, ...current]);
  }
}
