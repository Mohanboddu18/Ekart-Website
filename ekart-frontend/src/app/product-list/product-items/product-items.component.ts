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
        if (data && data.length > 0) {
          this.products = data;
        } else {
          this.products = this.getDefaultProducts();
        }
        this.loading = false;
      },
      error: () => {
        this.products = this.getDefaultProducts();
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

  private getDefaultProducts(): Product[] {
    const rawList = [
      {
        id: 1,
        name: "Nike React Infinity Run Flyknit",
        description: "High-performance cushioned running shoes designed for ultimate comfort and durability.",
        brand: "NIKE", gender: "MEN", category: "RUNNING", 
        size: [6, 7, 8, 9, 10], color: ["white", "Blue", "Black"],
        price: 1299, discountPrice: 899, is_in_inventory: true, items_left: 6,
        imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80", 
        slug: "nike-react-infinity-run-flyknit"
      },
      {
        id: 2,
        name: "Adidas Stylish Shoes",
        description: "Sleek and versatile casual sneakers for everyday comfort and urban lifestyle.",
        brand: "ADIDAS", gender: "MEN", category: "CASUAL", 
        size: [7, 8, 9, 10], color: ["Pink", "White", "Black"],
        discountPrice: 1099, price: 1499, is_in_inventory: false, items_left: 0,
        imageURL: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80", 
        slug: "adidas-stylish-shoes"
      },
      {
        id: 3,
        name: "Puma Mens Sneakers",
        description: "Classic streetwear sneakers built with premium materials and comfortable cushioning.",
        brand: "PUMA", gender: "MEN", category: "CASUAL", 
        size: [6, 7, 8, 9], color: ["Gray", "White", "Black"],
        price: 999, discountPrice: 769, is_in_inventory: true, items_left: 4,
        imageURL: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80", 
        slug: "puma-mens-sneakers"
      },
      {
        id: 4,
        name: "Puma Stylish Sneaker",
        description: "Trendy running sneakers offering soft comfort and responsive stride.",
        brand: "PUMA", gender: "MEN", category: "RUNNING", 
        size: [6, 7, 8, 9, 10, 11], color: ["Yellow", "Olive", "Black"],
        price: 1699, discountPrice: 1299, is_in_inventory: true, items_left: 8,
        imageURL: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80", 
        slug: "puma-stylish-sneaker"
      },
      {
        id: 5,
        name: "Adidas Gym Wear",
        description: "Breathable athletic training apparel engineered for intensive workouts.",
        brand: "ADIDAS", gender: "MEN", category: "GYM", 
        size: [40, 42, 44, 46, 48], color: ["white", "Gray", "Black"],
        price: 1249, discountPrice: 899, is_in_inventory: true, items_left: 6,
        imageURL: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80", 
        slug: "adidas-gym-wear"
      },
      {
        id: 6,
        name: "Puma College Bag",
        description: "Durable multi-compartment backpack perfect for school, college, and daily travel.",
        brand: "PUMA", gender: "MEN", category: "COLLEGE", 
        size: [20, 25, 30, 40], color: ["white", "Olive", "Black"],
        price: 899, discountPrice: 659, is_in_inventory: false, items_left: 0,
        imageURL: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80", 
        slug: "puma-college-bag"
      },
      {
        id: 7,
        name: "Adidas Casual Tshirt",
        description: "Premium cotton crewneck t-shirt with classic triple stripe styling.",
        brand: "ADIDAS", gender: "MEN", category: "CASUAL", 
        size: [40, 42, 44, 46], color: ["white", "Red", "Black"],
        price: 1899, discountPrice: 1399, is_in_inventory: false, items_left: 0,
        imageURL: "https://assets.ajio.com/medias/sys_master/root/20250424/4Lug/6809ebf955340d4b4ff709c5/-473Wx593H-442882577-black-MODEL.jpg", 
        slug: "adidas-casual-tshirt"
      },
      {
        id: 8,
        name: "Puma Sports Wear",
        description: "Indoor sports non-marking grip shoes crafted for court agility and speed.",
        brand: "PUMA", gender: "MEN", category: "EXERCISES", 
        size: [6, 7, 8, 9, 10], color: ["white", "Blue", "Red"],
        price: 1199, discountPrice: 899, is_in_inventory: true, items_left: 8,
        imageURL: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80", 
        slug: "puma-sports-wear"
      },
      {
        id: 9,
        name: "Nike Party Wear",
        description: "Vibrant designer sneakers featuring bold aesthetics and maximum impact protection.",
        brand: "NIKE", gender: "MEN", category: "PARTY", 
        size: [6, 7, 8, 9, 10, 11], color: ["Orange", "Green", "Black"],
        price: 1499, discountPrice: 1259, is_in_inventory: true, items_left: 6,
        imageURL: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80", 
        slug: "nike-party-wear"
      },
      {
        id: 10,
        name: "Puma Girls Stylish Bag",
        description: "Cute compact backpack designed for young women and college essentials.",
        brand: "PUMA", gender: "GIRLS", category: "COLLEGE", 
        size: [20, 25, 30, 40], color: ["white", "Pink", "Black"],
        price: 859, discountPrice: 629, is_in_inventory: false, items_left: 0,
        imageURL: "https://assets.ajio.com/medias/sys_master/root/20240529/BLrO/6656cd1805ac7d77bb879856/-473Wx593H-469618436-pink-MODEL.jpg", 
        slug: "puma-girls-stylish-bag"
      },
      {
        id: 11,
        name: "Adidas React Party Wear",
        description: "High-top party sneakers with reactive sole cushioning.",
        brand: "ADIDAS", gender: "MEN", category: "PARTY", 
        size: [6, 7, 8, 9, 10], color: ["Red", "Olive", "Black"],
        price: 1029, discountPrice: 759, is_in_inventory: true, items_left: 3,
        imageURL: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&auto=format&fit=crop&q=80", 
        slug: "adidas-react-party-wear"
      },
      {
        id: 12,
        name: "Puma Air Max",
        description: "Lightweight cushion sole running shoes engineered for speed.",
        brand: "PUMA", gender: "MEN", category: "RUNNING", 
        size: [6, 7, 8, 9, 10], color: ["Green", "Blue", "Black"],
        price: 1039, discountPrice: 869, is_in_inventory: false, items_left: 3,
        imageURL: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80", 
        slug: "puma-air-max"
      },
      {
        id: 13,
        name: "Wrogn Girls Slippers",
        description: "Comfortable lightweight slides with ergonomic footbed.",
        brand: "WROGN", gender: "WOMEN", category: "CASUAL", 
        size: [40, 42, 44, 46], color: ["white", "Gray", "Random"],
        price: 1949, discountPrice: 1299, is_in_inventory: true, items_left: 3,
        imageURL: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop&q=80", 
        slug: "wrogn-girls-slippers"
      },
      {
        id: 14,
        name: "Men's Adidas Precision",
        description: "Precision fit performance shoes for active lifestyle.",
        brand: "ADIDAS", gender: "MEN", category: "CASUAL", 
        size: [6, 7, 8, 9, 10], color: ["white", "Blue", "Black"],
        price: 1499, discountPrice: 959, is_in_inventory: false, items_left: 0,
        imageURL: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80", 
        slug: "mens-adidas-precision"
      },
      {
        id: 15,
        name: "Bata Womens Slides",
        description: "Slip-on comfort slides with non-slip sole for daily wear.",
        brand: "BATA", gender: "WOMEN", category: "SLIDES", 
        size: [6, 7, 8, 9, 10], color: ["Orange", "Green", "Black"],
        price: 769, discountPrice: 599, is_in_inventory: true, items_left: 3,
        imageURL: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&auto=format&fit=crop&q=80", 
        slug: "bata-womens-slides"
      },
      {
        id: 16,
        name: "Womens Hand Bag",
        description: "Elegant luxury vegan leather handbag with golden hardware.",
        brand: "FREEPIK", gender: "WOMEN", category: "CASUAL", 
        size: [10, 15, 20], color: ["white", "Blue", "Black"],
        price: 1299, discountPrice: 899, is_in_inventory: true, items_left: 6,
        imageURL: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80", 
        slug: "womens-hand-bag"
      },
      {
        id: 17,
        name: "Wenger Trolly Bag",
        description: "Hard-shell expandable spinner luggage bag for international travel.",
        brand: "WENGER", gender: "MEN", category: "CASUAL", 
        size: [40, 50, 60, 70], color: ["Pink", "White", "Black"],
        discountPrice: 1099, price: 1499, is_in_inventory: false, items_left: 0,
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC7KR4OpNkbizJ6XseE0deoflAsbR0i-dUehs6tv5tKA&s", 
        slug: "wenger-trolly-bag"
      },
      {
        id: 18,
        name: "Men's Fastrack Watches",
        description: "Analog sports watch with stainless steel casing and water resistance.",
        brand: "FASTRACK", gender: "MEN", category: "CASUAL", 
        size: [6, 7, 8, 9], color: ["Gray", "White", "Black"],
        price: 999, discountPrice: 769, is_in_inventory: true, items_left: 4,
        imageURL: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80", 
        slug: "mens-fastrack-watches"
      },
      {
        id: 19,
        name: "Puma Outdoor Sneaker",
        description: "Rugged trail sneakers with deep traction rubber outsoles.",
        brand: "PUMA", gender: "MEN", category: "RUNNING", 
        size: [6, 7, 8, 9, 10, 11], color: ["Yellow", "Olive", "Black"],
        price: 1699, discountPrice: 1299, is_in_inventory: true, items_left: 8,
        imageURL: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&auto=format&fit=crop&q=80", 
        slug: "puma-outdoor-sneaker"
      },
      {
        id: 20,
        name: "Amalfi Silver Watch",
        description: "Luxury women's silver dial timepiece with mesh strap.",
        brand: "AMALFI", gender: "WOMEN", category: "CASUAL", 
        size: [40, 42, 44, 46, 48], color: ["white", "Gray", "Black"],
        price: 1249, discountPrice: 899, is_in_inventory: true, items_left: 6,
        imageURL: "https://www.furorewatches.com/cdn/shop/products/FU1403_diagonal.jpg?v=1678971850", 
        slug: "amalfi-silver-watch"
      },
      {
        id: 21,
        name: "Puma Travel Bag",
        description: "Duffle bag with dedicated shoe compartment.",
        brand: "PUMA", gender: "MEN", category: "TRAVEL", 
        size: [20, 25, 30, 40], color: ["white", "Olive", "Black"],
        price: 899, discountPrice: 659, is_in_inventory: false, items_left: 0,
        imageURL: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80", 
        slug: "puma-travel-bag"
      },
      {
        id: 22,
        name: "Mens Fashion Jeans",
        description: "Slim fit stretch denim jeans with classic 5-pocket styling.",
        brand: "LEVIS", gender: "MEN", category: "CASUAL", 
        size: [30, 32, 34, 36], color: ["white", "Red", "Black"],
        price: 899, discountPrice: 1099, is_in_inventory: false, items_left: 0,
        imageURL: "https://images.jdmagicbox.com/quickquotes/images_main/men-denim-baggy-jeans-grey-28-36-2227181052-r8o8rq0a.jpg", 
        slug: "mens-fashion-jeans"
      },
      {
        id: 23,
        name: "Puma Womens Tshirt",
        description: "Soft organic cotton relaxed fit graphic top.",
        brand: "PUMA", gender: "WOMEN", category: "CASUAL", 
        size: [38, 40, 42, 44], color: ["white", "Blue", "Red"],
        price: 1199, discountPrice: 899, is_in_inventory: true, items_left: 8,
        imageURL: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80", 
        slug: "puma-womens-tshirt"
      },
      {
        id: 24,
        name: "Park Avenue Signature Collection",
        description: "Premium long-lasting body spray perfume for men.",
        brand: "PARK AVENUE", gender: "MEN", category: "PARTY", 
        size: [100, 150, 200], color: ["Discover", "Voyage", "Neo"],
        price: 499, discountPrice: 359, is_in_inventory: true, items_left: 6,
        imageURL: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80", 
        slug: "park-avenue-signature"
      },
      {
        id: 25,
        name: "Santoor Soap",
        description: "Sandalwood and turmeric skin care bath soap pack.",
        brand: "SANTOOR", gender: "MEN", category: "SOAP", 
        size: [30, 50, 100, 125], color: ["white", "Pink", "Orange"],
        price: 159, discountPrice: 129, is_in_inventory: false, items_left: 0,
        imageURL: "https://cdn.ewshopping.com/uploads/product/36e1905f-8586-4575-9508-b439610e48a4.webp", 
        slug: "santoor-soap"
      },
      {
        id: 26,
        name: "Water Bottle Milton",
        description: "Insulated stainless steel thermal flask keeps drinks hot/cold 24 hours.",
        brand: "MILTON", gender: "MEN", category: "CASUAL", 
        size: [500, 600, 750, 1000], color: ["Red", "Olive", "Black"],
        price: 1029, discountPrice: 759, is_in_inventory: true, items_left: 3,
        imageURL: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80", 
        slug: "water-bottle-milton"
      },
      {
        id: 27,
        name: "Lunch Box On White",
        description: "BPA-free leakproof insulated lunch box container with cutlery.",
        brand: "ISTOCK", gender: "MEN", category: "CASUAL", 
        size: [500, 750], color: ["Green", "Blue", "Black"],
        price: 1039, discountPrice: 869, is_in_inventory: false, items_left: 3,
        imageURL: "https://m.media-amazon.com/images/I/714+n-gCAWL.jpg", 
        slug: "lunch-box-on-white"
      },
      {
        id: 28,
        name: "Girls Dress Kids",
        description: "Festive floral embroidered cotton dress for young girls.",
        brand: "ITAMY", gender: "KIDS", category: "CASUAL", 
        size: [40, 42, 44, 46], color: ["white", "Gray", "Pink"],
        price: 1949, discountPrice: 1299, is_in_inventory: true, items_left: 3,
        imageURL: "https://5.imimg.com/data5/ANDROID/Default/2025/12/569893134/PU/GX/CO/36939600/product-jpeg-500x500.jpg", 
        slug: "girls-dress-kids"
      },
      {
        id: 29,
        name: "Men's Adidas Precision Pro",
        description: "Lightweight cushion sole running shoes engineered for speed.",
        brand: "ADIDAS", gender: "MEN", category: "CASUAL", 
        size: [6, 7, 8, 9, 10], color: ["white", "Blue", "Black"],
        price: 1499, discountPrice: 959, is_in_inventory: false, items_left: 0,
        imageURL: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=600&auto=format&fit=crop&q=80", 
        slug: "mens-adidas-precision-pro"
      },
      {
        id: 30,
        name: "Puma Vapor Pro 3",
        description: "Professional court tennis shoes with reinforced toe cap and lateral stability.",
        brand: "PUMA", gender: "MEN", category: "SNEAKER", 
        size: [6, 7, 8, 9, 10], color: ["Orange", "Green", "Black"],
        price: 1699, discountPrice: 1239, is_in_inventory: true, items_left: 3,
        imageURL: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80", 
        slug: "puma-vapor-pro-3"
      }
    ];

    return rawList.map(p => this.productService.normalizeProduct(p));
  }
}
