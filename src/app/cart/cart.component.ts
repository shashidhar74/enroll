import { Component } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../products';
import axios, { Axios } from 'axios';
import * as QRCode from 'qrcode-generator';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  
  
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

qty:number|undefined
cost: string | number | undefined;
svgString: any;

  constructor(private cartService: CartServiceService,private route:ActivatedRoute) {}
  productId: string | null = null;
  cartItems: Products[] = [];
  ngOnInit(): void {
    this.updateCartItems();
    
  }
  updateCartItems(): void {
    
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      if (this.cartItems.length > 0) {
        this.cost = this.cartItems[0].price * (this.cartItems[0].quantity || 0);
      }
      this.updatePaymentDetails();
    });
    
  }
 
  paymentDetails: any = {
    subtotal: 0,
    shipping: 100, 
    gst: 0,
    grandTotal: 0
  };
   gstRate = 0.05;
  updatePaymentDetails(): void {
    this.paymentDetails.subtotal = this.calculateSubtotal();
    this.paymentDetails.gst = this.calculateGST();
    this.paymentDetails.grandTotal = this.paymentDetails.subtotal + this.paymentDetails.shipping + this.paymentDetails.gst;
  }
  calculateGST(): number {
    return this.paymentDetails.subtotal * this.gstRate;
  }
  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      
      this. qty=item.quantity;
      return total + (item.price || 0) * (item.quantity || 0);
    }, 0);
  }
   SHIPPING_RATE = 100; 
   GST_RATE = 0.05;
   calculateShipping(product: Products): number {
    return this.SHIPPING_RATE;
  }
  calculateOneGST(product: Products): number {
    return (product.price || 0) * (product.quantity || 0) * this.GST_RATE;
  }
  calculateGrandTotal(product: Products): number {
       const subtotal = (product.price || 0) * (product.quantity || 0);
    const shipping = this.calculateShipping(product);
    const gst = this.calculateOneGST(product);
    return subtotal + shipping + gst;
  }

  removeFromCart(product: Products): void {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.updateLocalStorage();
  }
  updateLocalStorage(): void {
    localStorage.setItem('localCart', JSON.stringify(this.cartItems));
    this.updatePaymentDetails();
  }
 locationDetails: string = ''; 
  getLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&addressdetails=1`;
        axios.get(apiUrl)
          .then((response) => {
            //console.log(response);
            const address = response.data.address;
            localStorage.setItem('address', JSON.stringify(address));
            const Mainlatitude=response.data.boundingbox;
            const details = this.buildLocationDetails(address);
            this.locationDetails = details;
            //console.log('location1',address);
            this.generateQRCodeForAddress(Mainlatitude)
          }),
      (error: any) => {
        reject(error);
          }
    }
    )  
  }
  private buildLocationDetails(address: any): string {
    return `${address.house_number || ''} ${address.neighbourhood || ''},  ${address.suburb || ''},${address.city || ''}, ${address.state_district || ''}, ${address.state || ''}, ${address.postcode || ''}`;
  }

  qrCodeData: string='';
  generateQRCodeForAddress(Mainlatitude:any) {
    try {
      const lat=`${Mainlatitude[0]}`
      const log=`${Mainlatitude[3]}`
      if (lat && log) {
        const mapLink = `https://maps.google.com/maps?q=${lat},${log}`;
        this.qrCodeData = mapLink;
      } else {
        console.warn('Latitude or longitude not available in address data.');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }
  public fromLocalStorage: string | null | undefined;
key='localCart';
removeFromlocal(): void {
  this.fromLocalStorage = localStorage.getItem(this.key);
  const cost=this.paymentDetails;
  if (this.fromLocalStorage !== null && this.fromLocalStorage !== undefined) {
    const parsedDetails = JSON.parse(this.fromLocalStorage);
    this.cartService.setOrderData(parsedDetails,cost);
    localStorage.removeItem(this.key);
  
  } else {
    console.error('No details found in local storage.');
  }
}

}
function reject(error: any) {
  throw new Error('Function not implemented.');
}

