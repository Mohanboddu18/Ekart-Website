import { Component } from '@angular/core';
import { Product } from 'src/app/Modals/Product'; // Make sure this path is correct

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  searchText: string = '';

  // Holds the selected product for the detail modal
  selectedProduct: Product | null = null;

  // Called when user types in the search box
  setSearchText(value: string) {
    this.searchText = value;
  }

  // Called when a product is clicked in product-items
  openProductDetail(product: Product) {
    this.selectedProduct = product;
    document.body.classList.add('modal-open'); // optional: disables background scroll
  }

  // Called when X button in product-detail is clicked
  closeProductDetail() {
    this.selectedProduct = null;
    document.body.classList.remove('modal-open'); // optional: re-enable scroll
  }
}
