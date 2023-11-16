import { Component,Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserdetailsService } from '../userdetails.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: UserdetailsService
  )
   {
    if (dialogRef){
    console.log(data);
      this.updateForm = this.fb.group({
        eventcode: [this.data.eventcode || '', Validators.required],
        eventname: [this.data.eventname || '', Validators.required],
        eventdate: [this.data.eventdate || '', Validators.required],
        eventtype: [this.data.eventtype || '', Validators.required],
        eventlocation: [this.data.eventlocation || '', Validators.required],
        eventorganizer: [this.data.eventorganizer || '', Validators.required],
        eventdescription: [this.data.eventdescription || '']
      });
    }
  }



  updateEvent() {
    debugger
    if (this.updateForm.valid) {
      const updatedEventData= {
        eventcode:this.updateForm.value.eventcode,
        eventname: this.updateForm.value.eventname,
        eventdate: this.updateForm.value.eventdate,
        eventtype: this.updateForm.value.eventtype,
        eventlocation: this.updateForm.value.eventlocation,
        eventorganizer: this.updateForm.value.eventorganizer,
        eventdescription: this.updateForm.value.eventdescription,
      };
      
      this.service.updateEventService(updatedEventData,this.data.eventcode).subscribe(
        (result: any) => {
          Swal.fire('Event updated successfully');
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error updating event', error);
        }
      );
    }
  }
}
