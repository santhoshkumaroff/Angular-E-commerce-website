import { Component,OnInit,OnChanges } from '@angular/core';
import { collection,addDoc,collectionData } from '@angular/fire/firestore';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-masala-list',
  templateUrl: './masala-list.component.html',
  styleUrls: ['./masala-list.component.css']
})
export class MasalaListComponent implements OnInit {

value: any;
// private firestore:Firestore
constructor(private service:ServiceService,private router:Router){
  // this.getData();
  this.extractAndFlatten();
}
extractAndFlatten() {
  this.subdata = Object.values(this.products)
    .map((data: any) => data.selected_products)
    .filter((selectedProducts) => selectedProducts !== undefined);

  this.subdatas = this.subdata.flat();
  this.filterProducts();
}

filterProducts() {
  const filteredProducts = this.subdatas.filter(product =>
    product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );

  this.activeProduct = filteredProducts.length > 0 ? filteredProducts[0] : null;

  this.selectedProduct = {
    selected_products: this.subdatas.filter((item) =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    ),
  };
}
// clearSearchTerm() {
//   this.searchTerm = '';
// }
Object = Object;
  products = {
    '01':
    { 
    name: 'Direct Powders', 
    imageUrl: 'assets/directpowders.png' ,
    selected_products : [
      {
        name : 'Turmeric Powder',imageUrl: 'assets/directpowders.png',
        price : 100, quantity: [{gram : [20,50,100,200,500]},{kilogram : [1,5,10,20]}],
        description : 'aaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaa aaaaaaa  aaaaaaaaaaaa aaaaaaaaaa aaaaaaaa'
      }, 
      {
        name : 'Red Chilly Powder',imageUrl: 'assets/directpowders.png',
        price : 100, quantity: [{gram : [20,50,100,200,500]},{kilogram : [1,5,10,20]}],
        description : 'Discover the bold and fiery essence of our Red Chili Powder, a kitchen essential for spice enthusiasts. Sourced from the finest red chili peppers, this premium spice adds an intense kick to your favorite dishes. Carefully ground for a consistent, fine texture, it guarantees a burst of flavor in every pinch. Ideal for curries, marinades, and sauces, this spice elevates your culinary creations effortlessly. The vibrant red hue and robust taste stem from sun-dried chilies, handpicked for quality. Packed in an airtight container, our chili powder ensures long-lasting freshness. Transform ordinary meals into extraordinary culinary delights with just a dash. Unleash the warmth and depth of flavor in soups, stews, and grilled delights. Elevate your cooking experience with our meticulously crafted Red Chili Powder. Spice up your culinary journey today!' 
      },
      {
        name : 'Coriander Powder',imageUrl: 'assets/directpowders.png',
        price : 100, quantity: [{gram : [20,50,100,200,500]},{kilogram : [1,5,10,20]}],
        description : 'aaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaa aaaaaaa  aaaaaaaaaaaa aaaaaaaaaa aaaaaaaa' 
      },
      {
        name : 'Black Pepper Powder',imageUrl: 'assets/directpowders.png',
        price : 100, quantity: [{gram : [20,50,100,200,500]},{kilogram : [1,5,10,20]}],
        description : 'aaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaa aaaaaaa  aaaaaaaaaaaa aaaaaaaaaa aaaaaaaa' 
      },
      {
        name : 'Cummin Powder',imageUrl: 'assets/directpowders.png',
        price : 100, quantity: [{gram : [20,50,100,200,500]},{kilogram : [1,5,10,20]}],
        description : 'aaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaa aaaaaaa  aaaaaaaaaaaa aaaaaaaaaa aaaaaaaa' 
      },
      {
        name : 'Fennel Powder',imageUrl: 'assets/directpowders.png',
        price : 100, quantity: [{gram : [20,50,100,200,500]},{kilogram : [1,5,10,20]}],
        description : 'aaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaa aaaaaaa  aaaaaaaaaaaa aaaaaaaaaa aaaaaaaa'
      }

    ]
   },
   '02':
   {
    name: 'Blended Powders',
    imageUrl: 'assets/directpowders.png',
    selected_products : [
      {
        name : 'Chicken 65 Powder',imageUrl: 'assets/directpowders.png',
        price : 100, quantity: [{gram : [20,50,100,200,500]},{kilogram : [1,5,10,20]}],
        description : 'aaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaa aaaaaaa  aaaaaaaaaaaa aaaaaaaaaa aaaaaaaa'
      }
    ]
    },
    '03':
    { name: 'Instant Rice Podi', imageUrl: 'assets/directpowders.png' },
    '04':
    { name: 'Podis & Appalam', imageUrl: 'assets/directpowders.png' }

    // Add more items as needed
  };
  activeProduct: any;
  displayproduct : boolean =false;
  selectedProductDetails: any | null = null;
  product_detail:any;
  Productdetail(data: any, selectedProduct: any) {
    this.displayproduct = true;
    this.product_detail = data;
    this.service.setProductDetail(this.product_detail);
    console.log(data);
    console.log(selectedProduct);
    let productname = (data.name).split(" ").join("");

    // this.router.navigate(['/product-detail']);
    this.router.navigate(['/products', productname]);

  }
  // selectedProduct: any;
  searchTerm: string = '';
  selectedProduct: any = {};
  subdata = Object.values(this.products).map((data: any) => data.selected_products).filter(selectedProducts => selectedProducts !== undefined);
  subdatas = this.subdata.flat();
  // objectData = this.subdatas.reduce((acc, curr) => {
  //   acc[curr.name] = curr.imageUrl;
  //   return acc;
  // }, {});
  // // This will used to convert array into object - start

  //  flatObject: Record<string, { imageUrl: string; selected_products?: { name: string; imageUrl: string }[] }> = Object.fromEntries(
  //   this.products.map(product => [
  //     product.name,
  //     { imageUrl: product.imageUrl, ...(product.selected_products && { selected_products: product.selected_products.map(item => ({ name: item.name, imageUrl: item.imageUrl })) }) }
  //   ])
  // );

  setActiveProduct(product: any): void {
    console.log(this.products);
    
    this.selectedProduct = product;
    this.activeProduct = product;

  }
  ngOnInit(): void {
    // console.log(this.subdatas);
  }
  // Post to firebase
  // addData() {
  //   const collectionInstance = collection(this.firestore, 'test1');
  
  //   // Use Promise.all to wait for all documents to be added
  //   // Promise.all(this.products.map(product => 
  //     addDoc(collectionInstance, this.products)
  //     .then(() => {
  //       console.log("Data sent Successfully");
  //     })
  //     .catch((err) => {
  //       console.error("Error adding documents:", err);
  //     });
  // }
  
  // Get data from firebase
  ProductsData:any;
  // getData(){
  //   const collectionInstance = collection(this.firestore,'test1');
  //   collectionData(collectionInstance).subscribe(value =>{
  //     this.ProductsData = value;
  //     console.log(value);
  //   })
  // }
}  