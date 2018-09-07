import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerUrl} from '../../Variable';
import {Observable} from 'rxjs';
import {Student} from '../models/student';
import {Room} from '../models/room';

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

  insertNewRoom(room: Room):Observable<Room> {
    let request = this.http.post<Room>(this.apiUserUrl + "/save", {
      "capacity": room.capacity,
      "location": room.location,
      "name": room.name,
      "latitude": room.latitude,
      "longitude": room.longitude
    });
    return request;
  }

}
