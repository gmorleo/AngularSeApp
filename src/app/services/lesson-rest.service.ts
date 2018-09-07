import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerUrl} from '../../Variable';
import {Observable} from 'rxjs';
import {Room} from '../models/room';
import {Lesson} from '../models/lesson';
import {getLocaleEraNames} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LessonRestService {

  apiUserUrl = `${ServerUrl.url}/lesson`;

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Lesson[]> {
    let request = this.http.get<Lesson[]>(this.apiUserUrl + "/getAll");
    return request;
  }

  insertNewRoom(lesson: Lesson):Observable<Lesson> {
    let request = this.http.post<Lesson>(this.apiUserUrl + "/save", {
      "starty": lesson.start,
      "end": lesson.end,
      "name": lesson.idTeaching
    });
    return request;
  }

}
