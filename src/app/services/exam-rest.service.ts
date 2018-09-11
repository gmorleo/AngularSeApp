import { Injectable } from '@angular/core';
import {ServerUrl} from '../../Variable';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lesson} from '../models/lesson';
import {Exam} from '../models/exam';
import {Course} from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ExamRestService {

  apiUserUrl = `${ServerUrl.url}/exam`;

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Exam[]> {
    let request = this.http.get<Exam[]>(this.apiUserUrl + "/getAll");
    return request;
  }

  insert(exam: Exam):Observable<Exam> {
    let request = this.http.post<Exam>(this.apiUserUrl + "/save", {
      "idTeaching": exam.idTeaching,
      "idRoom": exam.idRoom,
      "date": exam.date,
      "time": exam.time
    });
    return request;
  }

}
