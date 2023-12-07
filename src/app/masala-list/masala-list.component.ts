import { Component,OnInit,OnChanges } from '@angular/core';
import { Firestore,collection,addDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-masala-list',
  templateUrl: './masala-list.component.html',
  styleUrls: ['./masala-list.component.css']
})
export class MasalaListComponent implements OnInit {
constructor(private firestore:Firestore){}


  products = [
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
    { 
    name: 'Blended Powders', 
    imageUrl: 'assets/directpowders.png',
    selected_products : [
      {
        name : 'Chicken 65 Powder',imageUrl: 'assets/directpowders.png' 
      }
    ]
    },
    { name: 'Instant Rice Podi', imageUrl: 'assets/directpowders.png' },
    { name: 'Podis & Appalam', imageUrl: 'assets/directpowders.png' },

    // Add more items as needed
  ];
  activeProduct: any;
  selectedProduct: any;
  subdata = this.products.map((data: any) => data.selected_products).filter(selectedProducts => selectedProducts !== undefined);
  subdatas = this.subdata.flat();
  objectData = this.subdatas.reduce((acc, curr) => {
    acc[curr.name] = curr.imageUrl;
    return acc;
  }, {});
  
  
  setActiveProduct(product: any): void {
    this.selectedProduct = product;
    this.activeProduct = product;

  }
  ngOnInit(): void {
    console.log(this.subdatas);
  }
  addData(f:any){
    console.log(this.subdatas);
    
    console.log(this.objectData);
    console.log(this.firestore);
    
    const collectionInstance = collection(this.firestore,'products');
    console.log(collectionInstance);
    
    addDoc(collectionInstance,this.objectData).
    then (()=> {
      console.log("Data sent Successfully");
    }).
    catch((err)=>{
      console.log(err);
    })
  
  }
}
