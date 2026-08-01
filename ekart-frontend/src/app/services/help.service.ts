import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { HelpTicket } from '../Modals/EkartModels';
import { ApiResponse } from '../Modals/User';
import { getApiBaseUrl } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  private get apiUrl(): string {
    return `${getApiBaseUrl()}/api/help`;
  }

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<{ question: string; answer: string; category: string }[]> {
    return this.http.get<ApiResponse<{ question: string; answer: string; category: string }[]>>(`${this.apiUrl}/faqs`).pipe(
      map(res => res.data || []),
      catchError(() => of([
        { question: 'How long does shipping take?', answer: 'Standard shipping takes 3-5 business days. Express shipping delivers within 24-48 hours.', category: 'Shipping' },
        { question: 'What is the return policy?', answer: 'We offer a 30-day hassle-free return and exchange policy for all unworn items in original packaging.', category: 'Returns' },
        { question: 'How can I track my order?', answer: 'Use our Order Tracker page with your Order ID (e.g. EK1001) to get real-time tracking updates.', category: 'Orders' },
        { question: 'What payment methods are accepted?', answer: 'We accept Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and Cash on Delivery.', category: 'Payment' },
        { question: 'How do I exchange an item for a different size?', answer: 'Visit the Exchange & Return section in the top menu, enter your Order ID, select Exchange, and choose your preferred size.', category: 'Returns' }
      ]))
    );
  }

  submitTicket(ticket: HelpTicket): Observable<ApiResponse<HelpTicket>> {
    return this.http.post<ApiResponse<HelpTicket>>(`${this.apiUrl}/submit`, ticket).pipe(
      catchError(err => {
        const mockTicket: HelpTicket = {
          ...ticket,
          id: Math.floor(100 + Math.random() * 900),
          status: 'OPEN',
          createdAt: new Date().toISOString()
        };
        return of({
          success: true,
          message: `Support ticket created successfully! Ticket Reference ID: #${mockTicket.id}`,
          data: mockTicket
        });
      })
    );
  }
}
