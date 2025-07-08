import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/Modals/Product';

@Component({
  selector: 'product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent {
  @Input() searchText: string = '';
  @Output() productSelected = new EventEmitter<Product>();

  selectedFilterRadioButton: string = 'all';
  products =[
    {
    id: 1,
    name: "Nike React Infinity Run Flyknit",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "RUNNING", 
size: [6, 7, 8, 9, 10],
color: ["white", "Blue", "Black"],
price: 1299,
discountPrice : 899,
is_in_inventory: true,
items_left: 6,
imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL7v5qwkXDHAkzLm7cra136dR7EnADq1Nqdg&s", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 2,
    name: "Nike Stylish Funky",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "CASUAL", 
size: [7,8, 9, 10],
color: ["Pink", "White", "Black"],
discountPrice : 1099,
price: 1499,
is_in_inventory: false,
items_left: 0,
imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiL2BenMStLAth_Qqb1jhh2BilkL9rhxUtH_mK9m88EanwkFM9vHoV-zUmcuwVbbC-esY&usqp=CAU", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 3,
    name: "Nike Infinity Run",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "CASUAL", 
size: [6, 7, 8, 9],
color: ["Gray", "White", "Black"],
price: 999,
discountPrice : 769,
is_in_inventory: true,
items_left: 4,
imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREakK7BzttPbaDCQL4WA4uORoS0ysZxFdO9V6JaWHs4wZY_HRw5szMcRwpDvx9Fsy5-ko&usqp=CAU", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 4,
    name: "Nike Casual Running",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "RUNNING", 
size: [6, 7, 8, 9, 10,11],
color: ["Yellow", "Olive", "Black"],
price: 1699,
discountPrice : 1299,
is_in_inventory: true,
items_left: 8,
imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmc8UF-fl9Rqjp49Svowztr0cL0poOol2c9rISlgwmoIuLtCguwmdnzZ357IgVYv4EgCo&usqp=CAU", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 5,
    name: "Nike Gym Wear",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "GYM", 
size: [6, 7, 8, 9, 10,11],
color: ["white", "Gray", "Black"],
price: 1249,
discountPrice : 899,
is_in_inventory: true,
items_left: 6,
imageURL: "https://trilogymerchph.com/cdn/shop/files/MENS-NIKE-PRECISION-7-SMOKE-GREY-PHOTON-DUST-FN4322-003-1.jpg?v=1731667541", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 6,
    name: "Nike Casual Running",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "RUNNING", 
size: [6, 7, 8, 9, 10],
color: ["white", "Olive", "Black"],
price: 899,
discountPrice : 659,
is_in_inventory: false,
items_left: 0,
imageURL: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSwVZSJlwl3pFxsuHzgyZfr4LvooAcpWqWuXbrdswg6umIWsXM0E0yrtFAs_P89P_uPp91DqSo7WjVfaFGjTQa58Dm_F8Xck79PpZ0OtuD34My6vGq2IgDi&usqp=CAc", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 7,
    name: "Nike Casual Flyknit",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "SNEAKERS", 
size: [6, 7, 8, 9, 10],
color: ["white", "Red", "Black"],
price: 1899,
discountPrice : 1399,
is_in_inventory: false,
items_left: 0,
imageURL: "https://extrabutterny.in/cdn/shop/files/AURORA_DV0788-001_PHSLH000-2000.jpg?v=1731659244", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 8,
    name: "Nike Gym Wear",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "EXERCISES", 
size: [6, 7, 8, 9, 10],
color: ["white", "Blue", "Red"],
price: 1199,
discountPrice : 899,
is_in_inventory: true,
items_left: 8,
imageURL: "https://m.media-amazon.com/images/I/71FMhQInrQL.jpg", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 9,
    name: "Nike Party Wear",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "PARTY", 
size: [6, 7, 8, 9, 10,11],
color: ["Orange", "Green", "Black"],
price: 1499,
discountPrice : 1259,
is_in_inventory: true,
items_left: 6,
imageURL: "https://extrabutterny.in/cdn/shop/files/AURORA_HQ4988-030_PHSLH000-2000.jpg?v=1731659652", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 10,
    name: "Nike Run Flyknit",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "RUNNING", 
size: [6, 7, 8, 9, 10],
color: ["white", "Army", "Black"],
price: 859,
discountPrice : 629,
is_in_inventory: false,
items_left: 0,
imageURL: "https://plaeto.in/cdn/shop/files/Route-1.jpg?v=1748941699", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 11,
    name: "Nike React Party Wear",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "PARTY", 
size: [6, 7, 8, 9, 10],
color: ["Red", "Olive", "Black"],
price: 1029,
discountPrice : 759,
is_in_inventory: true,
items_left: 3,
imageURL: "https://plaeto.in/cdn/shop/files/1_bf612266-2de6-448c-8f04-2a6fbbda5767.jpg?v=1726140598", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 12,
    name: "Nike Air Max",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "RUNNING", 
size: [6, 7, 8, 9, 10],
color: ["Green", "Blue", "Black"],
price: 1039,
discountPrice : 869,
is_in_inventory: false,
items_left: 3,
imageURL: "https://plaeto.in/cdn/shop/files/1_9.jpg?v=1732279098", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 13,
    name: "Nike Infinitry N-4",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "CASUAL", 
size: [6, 7, 8, 9, 10],
color: ["white", "Gray", "Random"],
price: 1949,
discountPrice : 1299,
is_in_inventory: true,
items_left: 3,
imageURL: "https://midwaysports.com/cdn/shop/files/AURORA_AV7892-100_PHSRH001-2000.jpg?v=1730833049", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 14,
    name: "Men's Nike Precision",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "CASUAL", 
size: [6, 7, 8, 9, 10],
color: ["white", "Blue", "Black"],
price: 1499,
discountPrice : 959,
is_in_inventory: false,
items_left: 0,
imageURL: "https://nohble.com/cdn/shop/files/AURORA_FN6958-102_PHSRH000-2000.jpg?v=1715800505", 
slug: "nike-react-infinity-run-flyknit"
  },
  {
    id: 15,
    name: "Nike Vapor Pro 3",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
brand: "NIKE",
gender: "MEN",
category: "SNEAKER", 
size: [6, 7, 8, 9, 10],
color: ["Orange", "Green", "Black"],
price: 1699,
discountPrice : 1239,
is_in_inventory: true,
items_left: 3,
imageURL: "https://shopcgx.com/cdn/shop/files/AURORA_DJ6158-300_PHSRH000-2000.jpg?v=1708232901", 
slug: "nike-react-infinity-run-flyknit"
  },
];
 
  totalProductsCount = this.products.length;
  productInStock = this.products.filter(p => p.is_in_inventory).length;
  productOutOfStock = this.products.filter(p => !p.is_in_inventory).length;

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
      const matchFilter =
        this.selectedFilterRadioButton === 'all' ||
        (this.selectedFilterRadioButton === 'inStock' && prod.is_in_inventory) ||
        (this.selectedFilterRadioButton === 'outOfStock' && !prod.is_in_inventory);

      return matchSearch && matchFilter;
    });
  }
}
