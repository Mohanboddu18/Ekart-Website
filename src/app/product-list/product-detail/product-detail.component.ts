import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/Modals/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Output() closeModal = new EventEmitter<void>();

  addedToCart = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    document.body.classList.add('modal-open');
  }

  ngOnDestroy() {
    document.body.classList.remove('modal-open');
  }

  onClose() {
    this.closeModal.emit();
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, 1);
      this.addedToCart = true;
      setTimeout(() => {
        this.addedToCart = false;
      }, 2500);
    }
  }

  onImgError(event: any) {
    event.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80';
  }
}