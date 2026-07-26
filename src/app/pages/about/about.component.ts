import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  stats = [
    { number: '100K+', label: 'Happy Customers' },
    { number: '30+', label: 'Top Global Brands' },
    { number: '99.8%', label: 'On-Time Delivery Rate' },
    { number: '24/7', label: 'Customer Assistance' }
  ];
}
