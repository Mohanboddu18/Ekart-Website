import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OrderTrackerService } from '../../services/order-tracker.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalCount = 0;

  // Checkout address details
  shippingAddress = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  };

  isProcessing = false;
  orderPlaced = false;
  placedOrderId = '';

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private orderTrackerService: OrderTrackerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.totalPrice$.subscribe(price => {
      this.totalPrice = price;
    });

    this.cartService.totalCount$.subscribe(count => {
      this.totalCount = count;
    });

    // Auto-fill logged in user info if available
    const user = this.authService.currentUserValue;
    if (user) {
      this.shippingAddress.fullName = user.name || '';
      this.shippingAddress.email = user.email || '';
    }
  }

  onPhoneInput(event: any): void {
    const val = event.target.value.replace(/[^0-9]/g, '');
    this.shippingAddress.phone = val.slice(0, 10);
    event.target.value = this.shippingAddress.phone;
  }

  onPincodeInput(event: any): void {
    const val = event.target.value.replace(/[^0-9]/g, '');
    this.shippingAddress.pincode = val.slice(0, 6);
    event.target.value = this.shippingAddress.pincode;
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id, item.quantity - 1);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id);
  }

  proceedToPayment(): void {
    if (!this.authService.isLoggedIn) {
      // Redirect to Auth page with returnUrl and reason=checkout
      this.router.navigate(['/auth'], {
        queryParams: { returnUrl: '/cart', reason: 'checkout' }
      });
      return;
    }

    this.placeOrder();
  }

  placeOrder(): void {
    if (!this.shippingAddress.fullName || !this.shippingAddress.address || !this.shippingAddress.city) {
      alert('Please fill out your delivery name, street address, and city.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.shippingAddress.phone)) {
      alert('⚠️ Mobile Number must be exactly 10 numeric digits (e.g. 9876543210).');
      return;
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(this.shippingAddress.pincode)) {
      alert('⚠️ Postal Code must be exactly 6 numeric digits (e.g. 560001).');
      return;
    }

    const fullAddr = `${this.shippingAddress.address}, ${this.shippingAddress.city} - ${this.shippingAddress.pincode} (Ph: ${this.shippingAddress.phone})`.trim();

    this.isProcessing = true;
    this.orderTrackerService.createOrder({
      customerEmail: this.shippingAddress.email || this.authService.currentUserValue?.email || 'customer@ekart.com',
      customerName: this.shippingAddress.fullName,
      shippingAddress: fullAddr,
      totalAmount: this.totalPrice
    }).subscribe(res => {
      this.isProcessing = false;
      if (res.success && res.data) {
        this.placedOrderId = res.data.orderId;
        this.orderPlaced = true;
        this.cartService.clearCart();
      } else {
        alert(res.message || 'Failed to place order. Please try again.');
      }
    });
  }

  goToOrderTracker(): void {
    this.router.navigate(['/order-tracker']);
  }
}
