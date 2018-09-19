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

  getAllById(id: number): Observable<Lesson[]> {
    let request = this.http.get<Lesson[]>(this.apiUserUrl + "/getByIdProfessor/"+id);
    return request;
  }

  insert(lesson: Lesson):Observable<Lesson> {
    let request = this.http.post<Lesson>(this.apiUserUrl + "/save", {
      "start": lesson.start,
      "end": lesson.end,
      "idTeaching": lesson.idTeaching,
      "idRoom": lesson.idRoom,
      "date": lesson.date
    });
    return request;
  }

  update(lesson: Lesson):Observable<Lesson> {
    let request = this.http.post<Lesson>(this.apiUserUrl + "/update", {
      "id": lesson.id,
      "start": lesson.start,
      "end": lesson.end,
      "idTeaching": lesson.idTeaching,
      "idRoom": lesson.idRoom,
      "date": lesson.date
    });
    return request;
  }

  getByDateAndCourse(date,idCourse): Observable<Lesson[]>  {
    let request = this.http.get<Lesson[]>(this.apiUserUrl + "/getByDate/"+date+"_"+idCourse);
    return request;
  }

}
