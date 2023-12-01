import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit{
  address: string = '';

  constructor(private geolocationService: CartServiceService) {}
  ngOnInit(): void {
    
  }

  @Output() getLocationClick = new EventEmitter<void>();
  city: string | null = null;

  location: any = null;

  getExactLocation() {
    debugger
    this.geolocationService.getCurrentLocation()
      .then((result) => {
       
        
        this.location = result;
      })
      .catch((error) => {
        console.error('Error getting location:', error.message);
      });
  }
}
