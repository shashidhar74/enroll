import { Component } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { UserdetailsService } from '../userdetails.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  addEvent!:FormGroup
  eventData:any;
  eventCodeToUpdate: string = ''; 
  constructor(private fb: FormBuilder,private service:UserdetailsService) { 
    this.addEvent = this.fb.group({
      eventcode: ['', Validators.required],
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventType: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventOrganizer: ['', Validators.required],
      eventDescription: ['']
    });
  }
  saveEvent() {
    if (this.addEvent.valid) {
      const eventData = {
        eventcode: this.addEvent.value.eventcode,
        eventName: this.addEvent.value.eventName,
        eventDate: this.addEvent.value.eventDate,
        eventType: this.addEvent.value.eventType,
        eventLocation: this.addEvent.value.eventLocation,
        eventOrganizer: this.addEvent.value.eventOrganizer,
        eventDescription: this.addEvent.value.eventDescription,
      };
  
      //console.log('Sending event data:', eventData);
  
      this.service.addEventService(eventData).subscribe(
        (result: any) => {
          Swal.fire("Added sucessfully");
          this.eventData.reset();
          //console.log('--result--', result);
        },
        (error) => {
          console.error('Error saving event', error);
        }
      );
    }
  }
  

}
