import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }
  private productDetail: any;

  setProductDetail(data: any) {
    this.productDetail = data;
    console.log("check set data",this.productDetail);

  }

  getProductDetail() {
    
    const data = this.productDetail;
    return data;    
  }
}
