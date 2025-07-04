import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopHeaderComponent } from './header/top-header/top-header.component';
import { MainMenuComponent } from './header/main-menu/main-menu.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SearchComponent } from './product-list/search/search.component';
import { ProductItemsComponent } from './product-list/product-items/product-items.component';
import { ProductComponent } from './product-list/product-items/product/product.component';
import { FilterComponent } from './product-list/product-items/filter/filter.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopHeaderComponent,
    MainMenuComponent,
    ProductListComponent,
    SearchComponent,
    ProductItemsComponent,
    ProductComponent,
    FilterComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
