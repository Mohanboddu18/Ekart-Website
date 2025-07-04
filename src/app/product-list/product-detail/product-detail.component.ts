import { Component, Input } from '@angular/core';
import { Product } from 'src/app/Modals/Product';
import { ProductItemsComponent } from '../product-items/product-items.component';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  @Input() productListComp: ProductItemsComponent = undefined;

  product: Product;

  ngOnInit(){
    this.product = this.productListComp.selectedProduct; 
  }

}