import { Component, Input } from '@angular/core';
import { CartServiceService } from '../cart-service.service';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  @Input() paymentDetails: any;
orderData1: any;
payment:any;

  constructor(private sharedDataService: CartServiceService) {}
  ngOnInit(): void {
    this.orderData1 = JSON.parse(localStorage.getItem('data') || '[]');
    console.log('array',this.orderData1);
    this.payment = JSON.parse(localStorage.getItem('cost') || '[]');
  console.log('array',this.payment);
  
}
generateInvoice(): void {
  this.sharedDataService.generateInvoice(this.payment,this.orderData1);
}
}
