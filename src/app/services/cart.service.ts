import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../Modals/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  public cart$ = this.cartSubject.asObservable();

  constructor() {}

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('ekart_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  private saveCart(items: CartItem[]) {
    localStorage.setItem('ekart_cart', JSON.stringify(items));
    this.cartSubject.next(items);
  }

  get items(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const current = [...this.items];
    const index = current.findIndex(item => item.product.id === product.id);

    if (index > -1) {
      current[index].quantity += quantity;
    } else {
      current.push({ product, quantity });
    }

    this.saveCart(current);
  }

  updateQuantity(productId: number, quantity: number): void {
    let current = [...this.items];
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const index = current.findIndex(item => item.product.id === productId);
    if (index > -1) {
      current[index].quantity = quantity;
      this.saveCart(current);
    }
  }

  removeFromCart(productId: number): void {
    const updated = this.items.filter(item => item.product.id !== productId);
    this.saveCart(updated);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  get totalCount$(): Observable<number> {
    return this.cart$.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }

  get totalPrice$(): Observable<number> {
    return this.cart$.pipe(
      map(items => items.reduce((sum, item) => sum + ((item.product.discountPrice || item.product.price) * item.quantity), 0))
    );
  }
}
