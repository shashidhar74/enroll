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
  
  generateInvoice(paymentDetails: any, orderData: any): void {
    const invoiceNumber = Math.floor(100000 + Math.random() * 900000); 
    const currentDate = new Date().toLocaleDateString();
    const storedAddress = localStorage.getItem('address');
    const addressDetails = storedAddress ? JSON.parse(storedAddress) : {};
    const productDetails = orderData.map((product: any) => [
      product.name,
      product.quantity,
      product.price,
      product.quantity * product.price,
    ]);
  
    const tableBody = [
      [{ text: 'Product', style: 'tableHeader' }, { text: 'Quantity(no)', style: 'tableHeader' }, { text: 'Price(₹) ' , style: 'tableHeader' }, { text: 'Total(₹)', style: 'tableHeader' }],
      ...productDetails,
    ];
  // payment details table
    const paymentDetailsTable = [
      [{ text: 'Payment Details', style: 'tableHeader', colSpan: 2 }, {}],
      ['Subtotal:', { text: `₹${paymentDetails.subtotal}.00`, alignment: 'right' }],
      ['Shipping:', { text: `₹${paymentDetails.shipping}.00`, alignment: 'right' }],
      ['GST(5%):', { text: `₹${paymentDetails.gst}.00`, alignment: 'right' }],
      ['Grand Total:', { text: `₹${paymentDetails.grandTotal}.00`, alignment: 'right', color:'red'}],
    ];
  
    const documentDefinition: any = {
      content: [
        {text:'E-commerce site', style: 'header'},
        { text: `Invoice #${invoiceNumber}`, style: 'subheader' },
        { text: `Date: ${currentDate}`, style: 'subheader' },
        { text: 'Billing Address', style: 'underlineSubheader' ,alignment: 'right' },
        { text: `${addressDetails.house_number || ''} ${addressDetails.road || ''} ${addressDetails.suburb || ''}`, margin: [0, 0, 0, 4],alignment: 'right'  },
        { text: `${addressDetails.city || ''} ${addressDetails.state_district || ''}`, margin: [0, 0, 0, 4],alignment: 'right'  },
        { text: `${addressDetails.state || ''}  ${addressDetails.postcode || ''}`, margin: [0, 0, 0, 4],alignment: 'right'  },
        { text: 'Your Order Details', style: 'underlineSubheader' },
        { text: '', margin: [0, 0, 0, 8] }, 
  
        // Product table
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: tableBody,
          },
          layout: {
            fillColor: (rowIndex: number) => rowIndex === 0 ? '#29C5F6' : null, 
            hLineWidth: (i: number) => i === 0 ? 2 : 1, 
            vLineWidth: () => 1,
          },
        },
        { text: '', margin: [0, 0, 0, 20] },
        {
          table: {
            widths: ['*', '*', '*', '*'],
            body: paymentDetailsTable,
          },
          alignment: 'right',
        
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
          decoration: 'underline',
          alignment: 'center',
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
          decoration: 'underline',
       
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
      //console.log(this.cartItems);
      
    });

  }
// to get current location
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
cost$ = this.orderDataSubject.pipe(map((combinedData: { cost: any; }) => combinedData?.cost)); 

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
