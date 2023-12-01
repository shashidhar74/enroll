import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Products } from './products';
import axios from 'axios';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  constructor() {
   
  }
 
  generateInvoice(paymentDetails: any, orderData: any): void {
    const invoiceNumber = Math.floor(100000 + Math.random() * 900000); 
    const currentDate = new Date().toLocaleDateString();
  
    const productDetails = orderData.map((product: any) => [
      product.name,
      product.quantity,
      product.price,
      product.quantity * product.price,
    ]);
  
    const tableBody = [
      [{ text: 'Product', style: 'tableHeader' }, { text: 'Quantity', style: 'tableHeader' }, { text: 'Price', style: 'tableHeader' }, { text: 'Total', style: 'tableHeader' }],
      ...productDetails,
    ];
  
    const paymentDetailsTable = [
      [{ text: 'Payment Details', style: 'tableHeader', colSpan: 2 }, {}],
      ['Subtotal:', { text: `${paymentDetails.subtotal}`, alignment: 'right' }],
      ['Shipping:', { text: `${paymentDetails.shipping}`, alignment: 'right' }],
      ['GST:', { text: `${paymentDetails.gst}`, alignment: 'right' }],
      ['Grand Total:', { text: `${paymentDetails.grandTotal}`, alignment: 'right' }],
    ];
  
    const documentDefinition: any = {
      content: [
        {text:'E-commerce site', style: 'header'},
        { text: `Invoice #${invoiceNumber}`, style: 'subheader' },
        { text: `Date: ${currentDate}`, style: 'subheader' },
        { text: 'Your Order Details', style: 'underlineSubheader' },
        { text: '', margin: [0, 0, 0, 8] }, // Add some space
  
        // Product table
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: tableBody,
          },
          layout: {
            fillColor: (rowIndex: number) => rowIndex === 0 ? '#29C5F6' : null, // Fill header row with light gray
            hLineWidth: (i: number) => i === 0 ? 2 : 1, 
            vLineWidth: () => 1,
          },
        },
        { text: '', margin: [0, 0, 0, 20] },
        {
          table: {
            body: paymentDetailsTable,
          },
          layout: {
            hLineWidth: () => 1, 
            vLineWidth: () => 1, 
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          color: 'red',
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: false,
          margin: [0, 5, 0, 5],
        },
        underlineSubheader: {
          fontSize: 14,
          color:'gray',
          bold: true,
          decoration: 'underline', // Add underline
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'blue',
          fillColor: '#f2f2f2',
        },
      },
    };
  
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  }
  
  private cartItems: Products[] = [];
  getCartItems(): Observable<Products[]> {
    debugger
    return new Observable(observer => {
      const localCart = localStorage.getItem('localCart');
      if (localCart) {
        this.cartItems = JSON.parse(localCart);
      }
      observer.next(this.cartItems);
      console.log(this.cartItems);
      
    });

  }

  getCurrentLocation(){
    debugger
    return new Promise<{
    
}>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&addressdetails=1`;
          axios.get(apiUrl)
            .then((response) => {
              const address = response.data.address;
              console.log('location1',address);
            }),
        (error: any) => {
          reject(error);
            }
      }
      );
    });
  }
  private orderDataSubject = new BehaviorSubject<any>(null);
orderData$ = this.orderDataSubject.asObservable();
cost$ = this.orderDataSubject.pipe(map((combinedData: { cost: any; }) => combinedData?.cost)); // Extract cost from combinedData

setOrderData(data: any, cost: any): void {
  const combinedData = { data, cost };
  this.orderDataSubject.next(combinedData);

  if (cost) {
    localStorage.setItem('cost', JSON.stringify(cost));
  }
 if(data){
  localStorage.setItem('data', JSON.stringify(data));
 }
  
}

}
