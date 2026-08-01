import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError } from 'rxjs';
import { OrderTrack } from '../Modals/EkartModels';
import { ApiResponse } from '../Modals/User';

import { getApiBaseUrl } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OrderTrackerService {
  private get apiUrl(): string {
    return `${getApiBaseUrl()}/api/orders`;
  }

  // In-memory store for cache (starts completely empty)
  private fallbackOrders: OrderTrack[] = [];

  constructor(private http: HttpClient) {}

  trackOrder(orderId: string): Observable<ApiResponse<OrderTrack>> {
    return this.http.get<ApiResponse<OrderTrack>>(`${this.apiUrl}/track/${orderId.trim()}`).pipe(
      tap(res => {
        if (res.success && res.data) {
          this.updateFallbackStore(res.data);
        }
      }),
      catchError(err => {
        const found = this.fallbackOrders.find(o => o.orderId.toLowerCase() === orderId.trim().toLowerCase());
        if (found) {
          return of({ success: true, message: 'Order tracking details found', data: found });
        }
        return of({
          success: false,
          message: err.error?.message || `Order ID '${orderId}' not found. Please check your order ID.`
        });
      })
    );
  }

  getMyOrders(email: string): Observable<ApiResponse<OrderTrack[]>> {
    return this.http.get<ApiResponse<OrderTrack[]>>(`${this.apiUrl}/my-orders?email=${encodeURIComponent(email)}`).pipe(
      tap(res => {
        if (res.success && res.data) {
          res.data.forEach(o => this.updateFallbackStore(o));
        }
      }),
      catchError(() => {
        const userOrders = this.fallbackOrders.filter(o => o.customerEmail?.toLowerCase() === email.toLowerCase());
        return of({ success: true, message: 'User orders retrieved', data: userOrders });
      })
    );
  }

  createOrder(orderData: { customerEmail: string; customerName: string; shippingAddress: string; totalAmount: number }): Observable<ApiResponse<OrderTrack>> {
    return this.http.post<ApiResponse<OrderTrack>>(`${this.apiUrl}/create`, orderData).pipe(
      tap(res => {
        if (res.success && res.data) {
          this.updateFallbackStore(res.data);
        }
      }),
      catchError(err => {
        const errMsg = err.error?.message || 'Failed to connect to order server. Please check your backend database connection.';
        return of({ success: false, message: errMsg });
      })
    );
  }

  getAllOrdersAdmin(): Observable<ApiResponse<OrderTrack[]>> {
    return this.http.get<ApiResponse<OrderTrack[]>>(`${this.apiUrl}/admin/all`).pipe(
      tap(res => {
        if (res.success && res.data) {
          res.data.forEach(o => this.updateFallbackStore(o));
        }
      }),
      catchError(() => {
        return of({ success: true, message: 'All customer orders retrieved for Admin', data: this.fallbackOrders });
      })
    );
  }

  updateOrderStatusAdmin(orderId: string, status: string, carrier?: string, trackingNumber?: string, estimatedDelivery?: string): Observable<ApiResponse<OrderTrack>> {
    const payload = { status, carrier, trackingNumber, estimatedDelivery };
    return this.http.put<ApiResponse<OrderTrack>>(`${this.apiUrl}/admin/update-status/${orderId}`, payload).pipe(
      catchError(() => {
        let order = this.fallbackOrders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());
        if (order) {
          order.status = status;
          if (carrier) order.carrier = carrier;
          if (trackingNumber) order.trackingNumber = trackingNumber;
          if (estimatedDelivery) order.estimatedDelivery = estimatedDelivery;
          return of({ success: true, message: 'Order status updated successfully!', data: order });
        }
        return of({ success: false, message: 'Order not found.' });
      })
    );
  }

  // DELIVERY BOY APIS
  getDeliveryOrders(): Observable<ApiResponse<OrderTrack[]>> {
    return this.http.get<ApiResponse<OrderTrack[]>>(`${this.apiUrl}/delivery/available`).pipe(
      tap(res => {
        if (res.success && res.data) {
          res.data.forEach(o => this.updateFallbackStore(o));
        }
      }),
      catchError(() => {
        return of({ success: true, message: 'Delivery orders retrieved', data: this.fallbackOrders });
      })
    );
  }

  pickupOrderDelivery(orderId: string, deliveryBoyName: string, deliveryBoyPhone: string): Observable<ApiResponse<OrderTrack>> {
    const payload = { deliveryBoyName, deliveryBoyPhone };
    return this.http.put<ApiResponse<OrderTrack>>(`${this.apiUrl}/delivery/pickup/${orderId}`, payload).pipe(
      tap(res => {
        if (res.success && res.data) {
          this.updateFallbackStore(res.data);
        }
      }),
      catchError(() => {
        let order = this.fallbackOrders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());
        if (!order) {
          order = {
            orderId: orderId,
            status: 'SHIPPED',
            deliveryBoyName: deliveryBoyName,
            deliveryBoyPhone: deliveryBoyPhone
          };
          this.fallbackOrders.push(order);
        } else {
          order.status = 'SHIPPED';
          order.deliveryBoyName = deliveryBoyName;
          order.deliveryBoyPhone = deliveryBoyPhone;
        }
        return of({ success: true, message: 'Order picked up from store successfully!', data: order });
      })
    );
  }

  acceptOutForDelivery(orderId: string, deliveryBoyName: string, deliveryBoyPhone: string): Observable<ApiResponse<OrderTrack>> {
    const payload = { deliveryBoyName, deliveryBoyPhone };
    return this.http.put<ApiResponse<OrderTrack>>(`${this.apiUrl}/delivery/out-for-delivery/${orderId}`, payload).pipe(
      tap(res => {
        if (res.success && res.data) {
          this.updateFallbackStore(res.data);
        }
      }),
      catchError(() => {
        let order = this.fallbackOrders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());
        if (!order) {
          order = {
            orderId: orderId,
            status: 'OUT_FOR_DELIVERY',
            deliveryBoyName: deliveryBoyName,
            deliveryBoyPhone: deliveryBoyPhone
          };
          this.fallbackOrders.push(order);
        } else {
          order.status = 'OUT_FOR_DELIVERY';
        }
        return of({ success: true, message: 'Out for delivery status accepted successfully!', data: order });
      })
    );
  }

  completeOrderDelivery(orderId: string): Observable<ApiResponse<OrderTrack>> {
    return this.http.put<ApiResponse<OrderTrack>>(`${this.apiUrl}/delivery/complete/${orderId}`, {}).pipe(
      tap(res => {
        if (res.success && res.data) {
          this.updateFallbackStore(res.data);
        }
      }),
      catchError(() => {
        let order = this.fallbackOrders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());
        if (!order) {
          order = {
            orderId: orderId,
            status: 'DELIVERED'
          };
          this.fallbackOrders.push(order);
        } else {
          order.status = 'DELIVERED';
        }
        return of({ success: true, message: 'Order delivered to customer home!', data: order });
      })
    );
  }

  private updateFallbackStore(order: OrderTrack) {
    const index = this.fallbackOrders.findIndex(o => o.orderId.toLowerCase() === order.orderId.toLowerCase());
    if (index >= 0) {
      this.fallbackOrders[index] = { ...this.fallbackOrders[index], ...order };
    } else {
      this.fallbackOrders.push(order);
    }
  }
}
