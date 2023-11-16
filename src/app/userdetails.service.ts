import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  private url='http://localhost:8082'
constructor(private http:HttpClient){}
getUser(){
  console.log('url working',this.url)
  return this.http.get<User[]>(`${this.url}/api/userdata`)
 
}
 getUserService(users:User[]){
  console.log('--employees-service--',users);
  return this.http.post(`${this.url}/api/userdata`,users);
 }
 
 getUserDataByUser(username: string): Observable<User[]> {
  console.log('user_in_service',username)
  return this.http.get<User[]>(`${this.url}/api/userdataByUser?username=${username}`);
}

getUserProfile(): Observable<any> {
  return this.http.get<any>(this.url);
}
updateUser(user: User): Observable<any> {
  const url = `${this.url}/api/userdata/${user.email}`;
  return this.http.put(url, user);
}

getEvents(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/api/getEvents`);
}

addEventService(eventData: any): Observable<any> {
  const url1 = `${this.url}/api/createEvent`;
  console.log('Request URL:', url1);
 
  return this.http.post(url1, eventData);
}

deleteEventService(eventcode: string): Observable<any> {
  const url = `${this.url}/api/deleteEvent/${eventcode}`;
  return this.http.delete(url);
}
updateEventService(updatedEventData: any, eventcode: string): Observable<any> {
  const url = `${this.url}/api/updateEvent/${eventcode}`;
  return this.http.put(url, updatedEventData);
}

addEnroll(enrollmentData: any): Observable<any> {
  const url = `${this.url}/api/enroll`;
  return this.http.post(url, enrollmentData);
}
getEventByCode(eventCode: string): Observable<any> {
  const url = `${this.url}/api/getEvent/${eventCode}`;
  return this.http.get(url);
}
sendEnrollmentEmail(enrollmentData: any) {
  return this.http.post(`http://localhost:8082/send-email`, enrollmentData);
}

}
