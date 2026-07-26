import { Component } from '@angular/core';
import { ReturnService } from '../../services/return.service';
import { ReturnRequest } from '../../Modals/EkartModels';

@Component({
  selector: 'app-exchange-return',
  templateUrl: './exchange-return.component.html',
  styleUrls: ['./exchange-return.component.css']
})
export class ExchangeReturnComponent {
  returnForm: ReturnRequest = {
    orderId: '',
    userEmail: '',
    requestType: 'EXCHANGE',
    reason: 'Size Too Small',
    itemDetails: ''
  };

  reasons = [
    'Size Too Small',
    'Size Too Large',
    'Defective / Damaged Item',
    'Item Received Different From Description',
    'Changed My Mind'
  ];

  submitting = false;
  successMessage = '';
  errorMessage = '';

  // Track return status lookup
  lookupReturnId = '';
  trackedReturn: ReturnRequest | null = null;
  lookupError = '';

  constructor(private returnService: ReturnService) {}

  onSubmitRequest() {
    if (!this.returnForm.orderId || !this.returnForm.userEmail) {
      this.errorMessage = 'Please enter your Order ID and Email Address.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.returnService.submitReturn(this.returnForm).subscribe(res => {
      this.submitting = false;
      if (res.success && res.data) {
        this.successMessage = res.message;
        this.returnForm = {
          orderId: '',
          userEmail: '',
          requestType: 'EXCHANGE',
          reason: 'Size Too Small',
          itemDetails: ''
        };
      } else {
        this.errorMessage = res.message || 'Error registering return request.';
      }
    });
  }

  onTrackReturn() {
    if (!this.lookupReturnId) return;

    this.lookupError = '';
    this.trackedReturn = null;
    this.returnService.trackReturn(this.lookupReturnId).subscribe(res => {
      if (res.success && res.data) {
        this.trackedReturn = res.data;
      } else {
        this.lookupError = res.message || 'Return ID not found.';
      }
    });
  }
}
