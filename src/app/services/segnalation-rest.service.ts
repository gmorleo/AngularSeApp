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


  getByProfessorId(id: number): Observable<Segnalation[]> {
    let request = this.http.get<Segnalation[]>(this.apiUserUrl + "/getByIdProfessor/"+id);
    return request;
  }

  insert(lesson: Lesson):Observable<Lesson> {
    let request = this.http.post<Lesson>(this.apiUserUrl + "/save", {
      "start": lesson.start,
      "end": lesson.end,
      "idTeaching": lesson.idTeaching,
      "idRoom": lesson.idRoom
    });
    return request;
  }
}
