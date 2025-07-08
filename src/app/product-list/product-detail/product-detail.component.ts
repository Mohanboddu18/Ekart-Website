import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/Modals/Product';
import { ProductItemsComponent } from '../product-items/product-items.component';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  // @Input() productListComp: ProductItemsComponent = undefined;
  @Input() product: Product;
@Output() closeModal = new EventEmitter<void>();

ngOnInit() {
  document.body.classList.add('modal-open');
}

ngOnDestroy() {
  document.body.classList.remove('modal-open');
}

onClose() {
  this.closeModal.emit();
}


  // product: Product;

  // ngOnInit(){
  //   this.product = this.productListComp.selectedProduct; 
  // }
  
  

}