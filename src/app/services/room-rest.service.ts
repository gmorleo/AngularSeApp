import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerUrl} from '../../Variable';
import {Observable} from 'rxjs';
import {Student} from '../models/student';
import {Room} from '../models/room';
import {Lesson} from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class RoomRestService {

  apiUserUrl = `${ServerUrl.url}/room`;

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Room[]> {
    let request = this.http.get<Room[]>(this.apiUserUrl + "/getAll");
    return request;
  }

  insert(room: Room):Observable<Room> {
    let request = this.http.post<Room>(this.apiUserUrl + "/save", {
      "capacity": room.capacity,
      "location": room.location,
      "name": room.name,
      "latitude": room.latitude,
      "longitude": room.longitude
    });
    return request;
  }

  checkDisponibility(date,start,id): Observable<boolean>{
    let request = this.http.get<boolean>(this.apiUserUrl + "/checkDisponibility/"+date+"_"+id+"_"+start);
    return request;
  }

}
