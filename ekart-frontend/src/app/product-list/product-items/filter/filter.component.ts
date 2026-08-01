// import { Component, EventEmitter, Input, Output } from '@angular/core';

// @Component({
//   selector: 'app-filter',
//   templateUrl: './filter.component.html',
//   styleUrls: ['./filter.component.css']
// })
// export class FilterComponent {
//   @Input()
//   all:number=0;

//   @Input()
//   inStock:number=0;

//   @Input()
//   outOfstock:number=0;
  
//   @Output()
//   productSelectedButtonChanged: EventEmitter<string> = new EventEmitter<string>();

//   selectedFilterRadioButton : string = 'all'

//   onProductSelectedButtonChanged(){
//     this.productSelectedButtonChanged.emit(this.selectedFilterRadioButton);
//   }
// }

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() all: number = 0;
  @Input() inStock: number = 0;
  @Input() outOfstock: number = 0;

  @Output() productSelectedButtonChanged = new EventEmitter<string>();

  selectedFilterRadioButton: string = 'all';

  onProductSelectedButtonChanged() {
    this.productSelectedButtonChanged.emit(this.selectedFilterRadioButton);
  }
}
