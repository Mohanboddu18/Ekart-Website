import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Modals/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  categories = [
    { name: 'Running', icon: '👟', description: 'Engineered speed & comfort' },
    { name: 'Casual', icon: '👕', description: 'Everyday street style' },
    { name: 'Gym & Fitness', icon: '🏋️', description: 'High performance workout gear' },
    { name: 'Travel & Bags', icon: '🎒', description: 'Durable journey companions' }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      if (products && products.length > 0) {
        this.featuredProducts = products.slice(0, 4);
      }
    });
  }
}
