import { Component,OnInit,OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import{ AuthService} from '../auth/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500) // adjust the animation duration as needed
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService) {}

isCollapsed = true;

firstImagePath: string [] = [
'assets/turmericpowder.png',
'assets/redchillypowder.png',
'assets/corianderpowder.png',
'assets/sambarpowder.png',
'assets/chicken65powder.png',
'assets/muttonmasala.png'

];

currentImageIndex = 0;

Object = Object;
top10Products =  {
  '01':
  { 
  name: 'Direct Powders', 
  imageUrl: 'assets/directpowders.png' ,
  selected_products : [
    {
      name : 'Turmeric Powder',imageUrl: 'assets/directpowders.png' 
    }, 
    {
      name : 'Red Chilly Powder',imageUrl: 'assets/directpowders.png' 
    },
    {
      name : 'Coriander Powder',imageUrl: 'assets/directpowders.png' 
    },
    {
      name : 'Black Pepper Powder',imageUrl: 'assets/directpowders.png' 
    },
    {
      name : 'Cummin Powder',imageUrl: 'assets/directpowders.png' 
    },
    {
      name : 'Fennel Powder',imageUrl: 'assets/directpowders.png' 
    }

  ]
 },
 '02':
 { 
  name: 'Blended Powders', 
  imageUrl: 'assets/directpowders.png',
  selected_products : [
    {
      name : 'Chicken 65 Powder',imageUrl: 'assets/directpowders.png' 
    }
  ]
  },
  '03':
  { name: 'Instant Rice Podi', imageUrl: 'assets/directpowders.png' },
  '04':
  { name: 'Podis & Appalam', imageUrl: 'assets/directpowders.png' }
};
selectedProduct: any;
topproducts = Object.values(this.top10Products).map((data: any) => data.selected_products).filter(selectedProducts => selectedProducts !== undefined);
top_products = this.topproducts.flat();
currentIndex: number = 0;

get chunkedProducts() {
  return this.chunkArray(this.top_products, 5);
}

chunkArray(array: any[], size: number): any[] {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
}
productsPerSlide: number = 4;
get centeredIndex(): number {
  return Math.floor(this.productsPerSlide / 2);
}

get visibleProducts(): any[] {
  const startIndex = (this.currentIndex - this.centeredIndex + this.top_products.length) % this.top_products.length;
  const endIndex = (startIndex + this.productsPerSlide) % this.top_products.length;

  // Handle cases where endIndex is before startIndex
  return endIndex >= startIndex
    ? this.top_products.slice(startIndex, endIndex + 1)
    : [...this.top_products.slice(startIndex), ...this.top_products.slice(0, endIndex + 1)];
}

showNext() {
  this.currentIndex = (this.currentIndex + 1) % this.top_products.length;
}

showPrevious() {
  this.currentIndex = (this.currentIndex - 1 + this.top_products.length) % this.top_products.length;
}



setIndex(index: number) {
  this.currentIndex = index;
}
viewAllProducts() {
  // Implement logic to navigate to all products page or trigger an action
}
  // Updated content for highlighted spice
  highlightedContent: string[] = [
   'Turmeric powder','Red chilly powder','Coriander powder','Sambar powder','Chicken65 Masala','Mutton masala'
       // Add similar strings for other items
  ];
  
  dynamicContent: string = this.highlightedContent[this.currentImageIndex];

  // ...
  changeImage(step: number) {
    this.currentImageIndex = (this.currentImageIndex + step + this.firstImagePath.length) % this.firstImagePath.length;
    // Optionally, you can update the content dynamically based on the currentImageIndex
    // For example, if you have an array of highlighted content strings
    // you can display the corresponding text dynamically.
    // Assuming 'highlightedContent' is an array of strings corresponding to each product
    // you can display the corresponding text dynamically.
    this.dynamicContent = this.highlightedContent[this.currentImageIndex];
  }

ngOnInit() {
  setInterval(() => {
    this.showNext();
  }, 5000);
  this.changeImage;
  this.startImageChangeTimer();
}

startImageChangeTimer() {
  setInterval(() => {
    this.changeImage(1); // Change image forward
  }, 5000); // 5000 milliseconds (5 seconds)
}

// changeImage(step: number) {
//   this.currentImageIndex = (this.currentImageIndex + step + this.firstImagePath.length) % this.firstImagePath.length;
// }

setCurrentImage(index: number) {
  this.currentImageIndex = index;
}

get isLoggedIn(): boolean {
  return this.auth.isLoggedIn;
}
}
