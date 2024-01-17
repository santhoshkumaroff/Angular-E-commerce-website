import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product_detail :any;
  constructor(private service: ServiceService) { 
  }
  ngOnInit(){
    this.product_detail = this.service.getProductDetail();
    console.log("check in detail",this.product_detail);
  }
}
