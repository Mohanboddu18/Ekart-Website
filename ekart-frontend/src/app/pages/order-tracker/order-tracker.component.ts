import { Component, OnInit } from '@angular/core';
import { OrderTrackerService } from '../../services/order-tracker.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { OrderTrack, OrderNotification } from '../../Modals/EkartModels';

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.css']
})
export class OrderTrackerComponent implements OnInit {
  activeTab: 'search' | 'my-orders' | 'admin-panel' | 'delivery-panel' = 'search';

  searchOrderId = '';
  loading = false;
  orderData: OrderTrack | null = null;
  orderHistory: OrderNotification[] = [];
  errorMessage = '';

  userOrders: OrderTrack[] = [];
  userOrdersLoading = false;

  adminOrders: OrderTrack[] = [];
  adminOrdersLoading = false;
  adminFilterStatus = 'ALL';

  deliveryOrders: OrderTrack[] = [];
  deliveryOrdersLoading = false;
  deliveryFilterStatus = 'ALL';

  constructor(
    private orderTrackerService: OrderTrackerService,
    private notificationService: NotificationService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isDeliveryBoy) {
      this.activeTab = 'delivery-panel';
      this.loadDeliveryOrders();
    } else if (this.authService.isAdmin) {
      this.activeTab = 'admin-panel';
      this.loadAdminOrders();
    } else if (this.authService.isLoggedIn) {
      this.activeTab = 'my-orders';
      this.loadMyOrders();
    }
  }

  switchTab(tab: 'search' | 'my-orders' | 'admin-panel' | 'delivery-panel') {
    this.activeTab = tab;
    this.errorMessage = '';
    if (tab === 'my-orders') {
      this.loadMyOrders();
    } else if (tab === 'admin-panel') {
      this.loadAdminOrders();
    } else if (tab === 'delivery-panel') {
      this.loadDeliveryOrders();
    }
  }

  onTrackOrder() {
    if (!this.searchOrderId.trim()) {
      this.errorMessage = 'Please enter a valid Order ID (e.g. EK1004)';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.orderData = null;
    this.orderHistory = [];

    this.orderTrackerService.trackOrder(this.searchOrderId.trim()).subscribe(res => {
      this.loading = false;
      if (res.success && res.data) {
        this.orderData = res.data;
        this.loadOrderHistory(res.data.orderId);
      } else {
        this.errorMessage = res.message || 'Order ID not found.';
      }
    });
  }

  loadOrderHistory(orderId: string) {
    this.notificationService.getOrderHistory(orderId).subscribe(res => {
      if (res.success && res.data) {
        this.orderHistory = res.data;
      }
    });
  }

  loadMyOrders() {
    const userEmail = this.authService.currentUserValue?.email;
    if (!userEmail) return;

    this.userOrdersLoading = true;
    this.orderTrackerService.getMyOrders(userEmail).subscribe(res => {
      this.userOrdersLoading = false;
      if (res.success && res.data) {
        this.userOrders = res.data;
      }
    });
  }

  loadAdminOrders() {
    this.adminOrdersLoading = true;
    this.orderTrackerService.getAllOrdersAdmin().subscribe(res => {
      this.adminOrdersLoading = false;
      if (res.success && res.data) {
        this.adminOrders = res.data;
      }
    });
  }

  loadDeliveryOrders() {
    this.deliveryOrdersLoading = true;
    this.orderTrackerService.getDeliveryOrders().subscribe(res => {
      this.deliveryOrdersLoading = false;
      if (res.success && res.data) {
        this.deliveryOrders = res.data;
      }
    });
  }

  pickupOrderFromShop(order: OrderTrack) {
    const deliveryBoyName = this.authService.currentUserValue?.name || 'Delivery Executive';
    const deliveryBoyPhone = '+91 9876543210';

    this.orderTrackerService.pickupOrderDelivery(order.orderId, deliveryBoyName, deliveryBoyPhone).subscribe(res => {
      if (res.success && res.data) {
        order.status = 'SHIPPED';
        order.deliveryBoyName = res.data.deliveryBoyName;
        order.deliveryBoyPhone = res.data.deliveryBoyPhone;
        alert(`Order #${order.orderId} picked up from store! Status updated to Handed to Delivery.`);
      } else {
        alert(res.message || 'Failed to pick up order.');
      }
    });
  }

  acceptOutForDelivery(order: OrderTrack) {
    const deliveryBoyName = this.authService.currentUserValue?.name || 'Delivery Executive';
    const deliveryBoyPhone = '+91 9876543210';

    this.orderTrackerService.acceptOutForDelivery(order.orderId, deliveryBoyName, deliveryBoyPhone).subscribe(res => {
      if (res.success && res.data) {
        order.status = 'OUT_FOR_DELIVERY';
        alert(`🛵 Out for Delivery accepted! Customer status updated to Out for Delivery.`);
      } else {
        alert(res.message || 'Failed to accept Out for Delivery dispatch.');
      }
    });
  }

  completeHomeDelivery(order: OrderTrack) {
    this.orderTrackerService.completeOrderDelivery(order.orderId).subscribe(res => {
      if (res.success && res.data) {
        order.status = 'DELIVERED';
        alert(`Order #${order.orderId} successfully delivered to customer home! 🎉`);
      } else {
        alert(res.message || 'Failed to complete delivery.');
      }
    });
  }

  updateOrderStatusAdmin(order: OrderTrack, newStatus: string) {
    this.orderTrackerService.updateOrderStatusAdmin(
      order.orderId,
      newStatus,
      order.carrier || 'eKart Express Logistics',
      order.trackingNumber || ('TRK-' + Math.floor(1000000 + Math.random() * 9000000))
    ).subscribe(res => {
      if (res.success && res.data) {
        order.status = res.data.status;
        order.carrier = res.data.carrier;
        order.trackingNumber = res.data.trackingNumber;
        alert(`Order ${order.orderId} updated to ${newStatus}!`);
      } else {
        alert(res.message || 'Failed to update order status.');
      }
    });
  }

  get filteredAdminOrders(): OrderTrack[] {
    if (this.adminFilterStatus === 'ALL') {
      return this.adminOrders;
    }
    return this.adminOrders.filter(o => o.status === this.adminFilterStatus);
  }

  get filteredDeliveryOrders(): OrderTrack[] {
    if (this.deliveryFilterStatus === 'ALL') {
      return this.deliveryOrders;
    }
    return this.deliveryOrders.filter(o => o.status === this.deliveryFilterStatus);
  }

  isStepCompleted(step: string, targetOrder?: OrderTrack): boolean {
    const current = targetOrder ? targetOrder.status : this.orderData?.status;
    if (!current) return false;

    const rank: { [key: string]: number } = {
      'ORDER_RECEIVED': 1,
      'PROCESSING': 1,
      'ACCEPTED': 2,
      'SHIPPED': 3,
      'IN_TRANSIT': 3,
      'OUT_FOR_DELIVERY': 4,
      'DELIVERED': 5
    };

    const currentRank = rank[current] || 1;
    const stepRank = rank[step] || 1;

    return currentRank >= stepRank;
  }

  formatStatusBadge(status: string): string {
    switch (status) {
      case 'ORDER_RECEIVED': return '📌 Order Received';
      case 'ACCEPTED': return '🟢 Order Accepted (Ready for Store Pickup)';
      case 'SHIPPED': return '📦 Handed to Delivery';
      case 'OUT_FOR_DELIVERY': return '🛵 Out for Delivery to Home';
      case 'DELIVERED': return '✅ Delivered to Home';
      default: return status;
    }
  }
}
