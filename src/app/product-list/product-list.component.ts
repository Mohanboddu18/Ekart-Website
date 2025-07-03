import { Component, ViewChild } from '@angular/core';
import { ProductItemsComponent } from './product-items/product-items.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  // name = "Mohan";
  // addToCart : number=0;
  // product ={
  //   name : 'Iphone 13',
  //   price : 799,
  //   color : 'Black',
  //   Discount : 8.5,
  //   instock : 5,
  //   pImage : '/assets/images/iphone.png'
  // }
  // getDiscount(){
  //   return this.product.price-(this.product.price * this.product.Discount / 100)
  // }
  // OnNameChange(event : any){
  //   // this.name= event.target.value;
  // }
  // decrementCartValue(){
  //   if(this.addToCart>0){
  //     this.addToCart--;
  //   }
  // }
  // incrementCartValue(){
  //   if(this.addToCart < this.product.instock){
  //     this.addToCart++;
  //   }
  // }

  searchText : string =''

  @ViewChild(ProductItemsComponent)  productListComponent: ProductItemsComponent

  setSearchText( value: string){
    this.searchText = value;
  }
}
