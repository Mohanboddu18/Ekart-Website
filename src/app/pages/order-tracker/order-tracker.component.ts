import { Component } from '@angular/core';
import { OrderTrackerService } from '../../services/order-tracker.service';
import { OrderTrack } from '../../Modals/EkartModels';

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.css']
})
export class OrderTrackerComponent {
  searchOrderId = '';
  loading = false;
  orderData: OrderTrack | null = null;
  errorMessage = '';

  constructor(private orderTrackerService: OrderTrackerService) {}

  onTrackOrder() {
    if (!this.searchOrderId.trim()) {
      this.errorMessage = 'Please enter a valid Order ID (e.g. EK1001, EK1002, or EK1003)';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.orderData = null;

    this.orderTrackerService.trackOrder(this.searchOrderId.trim()).subscribe(res => {
      this.loading = false;
      if (res.success && res.data) {
        this.orderData = res.data;
      } else {
        this.errorMessage = res.message || 'Order ID not found.';
      }
    });
  }

  isStepCompleted(step: string): boolean {
    if (!this.orderData) return false;
    const status = this.orderData.status;

    if (status === 'DELIVERED') return true;
    if (status === 'IN_TRANSIT') return step === 'PROCESSING' || step === 'SHIPPED' || step === 'IN_TRANSIT';
    if (status === 'SHIPPED') return step === 'PROCESSING' || step === 'SHIPPED';
    if (status === 'PROCESSING') return step === 'PROCESSING';

    return false;
  }
}
