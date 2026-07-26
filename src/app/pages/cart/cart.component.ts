import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService,
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

  placeOrder(): void {
    if (!this.shippingAddress.fullName || !this.shippingAddress.address || !this.shippingAddress.city) {
      alert('Please fill out your delivery name, address and city.');
      return;
    }

    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      this.placedOrderId = 'EK' + Math.floor(1000 + Math.random() * 9000);
      this.orderPlaced = true;
      this.cartService.clearCart();
    }, 1200);
  }

  goToOrderTracker(): void {
    this.router.navigate(['/order-tracker']);
  }
}
