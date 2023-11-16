import { Component ,} from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdetailsService } from '../userdetails.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent {
  events: any[] = []; 
  enrollForm!: FormGroup;
  eventcode: string="";
  disable:boolean=true;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserdetailsService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Accessing eventcode from route parameters
    this.eventcode = this.route.snapshot.params['eventcode'];
//console.log(this.eventcode)
    this.enrollForm = this.fb.group({
      fullName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      eventCode: [ '', Validators.required],
      eventName: [ '',  Validators.required],
      eventLocation: ['',  Validators.required]
    });
    this.userService.getEventByCode(this.eventcode).subscribe(
      (event: any) => {
        //console.log('Data', event);
        this.enrollForm.patchValue({
          eventCode: event.eventcode,
          eventName: event.eventname,
          eventLocation: event.eventlocation
        });
       
      },
      (error) => {
        console.error('Error fetching event details', error);
      }
    );
  }
  
  onSubmit() {
    if (this.enrollForm.valid) {
      // Enable the disabled controls before submitting
      this.enrollForm.get('eventCode')?.enable();
      this.enrollForm.get('eventName')?.enable();
      this.enrollForm.get('eventLocation')?.enable();
  
      this.userService.addEnroll(this.enrollForm.value).subscribe(
        (response) => {
          //console.log('Enrollment submitted successfully', response);
         Swal.fire('Enrolled successfully')
         Swal.fire('Enrolled sucessfully!!\n Check your email for info.'
         );
         this.router.navigate(['/home']);
         
        },
        (error) => {
          console.error('Error submitting enrollment', error);
        }
      );
      this.userService.sendEnrollmentEmail(this.enrollForm.value).subscribe(
        (response) => {
          Swal.fire('Details sent to ur email pls check!');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error submitting enrollment', error);
        }
      );
    }
  }
    
    
}
