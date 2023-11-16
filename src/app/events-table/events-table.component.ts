import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserdetailsService } from '../userdetails.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PaginatePipe } from 'ngx-pagination';
import { UpdateEventComponent } from '../update-event/update-event.component';



@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent {
  dataSource = new MatTableDataSource<Event>([]);
  eventCode: string = '';
  constructor(private http:HttpClient,private UserdetailsService:UserdetailsService,private KeycloakService:KeycloakService,private route:Router, public dialog: MatDialog){}
  events: any[] = [];
  ngOnInit():void{
    this.http.get<Event[]>('http://localhost:8082/api/getEvents').subscribe(
      (data: any[]) => {
        this.events = data;
        console.log('from db',data);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
   
  
      this.UserdetailsService.addEventService(this.events).subscribe((data: any) => {
        this.events = data;
        this.dataSource.data = data;
      });
    
  }
  deleteEvent(eventCode: string) {
  
    this.UserdetailsService.deleteEventService(eventCode).subscribe(
      (result: any) => {
        Swal.fire('Event deleted successfully');
      },
      (error) => {
        console.log('error-delete',error)
        Swal.fire('Error deleting event');
      }
    );
  }
  openConfirmationPopup(eventCode: string) {
    this.eventCode = eventCode; 
    Swal.fire({
      title: `Are you sure you want to delete event with code ${this.eventCode}?`,
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEvent(this.eventCode);
      }
    });
  }

  openUpdateEventDialog(eventData: any): void {
    debugger
    
    const dialogRef = this.dialog.open(UpdateEventComponent, {
      width: '700px', 
      data: eventData, 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
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
    hasAdminRole(): boolean {
      const isAdmin = this.KeycloakService.isUserInRole('admin');
      console.log('Is admin:', isAdmin);
      return isAdmin;
    }
}
