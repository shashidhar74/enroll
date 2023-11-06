import { Component ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
export interface products{
  productid:string,
  productname:string,
  quantity:string,
  cost:string,
  colour:string,
  config:string
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @ViewChild(MatSort) matsort!: MatSort;
  @ViewChild(MatPaginator) matpaginator!:MatPaginator
  datasource = new MatTableDataSource<any>();

  constructor(private http:HttpClient){
  }
  products:any;
  columns = ['productid', 'productname', 'quantity', 'cost', 'colour', 'config'];
  pageEvent: any; 
  ngOnInit():void{
this.http.get('http://localhost:3000/products')
.subscribe((data:any)=>{
  console.log('products data--',data);
  
  this.products=new MatTableDataSource(data);
  this.products.sort=this.matsort
  this.datasource=new MatTableDataSource<products>(data)
  this.datasource.paginator = this.matpaginator;
})
      
  }
  filter(e:any)
  {
    this.products.filter=e.target.value;
  }
}
