import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { products } from '../table/table.component';
import { Products } from '../products';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
item: any;
inCart=false;
productAlreadyExists:boolean | undefined;
constructor(private http:HttpClient,private activatedRoute:ActivatedRoute,private cartservice:CartServiceService){}
productsList: Products[] | undefined; 
productquantity:number=1;
selectedTab: string = 'products';

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  
ngOnInit() {
  this.productList();
  this.getproduct();

}
quantity(product: any, value: string){
if(product.quantity < 9 && value=="max"){
  product.quantity +=1;
}
if(product.quantity  > 1 && value=="min"){
  product.quantity -=1;
}
}

productList() {
  this.http.get<Products[]>('http://localhost:3000/products').subscribe(
    (result) => {
      console.log(result);
      this.productsList = result;
    },
    (error) => {
      console.error('Error fetching product data:', error);
    }
  );
}
getproduct(){
  let productId=this.activatedRoute.snapshot.paramMap.get('id');
  console.log(productId); 
}
buyNow() {
  // Implement Buy Now logic
}

count:any=0;
 productdata: any;
addToCart(product: any): void {
  debugger
  if (product) {
    const productDetails: Products = {
      name: product.name,
      price: product.price,
      category: product.category,
      color: product.color,
      image: product.image,
      description: product.description,
      id: product.id,
      quantity: product.quantity,
      productid: undefined
    };
    this.localAddData(productDetails);
    this.inCart = true;
  }
}


localAddData(data: Products): void {
  let cartData: Products[] = [];
  let localCart = localStorage.getItem('localCart');

  if (localCart) {
    cartData = JSON.parse(localCart);
    const productAlreadyExists = cartData.some(product => product.id === data.id);
 
    
    if (!productAlreadyExists) {
      cartData.push(data);  
      Swal.fire('product has been added to your cart')
    } else{
      this.inCart=true;
      Swal.fire('this product already in cart')
    }
  }
  localStorage.setItem('localCart', JSON.stringify(cartData))
}
}
