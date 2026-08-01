import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { AuthResponse } from '../../Modals/User';
import { OrderNotification } from '../../Modals/EkartModels';

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {
  currentUser: AuthResponse | null = null;
  cartCount$!: Observable<number>;
  
  notifications: OrderNotification[] = [];
  isNotificationOpen = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserNotifications();
      } else {
        this.notifications = [];
      }
    });

    this.cartCount$ = this.cartService.totalCount$;
  }

  loadUserNotifications() {
    if (!this.currentUser) return;
    const role = this.currentUser.role;
    const email = this.currentUser.email;

    this.notificationService.fetchNotifications(role, email).subscribe(res => {
      if (res.success && res.data) {
        this.notifications = res.data;
      }
    });
  }

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
    if (this.isNotificationOpen) {
      this.loadUserNotifications();
    }
  }

  logout() {
    this.authService.logout();
  }
}
