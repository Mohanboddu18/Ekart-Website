import { Component } from '@angular/core';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  mainMenuItems = [
    { title: 'Home', link: '/home' },
    { title: 'Products', link: '/products' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' }
  ];
}
