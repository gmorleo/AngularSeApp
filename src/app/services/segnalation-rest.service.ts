import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../models/room';
import {Observable} from 'rxjs';
import {ServerUrl} from '../../Variable';
import {Segnalation} from '../models/segnalation';
import {Lesson} from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class SegnalationRestService {

  apiUserUrl = `${ServerUrl.url}/segnalation`;

  constructor(public http: HttpClient) {
  }


  getByIdProfessor(id: number): Observable<Segnalation[]> {
    let request = this.http.get<Segnalation[]>(this.apiUserUrl + "/getByIdProfessor/"+id);
    return request;
  }

  getByIdRoom(id: number): Observable<Segnalation[]> {
    let request = this.http.get<Segnalation[]>(this.apiUserUrl + "/getByRoom/"+id);
    return request;
  }

  insert(segnalation: Segnalation):Observable<Segnalation> {
    let request = this.http.post<Segnalation>(this.apiUserUrl + "/save", {
      "note": segnalation.note,
      "description": segnalation.description,
      "idState": segnalation.idState,
      "idProfessor": segnalation.idProfessor,
      "idRoom": segnalation.idRoom
    });
    return request;
  }

  getAll(): Observable<Segnalation[]> {
    let request = this.http.get<Segnalation[]>(this.apiUserUrl + "/getAll");
    return request;
  }

  update(segnalation: Segnalation) {
    let request = this.http.post<Segnalation>(this.apiUserUrl + "/update", {
      "id": segnalation.id,
      "note": segnalation.note,
      "description": segnalation.description,
      "idState": segnalation.idState,
      "idProfessor": segnalation.idProfessor,
      "idRoom": segnalation.idRoom
    });
    return request;
  }
}
