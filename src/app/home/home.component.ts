import { Component,OnInit,OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  // Your existing code...

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
}
