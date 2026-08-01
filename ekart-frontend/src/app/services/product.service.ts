import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Product } from '../Modals/Product';
import { ApiResponse } from '../Modals/User';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  public normalizeProduct(p: any): Product {
    if (!p) return p;

    // Robust imageURL extraction
    const img = p.imageURL || p.imageurl || p.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80';

    // Handle color array vs colors string
    let colorArray: string[] = [];
    if (Array.isArray(p.color) && p.color.length > 0) {
      colorArray = p.color;
    } else if (p.colors && typeof p.colors === 'string') {
      colorArray = p.colors.split(',').map((c: string) => c.trim());
    } else if (p.colorArray && Array.isArray(p.colorArray)) {
      colorArray = p.colorArray;
    } else {
      colorArray = ['Black', 'White'];
    }

    // Handle size array vs sizes string
    let sizeArray: any[] = [];
    if (Array.isArray(p.size) && p.size.length > 0) {
      sizeArray = p.size;
    } else if (p.sizes && typeof p.sizes === 'string') {
      sizeArray = p.sizes.split(',').map((s: string) => s.trim());
    } else if (p.sizeArray && Array.isArray(p.sizeArray)) {
      sizeArray = p.sizeArray;
    } else {
      sizeArray = [6, 7, 8, 9, 10];
    }

    // Handle is_in_inventory
    const inStock = p.is_in_inventory !== undefined ? Boolean(p.is_in_inventory) : (p.isInInventory !== undefined ? Boolean(p.isInInventory) : true);

    return {
      ...p,
      imageURL: img,
      imageurl: img,
      color: colorArray,
      size: sizeArray,
      is_in_inventory: inStock,
      isInInventory: inStock,
      items_left: p.items_left !== undefined ? p.items_left : (p.itemsLeft !== undefined ? p.itemsLeft : (inStock ? 5 : 0))
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl).pipe(
      map(res => {
        const raw = res.data || [];
        return raw.map(p => this.normalizeProduct(p));
      }),
      catchError(() => of([]))
    );
  }

  getProductById(id: number): Observable<Product | null> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.data ? this.normalizeProduct(res.data) : null),
      catchError(() => of(null))
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`).pipe(
      map(res => {
        const raw = res.data || [];
        return raw.map(p => this.normalizeProduct(p));
      }),
      catchError(() => of([]))
    );
  }
}
