import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserdetailsService } from '../userdetails.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-enroll-table',
  templateUrl: './enroll-table.component.html',
  styleUrls: ['./enroll-table.component.css']
})
export class EnrollTableComponent {

  dataSource = new MatTableDataSource<Event>([]);
  eventCode: string = '';
  constructor(private http:HttpClient,private UserdetailsService:UserdetailsService,private KeycloakService:KeycloakService,private route:Router){}
  events: any[] = [];
  ngOnInit():void{
    this.http.get<Event[]>('http://localhost:8082/api/getEnrolls').subscribe(
      (data: any[]) => {
        this.events = data;
        console.log('from db',data);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  filterText:string='';
page:number=1;
count:number=0;
tablesize:number=5;
tableSizes:any=[5,10,15,20];
onTableDataChange(event:any){
  this.page=event;
  this.events;
    }
  
    onTableSizeChange(event:any):void{
    this.tablesize=event.target.value;
    this.page=1;
    this.events;
    }
}
