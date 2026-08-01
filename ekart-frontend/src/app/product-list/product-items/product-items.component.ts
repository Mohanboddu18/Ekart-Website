import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/Modals/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent implements OnInit {
  @Input() searchText: string = '';
  @Output() productSelected = new EventEmitter<Product>();

  selectedFilterRadioButton: string = 'all';
  products: Product[] = [];
  loading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data || [];
        this.loading = false;
      },
      error: () => {
        this.products = [];
        this.loading = false;
      }
    });
  }

  get totalProductsCount(): number {
    return this.products.length;
  }

  get productInStock(): number {
    return this.products.filter(p => p.is_in_inventory || p.isInInventory).length;
  }

  get productOutOfStock(): number {
    return this.products.filter(p => !(p.is_in_inventory || p.isInInventory)).length;
  }

  onFilterChanged(value: string) {
    this.selectedFilterRadioButton = value;
  }

  viewProduct(product: Product) {
    this.productSelected.emit(product);
  }

  get filteredProducts(): Product[] {
    return this.products.filter(prod => {
      const matchSearch =
        this.searchText === '' || prod.name.toLowerCase().includes(this.searchText.toLowerCase());
      
      const inInventory = prod.is_in_inventory || prod.isInInventory;

      const matchFilter =
        this.selectedFilterRadioButton === 'all' ||
        (this.selectedFilterRadioButton === 'inStock' && inInventory) ||
        (this.selectedFilterRadioButton === 'outOfStock' && !inInventory);

      return matchSearch && matchFilter;
    });
  }
}
